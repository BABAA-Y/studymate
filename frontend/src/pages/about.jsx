import { Link } from "react-router-dom";

function About() {
  const technologies = [
    {
      name: "React",
      description: "Frontend",
      logo: "https://cdn.simpleicons.org/react",
      link: "https://react.dev/",
    },
    {
      name: "JavaScript",
      description: "Application logic",
      logo: "https://cdn.simpleicons.org/javascript",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      name: "Python",
      description: "Backend",
      logo: "https://cdn.simpleicons.org/python",
      link: "https://www.python.org/",
    },
    {
      name: "FastAPI",
      description: "REST API",
      logo: "https://cdn.simpleicons.org/fastapi",
      link: "https://fastapi.tiangolo.com/",
    },
    {
      name: "MongoDB",
      description: "Database",
      logo: "https://cdn.simpleicons.org/mongodb",
      link: "https://www.mongodb.com/",
    },
    {
      name: "Tailwind CSS",
      description: "Styling",
      logo: "https://cdn.simpleicons.org/tailwindcss",
      link: "https://tailwindcss.com/",
    },
    {
      name: "Vite",
      description: "Build tool",
      logo: "https://cdn.simpleicons.org/vite",
      link: "https://vite.dev/",
    },
    {
      name: "React Router",
      description: "Navigation",
      logo: "https://cdn.simpleicons.org/reactrouter",
      link: "https://reactrouter.com/",
    },
  ];

  const features = [
    {
      number: "01",
      title: "Task Management",
      description:
        "Create and manage your study tasks while keeping track of what needs to be done.",
      route: "/tasks",
    },
    {
      number: "02",
      title: "Notes",
      description:
        "Keep your important study notes organized and easy to access.",
      route: "/notes",
    },
    {
      number: "03",
      title: "Subjects",
      description:
        "Organize your subjects and keep track of your academic progress.",
      route: "/subjects",
    },
    {
      number: "04",
      title: "Schedule",
      description:
        "Plan your study sessions and organize your daily routine.",
      route: "/schedule",
    },
    {
      number: "05",
      title: "Study Timer",
      description:
        "Use focused study sessions to stay consistent and productive.",
      route: "/timer",
    },
    {
      number: "06",
      title: "Progress",
      description:
        "Track your study activity and see your progress over time.",
      route: "/progress",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto pt-8 pb-12">

      {/* Hero */}
      <section className="relative text-center pt-6 pb-12 overflow-hidden">

        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-white/[0.04] rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* Logo */}
        <div className="relative w-28 h-28 mx-auto mb-7 group">

          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-[2rem] border border-zinc-700 animate-[spin_10s_linear_infinite]" />

          {/* Inner rotating ring */}
          <div className="absolute inset-3 rounded-[1.5rem] border border-zinc-800 animate-[spin_7s_linear_infinite_reverse]" />

          {/* Logo */}
          <div className="absolute inset-6 clip-hexagon bg-white text-black flex items-center justify-center text-3xl sm:text-4xl font-black shadow-[0_0_35px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform duration-300 overflow-hidden">
            <span>Ω</span>
            <div className="absolute top-0 left-0 w-full h-px overflow-hidden pointer-events-none">
              <div className="w-1/2 h-full bg-white/70 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out" />
            </div>
          </div>

          {/* Floating dots */}
          <div className="absolute top-0 right-3 w-2 h-2 rounded-full bg-white animate-ping" />

          <div className="absolute bottom-2 left-1 w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" />

        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold tracking-tight">
          Study Mate
        </h1>

        {/* Animated line */}
        <div className="mx-auto mt-4 w-24 h-px bg-zinc-800 overflow-hidden">
          <div className="w-8 h-px bg-white animate-[slide_2.5s_ease-in-out_infinite]" />
        </div>

        {/* Description */}
        <p className="mt-5 max-w-2xl mx-auto text-zinc-400 text-lg leading-7">
          A modern study management platform designed to help students
          organize their tasks, notes, subjects, schedules, and study
          sessions in one place.
        </p>

        {/* Version */}
        <span className="inline-block mt-5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-sm text-zinc-400">
          Version 1.0.0
        </span>

      </section>

      {/* About */}
      <section className="mb-12">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            About the Project
          </p>

          <h2 className="text-2xl font-semibold mt-2">
            Built to make studying simpler.
          </h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-300">
          <p className="text-zinc-400 leading-7 max-w-4xl">
            Study Mate brings the essential tools students need into
            one workspace. Manage tasks, notes, subjects, schedules,
            and study sessions without switching between different
            applications.
          </p>

          <p className="text-zinc-500 leading-7 max-w-4xl mt-3">
            The goal is simple — make studying more organized,
            focused, and easier to manage.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mb-12">
        <div className="mb-6 mt-7">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Features
          </p>

          <h2 className="text-2xl font-semibold mt-2">
            Everything in one place
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Link
              key={feature.number}
              to={feature.route}
              className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-500"
            >

              {/* Animated top line */}
              <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
                <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
              </div>

              {/* Hover glow */}
              <div className="absolute -inset-16 bg-white/[0.03] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Card content */}
              <div className="relative z-10">

                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs text-zinc-600 font-mono group-hover:text-zinc-400 transition-colors">
                    {feature.number}
                  </span>

                  <span className="text-zinc-600 text-lg group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>

                <p className="text-sm text-zinc-500 leading-6">
                  {feature.description}
                </p>

              </div>

            </Link>
          ))}
        </div>
      </section>

      {/* Technology */}
      <section className="mb-12">
        <div className="mb-6 mt-7">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Technology
          </p>

          <h2 className="text-2xl font-semibold mt-2">
            Built with modern technologies
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {technologies.map((tech) => (
            <a
              key={tech.name}
              href={tech.link}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-500"
            >

              {/* Animated top line */}
              <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
                <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
              </div>

              {/* Hover glow */}
              <div className="absolute -inset-12 bg-white/[0.025] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 flex items-center gap-3">

                {/* Logo */}
                <div className="w-10 h-10 rounded-lg bg-black border border-zinc-800 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-zinc-600 transition-all duration-300">
                  <img
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    className="w-6 h-6 object-contain"
                  />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm truncate group-hover:text-white transition-colors">
                    {tech.name}
                  </h3>

                  <p className="text-xs text-zinc-500 mt-1">
                    {tech.description}
                  </p>
                </div>

                {/* External arrow */}
                <span className="text-zinc-700 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                  ↗
                </span>

              </div>

            </a>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="mb-12">
        <div className="mb-6 mt-7">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Architecture
          </p>

          <h2 className="text-2xl font-semibold mt-2">
            How Study Mate is built
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">

          <Architecture
            title="Frontend"
            description="User interface"
            items={[
              "React",
              "JavaScript",
              "Tailwind CSS",
              "React Router",
            ]}
          />

          <Architecture
            title="Backend"
            description="Application & API"
            items={[
              "Python",
              "FastAPI",
              "REST API",
            ]}
          />

          <Architecture
            title="Database"
            description="Data storage"
            items={[
              "MongoDB",
            ]}
          />
        </div>
      </section>

      {/* Developer & Connect */}
      <section className="mb-12">
        <div className="mb-6 mt-7">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
            Developer
          </p>

          <h2 className="text-2xl font-semibold mt-2">
            Connect with Ayush Bhandari
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://github.com/BABAA-Y"
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
              <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-zinc-600 transition-all">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm group-hover:text-white">
                    GitHub
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">@BABAA-Y</p>
                </div>
              </div>
              <span className="text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/ayushbhandarii/"
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
              <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-zinc-600 transition-all">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6h2.8v-7.6h-2.8M7.86 6.3a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm group-hover:text-white">
                    LinkedIn
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    ayushbhandarii
                  </p>
                </div>
              </div>
              <span className="text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </div>
          </a>

          <a
            href="mailto:bhandariayush72@gmail.com"
            className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
              <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-zinc-600 transition-all">
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
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm group-hover:text-white">
                    Email
                  </h3>
                  <p className="text-xs text-zinc-500 truncate font-mono">
                    bhandariayush72@gmail.com
                  </p>
                </div>
              </div>
              <span className="text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 pt-6 text-sm text-zinc-500 mt-5">
        <div className="mt-4 flex flex-col sm:flex-row justify-between">
          <p>Study Mate — Built for students.</p>

          <p>Version 1.0.0</p>
        </div>
      </footer>
    </div>
  );
}

function Architecture({ title, description, items }) {
  return (
    <div className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-500">

      {/* Animated top line */}
      <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
        <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
      </div>

      {/* Soft hover glow */}
      <div className="absolute -inset-16 bg-white/[0.03] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {title}
          </h3>

          <span className="text-xs text-zinc-600 font-mono">
            {title === "Frontend" && "01"}
            {title === "Backend" && "02"}
            {title === "Database" && "03"}
          </span>
        </div>

        <p className="text-xs text-zinc-500 mt-2">
          {description}
        </p>
      </div>

      {/* Tech items */}
      <div className="relative z-10 flex flex-col gap-3 mt-3">
        {items.map((item, index) => (
          <div
            key={item}
            className="group/item flex items-center justify-between px-3 py-3 rounded-lg bg-black border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-950 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-zinc-700 font-mono group-hover/item:text-zinc-400 transition-colors">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="text-sm text-zinc-300 group-hover/item:text-white transition-colors">
                {item}
              </span>
            </div>

            <span className="text-zinc-700 group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-300">
              →
            </span>
          </div>
        ))}
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

export default About;