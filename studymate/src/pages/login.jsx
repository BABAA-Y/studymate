import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStudy } from "../context/studycontext";

// Funky B&W Scramble Glyphs (monochrome blocks, hex tokens, and matrix runes)
const FUNKY_BW_CHARS = "01█▓▒░⬡⬢▲▼◆◇✦✕#@%&<>[]{}=";

function DecryptText({ text, speed = 35, className = "" }) {
  const [displayText, setDisplayText] = useState(text);
  const isHovered = useRef(false);

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "/" || char === "-") return char;
            if (index < iteration) return text[index];
            return FUNKY_BW_CHARS[Math.floor(Math.random() * FUNKY_BW_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, speed);
  };

  useEffect(() => {
    scramble();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span
      onMouseEnter={() => {
        if (!isHovered.current) {
          isHovered.current = true;
          scramble();
          setTimeout(() => {
            isHovered.current = false;
          }, text.length * speed * 2);
        }
      }}
      className={className}
    >
      {displayText}
    </span>
  );
}

// Pure SVG Hexagon helper
function HexagonSVG({
  size = 40,
  className = "",
  stroke = "currentColor",
  strokeWidth = 2,
  fill = "none",
  dashed = false,
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <polygon
        points="50,3 93.3,25 93.3,75 50,97 6.7,75 6.7,25"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={dashed ? "6 4" : "none"}
      />
    </svg>
  );
}

// Full-screen Honeycomb Grid with floating hexagonal nodes & scanlines
function HoneycombBackground({ isLight }) {
  const strokeColor = isLight ? "rgba(0, 0, 0, 0.14)" : "rgba(255, 255, 255, 0.12)";
  const dotColor = isLight ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.35)";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Mathematical Seamless Honeycomb SVG Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-70"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="bw-honeycomb-pattern"
            width="60"
            height="103.923"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 30,0 L 60,17.32 L 60,51.96 L 30,69.28 L 0,51.96 L 0,17.32 Z M 0,69.28 L 30,86.6 L 30,121.24 L 0,138.56 L -30,121.24 L -30,86.6 Z M 60,69.28 L 90,86.6 L 90,121.24 L 60,138.56 L 30,121.24 L 30,86.6 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.2"
            />
            <circle cx="30" cy="34.64" r="1.5" fill={dotColor} />
            <circle cx="0" cy="86.6" r="1.5" fill={dotColor} />
            <circle cx="60" cy="86.6" r="1.5" fill={dotColor} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bw-honeycomb-pattern)" />
      </svg>

      {/* Floating Decorative Hexagon Nodes */}
      <div className="hidden lg:block absolute top-16 left-12 animate-[spin_24s_linear_infinite] opacity-35">
        <HexagonSVG size={110} dashed strokeWidth={1.5} />
      </div>
      <div className="hidden lg:flex items-center gap-1.5 absolute top-28 left-16 text-[10px] font-mono tracking-widest opacity-60">
        <span>[ ⬢ HEX://01_NODE ]</span>
      </div>

      <div className="hidden lg:block absolute top-24 right-16 animate-[spin_32s_linear_infinite_reverse] opacity-30">
        <HexagonSVG size={140} dashed strokeWidth={1.5} />
      </div>
      <div className="hidden lg:flex items-center gap-1.5 absolute top-36 right-20 text-[10px] font-mono tracking-widest opacity-60">
        <span>[ 0x_ACADEMIC_PORTAL ]</span>
      </div>

      <div className="hidden xl:block absolute bottom-20 left-24 animate-[spin_20s_linear_infinite] opacity-25">
        <HexagonSVG size={90} dashed strokeWidth={1.5} />
      </div>

      <div className="hidden xl:block absolute bottom-16 right-28 animate-[spin_26s_linear_infinite_reverse] opacity-30">
        <HexagonSVG size={120} dashed strokeWidth={1.5} />
      </div>

      {/* Vertical Monochrome CRT Scanline Sweep */}
      <div className="absolute inset-x-0 h-44 bg-gradient-to-b from-transparent via-white/[0.04] to-transparent animate-[slide_8s_linear_infinite]" />
    </div>
  );
}

// Funky B&W Infinite Ticker Tape
function FunkyTicker() {
  return (
    <div className="login-marquee-ticker w-full overflow-hidden border-y py-1.5 font-mono text-[10px] uppercase tracking-widest font-black select-none z-10 relative transition-colors">
      <div className="animate-hex-marquee whitespace-nowrap flex items-center">
        {[1, 2].map((k) => (
          <span key={k} className="flex items-center gap-6 pr-6">
            <span>⬢ STUDY MATE // HEXAGONAL MATRIX</span>
            <span>✦ 100% FOCUS</span>
            <span>⬢ B&W MONOCHROME HARDWARE</span>
            <span>⚡ AES-256 VAULT</span>
            <span>⬢ ZERO DISTRACTION PROTOCOL</span>
            <span>✦ DECRYPT OPERATOR</span>
            <span>⬢ QUANTUM CITATION GATEWAY</span>
            <span>⚡ AUTH GRANTED</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Multi-layered Holographic Hexagon Avatar
function HexagonAvatar({ operatorId, isLight }) {
  const initial = operatorId ? operatorId.trim().charAt(0).toUpperCase() : "Ω";

  return (
    <div className="relative w-28 h-28 flex items-center justify-center mb-4">
      {/* Outer Rotating Dashed Hexagon */}
      <div className="absolute inset-0 flex items-center justify-center animate-[spin_18s_linear_infinite]">
        <svg width="112" height="112" viewBox="0 0 100 100">
          <polygon
            points="50,3 93.3,25 93.3,75 50,97 6.7,75 6.7,25"
            fill="none"
            stroke={isLight ? "#000000" : "#ffffff"}
            strokeWidth="2.5"
            strokeDasharray="8 6"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Middle Counter-Rotating Hexagon with 6 Vertex Beacons */}
      <div className="absolute inset-2 flex items-center justify-center animate-[spin_12s_linear_infinite_reverse]">
        <svg width="96" height="96" viewBox="0 0 100 100">
          <polygon
            points="50,3 93.3,25 93.3,75 50,97 6.7,75 6.7,25"
            fill="none"
            stroke={isLight ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.3)"}
            strokeWidth="1.5"
          />
          <circle cx="50" cy="3" r="3.5" fill={isLight ? "#000000" : "#ffffff"} />
          <circle cx="93.3" cy="25" r="3.5" fill={isLight ? "#000000" : "#ffffff"} />
          <circle cx="93.3" cy="75" r="3.5" fill={isLight ? "#000000" : "#ffffff"} />
          <circle cx="50" cy="97" r="3.5" fill={isLight ? "#000000" : "#ffffff"} />
          <circle cx="6.7" cy="75" r="3.5" fill={isLight ? "#000000" : "#ffffff"} />
          <circle cx="6.7" cy="25" r="3.5" fill={isLight ? "#000000" : "#ffffff"} />
        </svg>
      </div>

      {/* Center Solid Hexagonal Badge */}
      <div className="login-avatar-disc w-18 h-18 clip-hexagon flex items-center justify-center font-black text-2xl tracking-tighter transition-all duration-300 shadow-xl">
        <span className="relative z-10">{initial}</span>
      </div>

      {/* Floating Mini Hex Satellite Badge */}
      <div className="login-avatar-tag absolute -bottom-1 -right-1 px-1.5 py-0.5 hex-chamfer-sm text-[8px] font-mono font-black uppercase">
        0xOP
      </div>
    </div>
  );
}

// Funky Hexagonal Cipher Strength Pods
function HexCipherMeter({ keyStrength }) {
  const levels = [
    { label: "LEN", desc: "6+ glyphs" },
    { label: "NUM", desc: "0-9 cipher" },
    { label: "SYM", desc: "Special key" },
    { label: "MAX", desc: "10+ crypt" },
  ];

  return (
    <div className="mt-2.5">
      <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1.5 font-bold">
        <span className="flex items-center gap-1.5">
          <span>CIPHER PROTOCOL:</span>
          <span>{keyStrength === 0 ? "EMPTY" : `${keyStrength}/4 PODS ENGAGED`}</span>
        </span>
        <span className="tracking-widest">[AES-256]</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {levels.map((item, idx) => {
          const active = keyStrength > idx;
          return (
            <div
              key={idx}
              className={`hex-chamfer-sm border-2 p-1.5 flex items-center justify-center gap-1.5 text-[10px] font-mono font-black transition-all ${
                active ? "login-pod-active" : "login-pod-idle"
              }`}
            >
              <span className="text-xs">{active ? "⬢" : "⬡"}</span>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const { theme, setTheme, sessions } = useStudy();

  // Robust live detection of light/dark mode from DOM documentElement class
  const [isLight, setIsLight] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("light");
    }
    return theme === "light";
  });

  useEffect(() => {
    const updateTheme = () => {
      const isDocLight = document.documentElement.classList.contains("light");
      setIsLight(isDocLight);
    };
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [theme]);

  // Guard: If already authenticated, redirect straight to dashboard
  useEffect(() => {
    if (localStorage.getItem("study-mate-user") === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  // Mode: "login" or "signup"
  const [mode, setMode] = useState("login");

  // Form State
  const [operatorId, setOperatorId] = useState("");
  const [email, setEmail] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Execution State
  const [executing, setExecuting] = useState(false);
  const [terminalLog, setTerminalLog] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);

  // Live HUD Millisecond Clock
  const [hudTime, setHudTime] = useState("");
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setHudTime(
        now.toTimeString().split(" ")[0] +
          "." +
          String(Math.floor(now.getMilliseconds() / 10)).padStart(2, "0")
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 50);
    return () => clearInterval(timer);
  }, []);

  // Password Security Strength Calculation (0 to 4)
  const getKeyStrength = (key) => {
    if (!key) return 0;
    let score = 1;
    if (key.length >= 6) score++;
    if (/[0-9]/.test(key)) score++;
    if (/[^A-Za-z0-9]/.test(key) || key.length >= 10) score++;
    return score;
  };
  const keyStrength = getKeyStrength(accessKey);

  // Execute Login / Register Handshake
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (executing) return;

    setExecuting(true);
    setProgressPercent(15);
    setTerminalLog("INITIALIZING HEX-HANDSHAKE...");

    const finalName = operatorId.trim() || "Student Operator";
    const finalEmail = email.trim() || "student@studymate.edu";

    setTimeout(() => {
      setProgressPercent(45);
      setTerminalLog("SCANNING BIOMETRIC HEX-SIGNATURE...");
    }, 250);

    setTimeout(() => {
      setProgressPercent(80);
      setTerminalLog("DECRYPTING MONOCHROME VAULT [AES-256]...");
    }, 550);

    setTimeout(() => {
      setProgressPercent(100);
      setTerminalLog("AUTH GRANTED • WELCOME OPERATOR");

      localStorage.setItem("study-mate-user", "true");
      localStorage.setItem("study-mate-username", finalName);
      localStorage.setItem("study-mate-user-email", finalEmail);

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 400);
    }, 900);
  };

  // Instant 1-Click Demo Operator Login
  const handleQuickDemoAccess = () => {
    if (executing) return;
    setOperatorId("Student Operator");
    setEmail("student@studymate.edu");
    setAccessKey("quantum-hex-2026");

    setExecuting(true);
    setProgressPercent(30);
    setTerminalLog("DEMO OPERATOR IDENTIFIED...");

    setTimeout(() => {
      setProgressPercent(80);
      setTerminalLog("BYPASSING HEXAGONAL GATEWAY...");
    }, 250);

    setTimeout(() => {
      setProgressPercent(100);
      setTerminalLog("DEMO ACCESS GRANTED • LAUNCHING...");

      localStorage.setItem("study-mate-user", "true");
      localStorage.setItem("study-mate-username", "Student Operator");
      localStorage.setItem("study-mate-user-email", "student@studymate.edu");

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 350);
    }, 600);
  };

  // Proper Guest Bypass Protocol
  const handleGuestBypass = () => {
    if (executing) return;

    setExecuting(true);
    setProgressPercent(30);
    setTerminalLog("ENGAGING GUEST BYPASS PROTOCOL...");

    localStorage.setItem("study-mate-user", "true");
    localStorage.setItem("study-mate-username", "Guest Operator");
    localStorage.setItem("study-mate-user-email", "guest@studymate.local");

    setTimeout(() => {
      setProgressPercent(80);
      setTerminalLog("BYPASSING GATEWAY [ANONYMOUS_SESSION]...");
    }, 250);

    setTimeout(() => {
      setProgressPercent(100);
      setTerminalLog("BYPASS GRANTED • WELCOME GUEST OPERATOR");

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 350);
    }, 550);
  };

  return (
    <div className="login-bw-page min-h-screen font-mono selection:bg-black selection:text-white transition-colors duration-300 relative overflow-hidden flex flex-col justify-between">
      {/* ================= MATHEMATICAL HONEYCOMB BACKGROUND ================= */}
      <HoneycombBackground isLight={isLight} />

      {/* ================= RUNNING TOP MARQUEE TICKER ================= */}
      <FunkyTicker />

      {/* ================= TOP HUD DIAGNOSTICS BAR ================= */}
      <header className="login-bw-header relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between gap-4 py-3 px-4 sm:px-6 border-b">
        {/* Brand Logo & Telemetry */}
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* Hexagonal Omega Logo Icon */}
            <div className="login-logo-hex w-10 h-10 clip-hexagon flex items-center justify-center font-black text-lg shadow-lg transition-transform hover:scale-105">
              Ω
            </div>
            <span
              className={`absolute -top-1 -right-1 w-2.5 h-2.5 clip-hexagon animate-ping ${
                isLight ? "bg-black" : "bg-white"
              }`}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black tracking-wider uppercase">
                <DecryptText text="STUDY MATE" speed={30} />
              </h1>
              <span className="login-stamp-decal text-[9px] uppercase font-black px-2 py-0.5 hex-chamfer-sm">
                HEX.v2.4
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest hidden sm:block">
              ACADEMIC_OS // HEXAGONAL_AUTH_GATEWAY
            </p>
          </div>
        </div>

        {/* Right HUD Diagnostic Pills & Theme Switcher */}
        <div className="flex items-center gap-3">
          {/* Real-time Clock */}
          <div className="login-hud-clock hidden sm:flex items-center gap-2 px-3 py-1.5 hex-chamfer-sm text-[11px] font-bold">
            <span className="text-xs">⬢</span>
            <span>UTC: {hudTime || "SYNCING..."}</span>
          </div>

          {/* Funky B&W Theme Switcher */}
          <div className="login-theme-box flex items-center p-1 hex-chamfer-sm">
            <button
              onClick={() => setTheme("dark")}
              title="Dark Theme"
              className={`px-2.5 py-1 hex-chamfer-sm text-xs font-black transition cursor-pointer flex items-center gap-1 ${
                !isLight ? "login-theme-active-dark shadow-xs" : "text-zinc-500 hover:opacity-80"
              }`}
            >
              <span>⬢</span>
              <span>DARK</span>
            </button>
            <button
              onClick={() => setTheme("light")}
              title="Light Theme"
              className={`px-2.5 py-1 hex-chamfer-sm text-xs font-black transition cursor-pointer flex items-center gap-1 ${
                isLight ? "login-theme-active-light shadow-xs" : "text-zinc-500 hover:opacity-80"
              }`}
            >
              <span>⬡</span>
              <span>LIGHT</span>
            </button>
          </div>

          {/* Proper Guest Login Bypass Action */}
          <button
            type="button"
            onClick={handleGuestBypass}
            disabled={executing}
            className="login-guest-btn text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1.5 hex-chamfer-sm inline-flex items-center gap-1 transition cursor-pointer"
            title="Bypass login and access workspace as Guest Operator"
          >
            <span className="hidden sm:inline">GUEST BYPASS</span>
            <span className="sm:hidden">BYPASS</span>
            <span>➔</span>
          </button>
        </div>
      </header>

      {/* ================= MAIN HEXAGONAL TERMINAL CARD ================= */}
      <main className="relative z-10 w-full max-w-xl mx-auto my-6 px-4">
        {/* Outer 2.5px Chamfered Border Frame */}
        <div className="bw-shadow-card login-card-outer hex-chamfer-lg relative transition-all duration-300 p-[2.5px]">
          {/* Inner Card Container */}
          <div className="login-card-inner hex-chamfer-lg relative overflow-hidden transition-colors duration-300 p-6 sm:p-9">
            {/* Top Monochrome Hazard Laser Scanner */}
            <div className="absolute top-0 left-0 w-full h-1 overflow-hidden pointer-events-none">
              <div
                className={`w-1/3 h-full animate-[slide_3s_ease-in-out_infinite] ${
                  isLight ? "bw-hazard-stripes-light" : "bw-hazard-stripes-dark"
                }`}
              />
            </div>

            {/* Corner Hex Coordinates */}
            <div className="absolute top-2.5 left-3 text-[9px] font-black tracking-widest pointer-events-none opacity-60">
              [ ⬢ 0x01 ]
            </div>
            <div className="absolute top-2.5 right-3 text-[9px] font-black tracking-widest pointer-events-none opacity-60">
              [ ⬢ 0x02 ]
            </div>
            <div className="absolute bottom-2.5 left-3 text-[9px] font-black tracking-widest pointer-events-none opacity-60">
              [ ⬢ 0x03 ]
            </div>
            <div className="absolute bottom-2.5 right-3 text-[9px] font-black tracking-widest pointer-events-none opacity-60">
              [ ⬢ 0x04 ]
            </div>

            {/* Funky Tilted Decal Stamp */}
            <div className="login-stamp-decal absolute top-4 right-8 -rotate-6 hidden sm:flex items-center gap-1 px-2 py-0.5 hex-chamfer-sm text-[9px] font-black uppercase tracking-wider select-none">
              <span>✦</span>
              <span>100% LOCAL B&W</span>
            </div>

            {/* Avatar & Title Section */}
            <div className="flex flex-col items-center justify-center text-center mt-2 mb-6">
              {/* Animated Concentric Hexagon Avatar */}
              <HexagonAvatar operatorId={operatorId} isLight={isLight} />

              <h2 className="text-xl sm:text-2xl font-black tracking-tight uppercase flex items-center gap-2">
                <DecryptText
                  text={mode === "login" ? "ACCESS TERMINAL" : "PROVISION OPERATOR"}
                  speed={25}
                />
              </h2>

              <p className="text-xs text-zinc-500 mt-1 max-w-sm font-medium">
                {mode === "login"
                  ? "Authenticate credentials to decrypt your academic workstation."
                  : "Initialize a new zero-knowledge workspace on this hardware node."}
              </p>
            </div>

            {/* Mode Segmented Hexagon Tabs */}
            <div className="login-tab-container grid grid-cols-2 gap-2 p-1.5 hex-chamfer-md mb-6">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`py-2.5 px-3 hex-chamfer-sm text-xs font-black tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mode === "login" ? "login-tab-active" : "login-tab-idle hover:underline"
                }`}
              >
                <span>{mode === "login" ? "⬢" : "⬡"}</span>
                <span>[ 01 // SIGN IN ]</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`py-2.5 px-3 hex-chamfer-sm text-xs font-black tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mode === "signup" ? "login-tab-active" : "login-tab-idle hover:underline"
                }`}
              >
                <span>{mode === "signup" ? "⬢" : "⬡"}</span>
                <span>[ 02 // SIGN UP ]</span>
              </button>
            </div>

            {/* Execution Diagnostic Status Ribbon */}
            {executing && (
              <div className="login-exec-ribbon mb-6 p-4 hex-chamfer-md animate-[fadeIn_0.2s_ease]">
                <div className="flex items-center justify-between mb-2 font-black text-xs">
                  <span className="flex items-center gap-2">
                    <span className="text-sm animate-spin">⬢</span>
                    <span>{terminalLog}</span>
                  </span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full h-2 hex-chamfer-sm overflow-hidden border border-zinc-700 bg-zinc-800">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isLight ? "bg-white" : "bg-black"
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Interactive Form Fields */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {/* Operator Identifier (Username) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-black flex items-center gap-1.5">
                    <span>[ ⬢ 01 ]</span>
                    <span>Operator Name</span>
                  </label>
                  <span className="text-[10px] text-zinc-500 font-mono">SYS.ID</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={operatorId}
                    onChange={(e) => setOperatorId(e.target.value)}
                    disabled={executing}
                    className="login-bw-input w-full px-4 py-3.5 hex-chamfer-md text-sm outline-none transition-all font-mono"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black pointer-events-none opacity-60">
                    [ ID_HEX ]
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-black flex items-center gap-1.5">
                    <span>[ ⬢ 02 ]</span>
                    <span>Encrypted Email</span>
                  </label>
                  <span className="text-[10px] text-zinc-500 font-mono">NET.CHANNEL</span>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="e.g. student@studymate.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={executing}
                    className="login-bw-input w-full px-4 py-3.5 hex-chamfer-md text-sm outline-none transition-all font-mono"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black pointer-events-none opacity-60">
                    [ @_HEX ]
                  </div>
                </div>
              </div>

              {/* Access Key (Password) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-black flex items-center gap-1.5">
                    <span>[ ⬢ 03 ]</span>
                    <span>Access Cipher / Key</span>
                  </label>
                  <span className="text-[10px] text-zinc-500 font-mono">KEY.AUTH</span>
                </div>
                <div className="relative">
                  <input
                    type={showKey ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                    disabled={executing}
                    className="login-bw-input w-full px-4 py-3.5 hex-chamfer-md text-sm outline-none transition-all font-mono pr-20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="login-key-btn absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 hex-chamfer-sm text-[10px] font-black uppercase transition cursor-pointer"
                    title={showKey ? "Hide key" : "Show key"}
                  >
                    {showKey ? "⬢ HIDE" : "⬡ SHOW"}
                  </button>
                </div>

                {/* Funky Hexagon Password Strength Pods */}
                <HexCipherMeter keyStrength={keyStrength} />
              </div>

              {/* Checkbox and Recovery */}
              <div className="flex items-center justify-between text-xs pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none font-bold">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 cursor-pointer accent-current"
                  />
                  <span>Remember Operator</span>
                </label>

                <button
                  type="button"
                  onClick={handleGuestBypass}
                  disabled={executing}
                  className="text-xs font-black uppercase tracking-wider underline hover:opacity-75 transition cursor-pointer"
                  title="Instant guest bypass"
                >
                  [ BYPASS AUTH // GUEST ➔ ]
                </button>
              </div>

              {/* Primary Execute Submit Button */}
              <button
                type="submit"
                disabled={executing}
                className="login-bw-submit w-full mt-4 py-4 hex-chamfer-md font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] bw-shadow-btn flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {executing
                    ? "AUTHENTICATING..."
                    : mode === "login"
                    ? "EXECUTE AUTH PROTOCOL ➔ ⬢"
                    : "PROVISION OPERATOR ➔ ⬢"}
                </span>
              </button>
            </form>

            {/* Quick 1-Click Instant Demo Button */}
            <div className="mt-6 pt-5 border-t border-zinc-800 text-center">
              <button
                type="button"
                onClick={handleQuickDemoAccess}
                disabled={executing}
                className="login-bw-demo w-full py-3 px-4 hex-chamfer-md font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 bw-shadow-btn cursor-pointer"
              >
                <span className="text-sm">⚡</span>
                <span>1-CLICK DEMO (STUDENT OPERATOR) // INSTANT LAUNCH</span>
                <span className="text-xs">⬢</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ================= BOTTOM TELEMETRY FOOTER ================= */}
      <footer className="login-bw-footer relative z-10 w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-bold border-t py-3 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="text-xs">⬢</span>
            <span>NODE: 0x5173</span>
          </span>
          <span>•</span>
          <span>CIPHER: AES-256 LOCAL VAULT</span>
        </div>

        <div className="flex items-center gap-4 font-mono">
          <span>SESSIONS LOGGED: {sessions}</span>
          <span>•</span>
          <Link
            to="/about"
            className="hover:underline transition uppercase tracking-wider"
          >
            [ SPECS ↗ ]
          </Link>
          <span>•</span>
          <Link
            to="/contact"
            className="hover:underline transition uppercase tracking-wider"
          >
            [ RELAY ↗ ]
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Login;
