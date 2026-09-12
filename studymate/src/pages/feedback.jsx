import { useState } from "react";

function Feedback() {
  const [type, setType] = useState("Feature Request");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const contactMethods = [
    {
      name: "GitHub",
      handle: "BABAA-Y",
      description: "Explore my open-source projects & code",
      link: "https://github.com/BABAA-Y",
      cta: "View GitHub",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      handle: "ayushbhandarii",
      description: "Let's connect professionally & network",
      link: "https://www.linkedin.com/in/ayushbhandarii/",
      cta: "Connect on LinkedIn",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6h2.8v-7.6h-2.8M7.86 6.3a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63z" />
        </svg>
      ),
    },
    {
      name: "Email (Gmail)",
      handle: "bhandariayush72@gmail.com",
      description: "Direct email for inquiries & feedback",
      link: "mailto:bhandariayush72@gmail.com",
      cta: "Send an Email",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  const feedbackCategories = [
    "Feature Request",
    "Bug Report",
    "Improvement",
    "Collaboration",
    "General Feedback",
  ];

  function handleCopyEmail() {
    navigator.clipboard.writeText("bhandariayush72@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!type || !message.trim()) return;

    const feedbackItem = {
      id: Date.now(),
      name: name.trim() || "Anonymous",
      email: email.trim() || "Not provided",
      type,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    const existingFeedback =
      JSON.parse(localStorage.getItem("study-mate-feedback")) || [];

    localStorage.setItem(
      "study-mate-feedback",
      JSON.stringify([...existingFeedback, feedbackItem])
    );

    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(true);
  }

  return (
    <div className="max-w-6xl mx-auto pt-4 pb-12">
      {/* ================= HERO SECTION ================= */}
      <section className="relative text-center pt-6 pb-12 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-white/[0.04] rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* Animated Rotating Icon Badge */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-2xl border border-zinc-700 animate-[spin_12s_linear_infinite]" />
          <div className="absolute inset-2 rounded-xl border border-zinc-800 animate-[spin_8s_linear_infinite_reverse]" />
          <div className="absolute inset-4 rounded-xl bg-white text-black flex items-center justify-center text-xl font-bold shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>

          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-400 animate-ping" />
        </div>

        {/* Tagline */}
        <div className="tagline-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-400 mb-4 backdrop-blur-sm shadow-sm transition-colors">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Always open for ideas & collaboration</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Contact & Feedback
        </h1>

        {/* Animated divider line */}
        <div className="mx-auto mt-4 w-28 h-px bg-zinc-800 overflow-hidden">
          <div className="w-10 h-px bg-white animate-[slide_2.5s_ease-in-out_infinite]" />
        </div>

        <p className="mt-4 max-w-xl mx-auto text-zinc-400 text-base md:text-lg leading-relaxed">
          Have feedback, found a bug, or want to connect? Reach out via GitHub,
          LinkedIn, direct email, or submit a message below.
        </p>
      </section>

      {/* ================= CONTACT CARDS GRID ================= */}
      <section className="mb-12">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
            Connect Directly
          </p>
          <h2 className="text-2xl font-semibold mt-1">Get in touch</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactMethods.map((method) => (
            <div
              key={method.name}
              className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Animated top shimmer beam */}
              <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
                <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
              </div>

              {/* Hover glow */}
              <div className="absolute -inset-16 bg-white/[0.025] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-zinc-600 transition-all duration-300">
                    {method.icon}
                  </div>

                  <span className="text-xs text-zinc-600 font-mono group-hover:text-zinc-400 transition-colors">
                    Official
                  </span>
                </div>

                <h3 className="text-lg font-semibold group-hover:text-white transition-colors">
                  {method.name}
                </h3>

                <p className="text-xs text-zinc-400 font-mono mt-1 break-all">
                  {method.handle}
                </p>

                <p className="text-sm text-zinc-500 leading-relaxed mt-3">
                  {method.description}
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-zinc-800/80 flex items-center gap-2">
                <a
                  href={method.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-950 text-sm font-medium text-white transition-all group-hover:border-zinc-700"
                >
                  <span>{method.cta}</span>
                  <span className="text-zinc-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                    ↗
                  </span>
                </a>

                {method.name.includes("Email") && (
                  <button
                    onClick={handleCopyEmail}
                    title="Copy Email Address"
                    className="px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-600 text-xs text-zinc-400 hover:text-white transition shrink-0"
                  >
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= INTERACTIVE FEEDBACK FORM ================= */}
      <section className="mb-12">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
            Send a Message
          </p>
          <h2 className="text-2xl font-semibold mt-1">Leave your thoughts</h2>
        </div>

        <div className="relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-10">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-center justify-center mx-auto mb-5 text-2xl animate-bounce">
                ✓
              </div>

              <h2 className="text-3xl font-bold mb-2">
                Thank you for your feedback!
              </h2>

              <p className="text-zinc-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">
                Your message has been stored successfully. We truly appreciate
                your thoughts and contributions to making Study Mate better!
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95"
              >
                Send Another Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Pills */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-3">
                  Topic / Category
                </label>

                <div className="flex flex-wrap gap-2">
                  {feedbackCategories.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setType(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                        type === cat
                          ? "bg-white text-black shadow-lg"
                          : "bg-black border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                    Your Name <span className="text-zinc-600">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Namez"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700 outline-none focus:border-zinc-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                    Email Address{" "}
                    <span className="text-zinc-600">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700 outline-none focus:border-zinc-500 transition"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                  Your Message or Feedback{" "}
                  <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share ideas, suggestions, bugs you discovered, or anything you'd like to improve..."
                  rows="6"
                  required
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700 outline-none focus:border-zinc-500 transition resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Submit Feedback</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-zinc-800 pt-6 text-sm text-zinc-500 mt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p>Study Mate • Built for students, designed for focus.</p>
        <p className="text-xs text-zinc-600">Created by Ayush Bhandari</p>
      </footer>
    </div>
  );
}

export default Feedback;