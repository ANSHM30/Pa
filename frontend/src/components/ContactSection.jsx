// ContactSection.jsx
import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub, FaEnvelope, FaPaperPlane } from "react-icons/fa";

export default function ContactSection() {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  // per-field errors
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

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

  // Simple and practical email regex that rejects missing @ and domain parts
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateAll({ name, email, message }) {
    const errors = { name: "", email: "", message: "" };
    let valid = true;

    // Name: required, min 2 chars
    if (!name) {
      errors.name = "Name is required.";
      valid = false;
    } else if (name.length < 2) {
      errors.name = "Please enter your full name (min 2 characters).";
      valid = false;
    }

    // Email: required + regex
    if (!email) {
      errors.email = "Email is required.";
      valid = false;
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address (example: you@domain.com).";
      valid = false;
    }

    // Message: required, min 10 chars
    if (!message) {
      errors.message = "Message is required.";
      valid = false;
    } else if (message.length < 10) {
      errors.message = "Please write a longer message (min 10 characters).";
      valid = false;
    }

    setFieldErrors(errors);
    return valid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formRef.current) return;

    // Read form values (names must match the template variables)
    const fd = new FormData(formRef.current);
    const name = (fd.get("name") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const message = (fd.get("message") || "").toString().trim();

    // Validate on client
    const isValid = validateAll({ name, email, message });
    if (!isValid) {
      setError("Please fix the highlighted fields.");
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
      // clear field errors after successful send
      setFieldErrors({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setSending(false);
      setError("Failed to send — try again later.");
    }
  }

  // Clear a single field error when user types
  function handleFieldChange(field, value) {
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (next[field]) {
        next[field] = "";
      }
      return next;
    });

    // Clear top-level error if any
    if (error) setError(null);
  }

  // === Your public links ===
  const LINKEDIN_URL = "https://www.linkedin.com/in/ansh-mishra-189506257/";
  const GITHUB_URL = "https://github.com/ANSHM30";
  const EMAIL_ADDRESS = "anshkm30@gmail.com";
  // =========================

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
          <div>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className={`w-full p-3 rounded-lg bg-gray-800 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition
                ${fieldErrors.name ? "border-red-400 focus:ring-red-400" : "border-gray-700 focus:ring-indigo-500"}`}
              required
              aria-label="Your name"
              aria-invalid={!!fieldErrors.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
            />
            {fieldErrors.name && (
              <p className="mt-1 text-sm text-red-300" role="alert">{fieldErrors.name}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              className={`w-full p-3 rounded-lg bg-gray-800 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition
                ${fieldErrors.email ? "border-red-400 focus:ring-red-400" : "border-gray-700 focus:ring-indigo-500"}`}
              required
              aria-label="Your email"
              aria-invalid={!!fieldErrors.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
            />
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-300" role="alert">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              className={`w-full p-3 rounded-lg bg-gray-800 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition resize-none
                ${fieldErrors.message ? "border-red-400 focus:ring-red-400" : "border-gray-700 focus:ring-indigo-500"}`}
              required
              aria-label="Your message"
              aria-invalid={!!fieldErrors.message}
              onChange={(e) => handleFieldChange("message", e.target.value)}
            />
            {fieldErrors.message && (
              <p className="mt-1 text-sm text-red-300" role="alert">{fieldErrors.message}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:opacity-95 transition transform hover:-translate-y-[2px] disabled:opacity-60 disabled:cursor-not-allowed"
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
          href={LINKEDIN_URL}
          className="p-3 rounded-full bg-gray-800/80 border border-gray-700 backdrop-blur-md hover:scale-110 transition-all hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30"
          title="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open LinkedIn profile (opens in new tab)"
        >
          <FaLinkedin className="w-7 h-7 text-indigo-400 hover:text-indigo-300 transition" />
        </a>

        <a
          href={GITHUB_URL}
          className="p-3 rounded-full bg-gray-800/80 border border-gray-700 backdrop-blur-md hover:scale-110 transition-all hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30"
          title="GitHub"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open GitHub profile (opens in new tab)"
        >
          <FaGithub className="w-7 h-7 text-gray-300 hover:text-white transition" />
        </a>

        <a
          href={`mailto:${EMAIL_ADDRESS}`}
          className="p-3 rounded-full bg-gray-800/80 border border-gray-700 backdrop-blur-md hover:scale-110 transition-all hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/30"
          title="Send email"
          aria-label="Send email"
        >
          <FaEnvelope className="w-7 h-7 text-pink-400 hover:text-pink-300 transition" />
        </a>
      </div>

      {/* ✅ Success toast (responsive, top center) */}
<div
  className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-auto px-2 sm:px-0 pointer-events-none"
  aria-live="polite"
  aria-atomic="true"
>
  <div
  role="status"
  className={`mx-auto max-w-sm sm:max-w-xs rounded-lg text-white text-center transition-all duration-300 ease-out pointer-events-auto transform
    ${sent ? "opacity-100 translate-y-0 animate-slideDown" : "opacity-0 -translate-y-6"}`}
>

    <div className="p-3 sm:p-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl backdrop-blur-md">
      <div className="font-semibold text-base sm:text-lg">Message Sent</div>
      <div className="text-xs sm:text-sm text-white/80 break-words">
        Thanks — I&apos;ll get back to you shortly.
      </div>
    </div>
  </div>
</div>
    </section>
  );
}
