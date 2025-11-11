// ContactSection.jsx
import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub, FaEnvelope, FaPaperPlane } from "react-icons/fa";

export default function ContactSection() {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  // Vite env vars (must be prefixed with VITE_)
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    if (sent) {
      const t = setTimeout(() => setSent(false), 3800);
      return () => clearTimeout(t);
    }
  }, [sent]);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(null), 3800);
      return () => clearTimeout(t);
    }
  }, [error]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formRef.current) return;

    // Read form values (names must match the template variables)
    const fd = new FormData(formRef.current);
    const name = (fd.get("name") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const message = (fd.get("message") || "").toString().trim();

    if (!name || !email || !message) {
      setError("Please fill out all fields.");
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("EmailJS env vars missing (VITE_EMAILJS_...).");
      setError("Mail service not configured.");
      return;
    }

    const templateParams = { name, email, message };

    try {
      setSending(true);
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setSending(false);
      setSent(true);
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setSending(false);
      setError("Failed to send — try again later.");
    }
  }

  return (
    <section
      id="contact"
      className="relative py-20 px-6 text-white flex flex-col items-center justify-center overflow-hidden
                 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#1a0b2e] via-[#0b1a2f] to-[#020617]"
    >
      {/* Animated background aurora glow */}
      <div className="absolute inset-0 opacity-40 blur-3xl pointer-events-none">
        <div className="absolute w-[40rem] h-[40rem] bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600 rounded-full mix-blend-overlay animate-pulse top-1/4 left-1/3" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          📬 Get In Touch
        </h2>
        <p className="text-gray-300 text-lg max-w-xl mx-auto leading-relaxed">
          Let’s collaborate, discuss opportunities, or just say hello! I’d love to connect with you.
        </p>
      </div>

      {/* Contact Form Card */}
      <div className="relative z-10 w-full max-w-lg bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl 
                      p-8 md:p-10 hover:shadow-indigo-600/20 transition-all duration-500 overflow-visible group">

        {/* Gradient Border Glow */}
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-600 opacity-30 blur-2xl transition-all duration-700 group-hover:opacity-60 pointer-events-none" />

        <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-6" noValidate>
          {/* NOTE: `name` attributes must match the variables in your EmailJS template ({{name}}, {{email}}, {{message}}) */}
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
            aria-label="Your name"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
            aria-label="Your email"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            required
            aria-label="Your message"
          />
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:opacity-95 transition transform hover:-translate-y-[2px]"
            >
              <FaPaperPlane className="w-4 h-4" />
              {sending ? "Sending..." : "Send Message"}
            </button>

            {error && (
              <div className="text-sm text-red-300">{error}</div>
            )}
          </div>
        </form>
      </div>

      {/* Social Links */}
      <div className="relative z-10 mt-10 flex justify-center space-x-8">
        <a
          href="#"
          className="p-3 rounded-full bg-gray-800/80 border border-gray-700 backdrop-blur-md hover:scale-110 transition-all hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30"
          title="LinkedIn"
          onClick={(e) => e.preventDefault()}
        >
          <FaLinkedin className="w-7 h-7 text-indigo-400 hover:text-indigo-300 transition" />
        </a>

        <a
          href="#"
          className="p-3 rounded-full bg-gray-800/80 border border-gray-700 backdrop-blur-md hover:scale-110 transition-all hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30"
          title="GitHub"
          onClick={(e) => e.preventDefault()}
        >
          <FaGithub className="w-7 h-7 text-gray-300 hover:text-white transition" />
        </a>

        <a
          href="#"
          className="p-3 rounded-full bg-gray-800/80 border border-gray-700 backdrop-blur-md hover:scale-110 transition-all hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/30"
          title="Email"
          onClick={(e) => e.preventDefault()}
        >
          <FaEnvelope className="w-7 h-7 text-pink-400 hover:text-pink-300 transition" />
        </a>
      </div>

      {/* Success toast (bottom center small) */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
        <div
          className={`mx-auto w-80 max-w-xs rounded-lg text-white text-center transition-all duration-300 ${
            sent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          aria-live="polite"
        >
          <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl">
            <div className="font-semibold">Message Sent</div>
            <div className="text-sm text-white/80">Thanks — I&apos;ll get back to you shortly.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
