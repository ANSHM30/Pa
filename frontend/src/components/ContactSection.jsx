// ContactSection.jsx
import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub, FaEnvelope, FaPaperPlane } from "react-icons/fa";

export default function ContactSection() {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Vite env vars (must be prefixed with VITE_)
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // public links
  const LINKEDIN_URL = "https://www.linkedin.com/in/ansh-mishra-189506257/";
  const GITHUB_URL = "https://github.com/ANSHM30";
  const EMAIL_ADDRESS = "anshkm30@gmail.com";

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateAll({ name, email, message }) {
    const errors = { name: "", email: "", message: "" };
    let valid = true;

    if (!name) {
      errors.name = "Name is required.";
      valid = false;
    } else if (name.length < 2) {
      errors.name = "Please enter your full name (min 2 characters).";
      valid = false;
    }

    if (!email) {
      errors.email = "Email is required.";
      valid = false;
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address (example: you@domain.com).";
      valid = false;
    }

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

    const fd = new FormData(formRef.current);
    const name = (fd.get("name") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const message = (fd.get("message") || "").toString().trim();

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
      setFieldErrors({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setSending(false);
      setError("Failed to send — try again later.");
    }
  }

  function handleFieldChange(field) {
    setFieldErrors(prev => {
      const next = { ...prev };
      if (next[field]) next[field] = "";
      return next;
    });
    if (error) setError(null);
  }

  function dismissToast() {
    setSent(false);
  }

  /**
   * ToastPortal: creates a dedicated node appended to document.body and sets
   * robust inline styles to prevent clipping on mobile/within transformed parents.
   */
  function ToastPortal() {
    if (typeof document === "undefined") return null;

    // create a stable container node (only once)
    const [container] = React.useState(() => {
      const el = document.createElement("div");
      // apply inline styles that guarantee full-viewport fixed positioning + center
      Object.assign(el.style, {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        pointerEvents: "none",
        zIndex: String(9999999), // extremely high
      });
      return el;
    });

    useEffect(() => {
      document.body.appendChild(container);
      return () => {
        if (document.body.contains(container)) document.body.removeChild(container);
      };
    }, [container]);

    // Inner toast wrapper centered at top, with safe area spacing.
    const toastInner = (
      <div
        // this inner wrapper is centered horizontally, contains the toast and respects safe area
        style={{
          position: "fixed",
          // respect notch / status bar; fallback to 12px
          top: "calc(env(safe-area-inset-top, 12px) + 8px)",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          role="status"
          // pointerEvents auto on inner so it can be interacted with (dismiss)
          style={{
            pointerEvents: "auto",
            width: "92%",
            maxWidth: "380px",
            transition: "transform 300ms ease, opacity 300ms ease",
            transform: sent ? "translateY(0)" : "translateY(-16px)",
            opacity: sent ? 1 : 0,
            borderRadius: "12px",
            background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
            boxShadow: "0 12px 30px rgba(12,11,20,0.6)",
            color: "white",
            padding: "12px 14px",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            margin: "0 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <div style={{ textAlign: "left", flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: "14px", lineHeight: "1.1" }}>Message Sent</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.9)", marginTop: 4 }}>
              Thanks — I&apos;ll get back to you shortly.
            </div>
          </div>

          <button
            onClick={dismissToast}
            aria-label="Dismiss message"
            style={{
              marginLeft: 12,
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "rgba(255,255,255,0.08)",
              border: "none",
              color: "white",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
      </div>
    );

    return createPortal(toastInner, container);
  }

  return (
    <section
      id="contact"
      className="relative py-20 px-6 text-white flex flex-col items-center justify-center overflow-visible
                 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#1a0b2e] via-[#0b1a2f] to-[#020617]"
    >
      {/* Background glow */}
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
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-600 opacity-30 blur-2xl transition-all duration-700 group-hover:opacity-60 pointer-events-none" />

        <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-6" noValidate>
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
              onChange={() => handleFieldChange("name")}
            />
            {fieldErrors.name && <p className="mt-1 text-sm text-red-300" role="alert">{fieldErrors.name}</p>}
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
              onChange={() => handleFieldChange("email")}
            />
            {fieldErrors.email && <p className="mt-1 text-sm text-red-300" role="alert">{fieldErrors.email}</p>}
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
              onChange={() => handleFieldChange("message")}
            />
            {fieldErrors.message && <p className="mt-1 text-sm text-red-300" role="alert">{fieldErrors.message}</p>}
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

            {error && <div className="text-sm text-red-300">{error}</div>}
          </div>
        </form>
      </div>

      {/* Social Links */}
      <div className="relative z-10 mt-10 flex justify-center space-x-8">
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="Open LinkedIn profile" className="p-3 rounded-full bg-gray-800/80 border border-gray-700 backdrop-blur-md hover:scale-110 transition-all hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30">
          <FaLinkedin className="w-7 h-7 text-indigo-400 hover:text-indigo-300 transition" />
        </a>

        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="Open GitHub profile" className="p-3 rounded-full bg-gray-800/80 border border-gray-700 backdrop-blur-md hover:scale-110 transition-all hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30">
          <FaGithub className="w-7 h-7 text-gray-300 hover:text-white transition" />
        </a>

        <a href={`mailto:${EMAIL_ADDRESS}`} aria-label="Send email" className="p-3 rounded-full bg-gray-800/80 border border-gray-700 backdrop-blur-md hover:scale-110 transition-all hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/30">
          <FaEnvelope className="w-7 h-7 text-pink-400 hover:text-pink-300 transition" />
        </a>
      </div>

      {/* toast portal */}
      <ToastPortal />
    </section>
  );
}
