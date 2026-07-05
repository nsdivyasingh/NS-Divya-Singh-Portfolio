"use client";

import { motion } from "framer-motion";

export function BlogSection() {
  return (
    <section
      id="blog"
      className="bg-white py-24 px-6 md:px-12 relative overflow-hidden font-sans border-t border-gray-100"
    >
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 relative max-w-2xl"
        >
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-8 shadow-sm bg-white">
            Thoughts &amp; Writing
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight relative">
            Personal Blog
            <svg
              className="absolute -bottom-4 left-0 w-48 h-3 text-[#ff2a2a]/40"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0,5 Q50,10 100,5"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </h2>
          <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed mt-8">
            Reflecting on life lessons, growth, clarity, and personal experiences beyond coding.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group bg-white border border-gray-200 rounded-[2.5rem] p-2 relative flex flex-col items-center hover:scale-[1.01] hover:border-red-400 hover:shadow-[0_20px_50px_rgba(255,42,42,0.06)] transition-all duration-700 max-w-4xl mx-auto"
        >
          {/* Rivet design */}
          <div className="w-5 h-5 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] absolute top-4 border border-gray-300 z-10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-gray-800 rounded-full opacity-10" />
          </div>

          <div className="w-full h-full rounded-[2rem] mt-8 p-8 md:p-12 flex flex-col md:flex-row justify-between gap-8 bg-[#f4f4f4] group-hover:bg-red-50/10 transition-colors duration-700">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#ff2a2a]/95 px-2.5 py-1 rounded bg-[#ff2a2a]/5 border border-[#ff2a2a]/10">
                    Blog
                  </span>
                  <span className="text-xs font-mono text-gray-400 font-bold">
                    WordPress Publication
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4 group-hover:text-[#ff2a2a] transition-colors duration-300 leading-none">
                  The Better Versions
                </h3>
                
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 font-medium">
                  A space for reflection, growth, and the quiet rewrites of life. Not a pursuit of perfection, but a journey through clarity, questions, and becoming.
                </p>
              </div>

              <div className="border-t border-gray-200/50 pt-6 mt-6 md:mt-0">
                <a
                  href="https://thebetterversions.wordpress.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-black/20 text-black font-bold hover:bg-black hover:text-white transition-all duration-300 gap-2 whitespace-nowrap self-start"
                >
                  Read Blog
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center bg-white border border-gray-200/70 rounded-[1.8rem] p-8 md:p-10 shadow-sm">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400 mb-3 block">
                Featured Series
              </span>
              <h4 className="text-xl font-bold text-gray-900 mb-4 tracking-tight leading-snug">
                “12 Lessons Before 21”
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                A reflective essay series detailing essential life lessons learned the hard way — written from raw personal experience, charting a trajectory of clarity and growth.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#ff2a2a]">
                <span>Read the series live</span>
                <svg className="w-3.5 h-3.5 transform translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
