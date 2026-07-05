"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  permission: boolean;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
  permission: false,
};

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormState>(initialState);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [id]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.permission) {
      alert("Please accept the contact permission checkbox.");
      return;
    }
    const subject = encodeURIComponent(`Portfolio Contact from ${form.firstName} ${form.lastName}`);
    const body = encodeURIComponent(
      `Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:naveensinghdivyasingh@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setForm(initialState);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-[#0a0a0a] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-gray-900"
    >
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 pointer-events-none z-0 pt-8 md:pt-10 pl-2"
      >
        <span
          className="select-none font-extrabold uppercase leading-none tracking-[-0.05em] text-white block"
          style={{ fontSize: "250px", opacity: 1, fontFamily: "'Impact', 'Arial Black', sans-serif" }}
        >
          Contact
        </span>
      </motion.div>

      <div className="relative z-10 w-full flex justify-end items-end">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#ff2a2a] w-full md:w-[85%] lg:w-[75%] p-8 md:p-16 text-white flex flex-col justify-between"
        >
          <div className="text-xs font-bold tracking-[0.2em] mb-12 md:mb-20 uppercase opacity-90">
            Reach Us
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-12 md:gap-16 w-full">
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
              <div className="flex-1 flex flex-col gap-10">
                <div className="relative">
                  <input
                    type="text"
                    id="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    suppressHydrationWarning
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    suppressHydrationWarning
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    suppressHydrationWarning
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium rounded-none"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="relative h-full flex flex-col">
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Type your message here"
                    required
                    suppressHydrationWarning
                    className="w-full h-full min-h-[120px] bg-transparent border-b border-white/40 pb-3 text-lg focus:outline-none focus:border-white transition-colors placeholder-white font-medium resize-none rounded-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12 mt-4">
              <div className="flex-1 flex items-start gap-4 text-sm font-medium text-white/90">
                <input
                  type="checkbox"
                  id="permission"
                  checked={form.permission}
                  onChange={handleChange}
                  suppressHydrationWarning
                  className="mt-1 w-4 h-4 rounded-sm border-white/40 bg-transparent text-white focus:ring-white focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                  style={{ accentColor: "white" }}
                />
                <label htmlFor="permission" className="cursor-pointer max-w-[280px] leading-snug">
                  I give permission to contact me at this email address.
                </label>
              </div>
              <div className="flex-1 flex flex-col gap-8 text-xs text-white/70 font-medium">
                <p className="leading-relaxed max-w-[400px]">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a href="#" className="underline hover:text-white transition-colors">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline hover:text-white transition-colors">
                    Terms of Service
                  </a>{" "}
                  apply.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
                  <p className="max-w-[250px] leading-relaxed">
                    For information on how to unsubscribe, please review our{" "}
                    <a href="#" className="underline hover:text-white transition-colors">
                      privacy policy
                    </a>
                    .
                  </p>
                  <button
                    type="submit"
                    suppressHydrationWarning
                    className="px-8 py-3 rounded-full border border-white/40 text-white font-bold flex items-center justify-center gap-3 hover:bg-white hover:text-[#ff2a2a] transition-all duration-300 group whitespace-nowrap self-start sm:self-auto"
                  >
                    Send
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
