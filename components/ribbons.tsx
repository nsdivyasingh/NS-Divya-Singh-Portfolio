"use client";

import { useEffect, useRef } from "react";
import "./ribbons.css";

interface RibbonsProps {
  colors?: string[];
  baseSpring?: number;
  baseFriction?: number;
  baseThickness?: number;
  offsetFactor?: number;
  maxAge?: number;
  pointCount?: number;
  speedMultiplier?: number;
  enableFade?: boolean;
  enableShaderEffect?: boolean;
  effectAmplitude?: number;
}

export function Ribbons({
  colors = ["#ff2a2a"],
  baseSpring = 0.03,
  baseFriction = 0.9,
  baseThickness = 30,
  offsetFactor = 0.05,
  maxAge = 500,
  pointCount = 50,
  speedMultiplier = 0.6,
  enableFade = false,
  enableShaderEffect = false,
  effectAmplitude = 2,
}: RibbonsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Serialize colors so the effect only reruns when the actual color values change
  const colorsKey = colors.join(",");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId: number;
    let cancelled = false;

    import("ogl").then(({ Renderer, Transform, Vec3, Color, Polyline }) => {
      if (cancelled) return;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio || 1, 2),
        alpha: true,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gl = renderer.gl as any;
      gl.clearColor(0, 0, 0, 0);

      const canvas = gl.canvas as HTMLCanvasElement;
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      container.appendChild(canvas);

      const scene = new Transform();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lines: any[] = [];

      const vertex = /* glsl */ `
        precision highp float;
        attribute vec3 position;
        attribute vec3 next;
        attribute vec3 prev;
        attribute vec2 uv;
        attribute float side;
        uniform vec2 uResolution;
        uniform float uDPR;
        uniform float uThickness;
        uniform float uTime;
        uniform float uEnableShaderEffect;
        uniform float uEffectAmplitude;
        varying vec2 vUV;
        vec4 getPosition() {
          vec4 current = vec4(position, 1.0);
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
          vec2 nextScreen = next.xy * aspect;
          vec2 prevScreen = prev.xy * aspect;
          vec2 tangent = normalize(nextScreen - prevScreen);
          vec2 normal = vec2(-tangent.y, tangent.x);
          normal /= aspect;
          normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
          float dist = length(nextScreen - prevScreen);
          normal *= smoothstep(0.0, 0.02, dist);
          float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
          float pixelWidth = current.w * pixelWidthRatio;
          normal *= pixelWidth * uThickness;
          current.xy -= normal * side;
          if (uEnableShaderEffect > 0.5) {
            current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
          }
          return current;
        }
        void main() {
          vUV = uv;
          gl_Position = getPosition();
        }
      `;

      const fragment = /* glsl */ `
        precision highp float;
        uniform vec3 uColor;
        uniform float uOpacity;
        uniform float uEnableFade;
        varying vec2 vUV;
        void main() {
          float fadeFactor = 1.0;
          if (uEnableFade > 0.5) {
            fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
          }
          gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
        }
      `;

      function resize() {
        renderer.setSize(container.clientWidth, container.clientHeight);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        lines.forEach((l: any) => l.polyline.resize());
      }
      window.addEventListener("resize", resize);

      const colorList = colorsKey.split(",");
      const center = (colorList.length - 1) / 2;
      colorList.forEach((color, index) => {
        const spring = baseSpring + (Math.random() - 0.5) * 0.01;
        const friction = baseFriction + (Math.random() - 0.5) * 0.01;
        const thickness = baseThickness + (Math.random() - 0.5) * 3;
        const mouseOffset = new Vec3(
          (index - center) * offsetFactor + (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.05,
          0
        );

        const points = Array.from({ length: pointCount }, () => new Vec3());

        const polyline = new Polyline(gl, {
          points,
          vertex,
          fragment,
          uniforms: {
            uColor: { value: new Color(color) },
            uThickness: { value: thickness },
            uOpacity: { value: 1.0 },
            uTime: { value: 0.0 },
            uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },
            uEffectAmplitude: { value: effectAmplitude },
            uEnableFade: { value: enableFade ? 1.0 : 0.0 },
          },
        });
        polyline.mesh.setParent(scene);
        lines.push({ spring, friction, mouseVelocity: new Vec3(), mouseOffset, points, polyline });
      });

      resize();

      const mouse = new Vec3();
      const tmp = new Vec3();

      // mouseActive flips to true on first interaction
      let mouseActive = false;
      // idleT drives the autonomous figure-8 animation before interaction
      let idleT = 0;

      function updateMouse(e: MouseEvent | TouchEvent) {
        mouseActive = true;
        const rect = container.getBoundingClientRect();
        let x: number, y: number;
        if ("changedTouches" in e && e.changedTouches.length) {
          x = e.changedTouches[0].clientX - rect.left;
          y = e.changedTouches[0].clientY - rect.top;
        } else {
          x = (e as MouseEvent).clientX - rect.left;
          y = (e as MouseEvent).clientY - rect.top;
        }
        mouse.set(
          (x / container.clientWidth) * 2 - 1,
          (y / container.clientHeight) * -2 + 1,
          0
        );
      }

      container.addEventListener("mousemove", updateMouse);
      container.addEventListener("touchstart", updateMouse, { passive: true });
      container.addEventListener("touchmove", updateMouse, { passive: true });

      // Trail alpha: higher maxAge → more friction → longer trail
      const trailAlpha = Math.pow(baseFriction, 500 / Math.max(80, maxAge));

      let lastTime = performance.now();

      function update() {
        if (cancelled) return;
        frameId = requestAnimationFrame(update);
        const now = performance.now();
        const dt = now - lastTime;
        lastTime = now;

        // Idle figure-8 animation until the user interacts
        if (!mouseActive) {
          idleT += dt * 0.0005 * speedMultiplier;
          mouse.x = Math.sin(idleT) * 0.6;
          mouse.y = Math.sin(idleT * 1.7) * 0.3;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        lines.forEach((line: any) => {
          // Spring the head toward the mouse + per-ribbon offset
          tmp.set(
            mouse.x + line.mouseOffset.x - line.points[0].x,
            mouse.y + line.mouseOffset.y - line.points[0].y,
            0
          );
          tmp.multiply(line.spring * speedMultiplier);
          line.mouseVelocity.add(tmp).multiply(line.friction);
          line.points[0].add(line.mouseVelocity);

          // Trail: each point follows the one ahead using friction-based alpha
          for (let i = 1; i < line.points.length; i++) {
            line.points[i].lerp(line.points[i - 1], trailAlpha);
          }

          if (line.polyline.mesh.program.uniforms.uTime) {
            line.polyline.mesh.program.uniforms.uTime.value = now * 0.001;
          }
          line.polyline.updateGeometry();
        });

        renderer.render({ scene });
      }
      update();

      // Attach cleanup to the container element for the effect return to call
      (container as HTMLDivElement & { _rCleanup?: () => void })._rCleanup = () => {
        cancelled = true;
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", resize);
        container.removeEventListener("mousemove", updateMouse);
        container.removeEventListener("touchstart", updateMouse);
        container.removeEventListener("touchmove", updateMouse);
        if (canvas.parentNode === container) container.removeChild(canvas);
      };
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      const el = container as HTMLDivElement & { _rCleanup?: () => void };
      el._rCleanup?.();
    };
    // colorsKey is the serialized form of the colors array — safe to use
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorsKey, baseSpring, baseFriction, baseThickness, offsetFactor, maxAge, pointCount, speedMultiplier, enableFade, enableShaderEffect, effectAmplitude]);

  return <div ref={containerRef} className="ribbons-container" />;
}
