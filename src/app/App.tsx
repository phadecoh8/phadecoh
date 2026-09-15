import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X, ArrowRight, Mail, MapPin, Phone, Github, Instagram, Linkedin } from "lucide-react";
import emailjs from "@emailjs/browser";

const NAV_LINKS = ["About", "Services", "Work", "Contact"];

const SERVICES = [
  {
    num: "01",
    title: "Frontend Engineering",
    desc: "Production-grade React and TypeScript, built for performance. Pixel-perfect implementation from design to deployed product.",
    badge: "COMPLETED",
  },
  {
    num: "02",
    title: "Motion & Animation",
    desc: "Purposeful motion that communicates — not decoration. From micro-interactions to full-page transitions built in code.",
    badge: "COMPLETED",
  },
  {
    num: "03",
    title: "Backend Development",
    desc: "Server-side architecture, REST APIs, databases, and scalable infrastructure — building the engine that powers great products.",
    badge: "LEARNING",
  },
  {
    num: "04",
    title: "AI & Machine Learning",
    desc: "Exploring intelligent systems, model integration, and data-driven features that make products smarter and more adaptive.",
    badge: "LEARNING",
  },
];

const PROJECTS = [
  {
    title: "Fildtek",
    category: "Product Design · UI/UX · Brand",
    year: "2026",
    url: "https://fildtek.com",
    desc: "Nigeria's Property Trust Layer — a PropTech platform built to eliminate fraud in real estate transactions through a three-tier verification system covering identity (NIN/BVN), documentation, and GPS-confirmed physical site inspection.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=700&fit=crop&auto=format",
    alt: "Fildtek — Nigeria's property verification and trust platform",
  },
  {
    title: "Blue-Essence",
    category: "UI/UX · Product Design · Figma",
    year: "2026",
    url: "https://dirt-violin-27571253.figma.site",
    desc: "A Skincare E-commerce Platform — a Figma prototype for a skincare brand, showcasing a clean and intuitive user interface with a focus on product discovery, seamless checkout, and personalized recommendations.",
    img: "data:image/jpeg;base64,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",
    alt: "Interactive UI prototype — Figma design system and product flows",
  },

  {
    title: "LinSentry",
    category: "Bash . Shell . Coming Soon",
    year: "2026",
    url: "https://github.com/phadecoh8/LinSentry",
    desc: "A linux lightweight security hardening auditor, written in Bash.",
    img: "https://images.unsplash.com/photo-1640552435845-d65c23b75934?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "LinSentry",
  },

];

const SOCIAL = [
  { label: "GitHub", icon: Github, href: "https://github.com/phadecoh8" },
  { label: "X", icon: Twitter, href: "https://x.com/phadecoh" }
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/phad_ecoh" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/fadero-joshua-a474ba375/" },
];

const MARQUEE_ITEMS = [
  "FRONTEND ENGINEERING", "★", "BACKEND DEVELOPER", "★",
  "MOTION DESIGN", "★", "AI & MACHINE LEARNING", "★",
];

const EMAILJS_SERVICE_ID = "service_od0g63w";
const EMAILJS_TEMPLATE_ID = "template_46pya5g";
const EMAILJS_PUBLIC_KEY = "Tkq3nycH_3MGoaFzE";

// ─── Marquee ─────────────────────────────────────────────────────────────────

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden border-y border-border py-4 bg-[#c8ff00]">
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite", width: "max-content" }}
      >
        {items.map((item, i) => (
          <span key={i} className="text-sm tracking-widest text-black font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ─── Static Hero Grid ─────────────────────────────────────────────────────────

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,255,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => scrollTo("hero")}
          className="text-foreground font-bold text-sm"
          style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.2em" }}
        >
          <span style={{ color: "#c8ff00" }}>-</span>FADERO<span style={{ color: "#c8ff00" }}>-</span>
        </button>

        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link.toLowerCase())}
                className="text-sm tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
                style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em" }}
              >
                {link.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="mailto:faderojoshua99@gmail.com"
          className="hidden md:flex items-center gap-2 text-xs tracking-widest px-5 py-2.5 border border-[#c8ff00] text-[#c8ff00] hover:bg-[#c8ff00] hover:text-black transition-all duration-200"
          style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em" }}
        >
          HIRE ME <ArrowUpRight size={12} />
        </a>

        <button className="md:hidden text-foreground p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-border px-6 pb-8 pt-6 flex flex-col gap-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="text-left text-2xl font-bold text-foreground hover:text-[#c8ff00] transition-colors"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              {link.toUpperCase()}
            </button>
          ))}
          <a
            href="mailto:faderojoshua99@gmail.com"
            className="mt-4 inline-flex items-center gap-2 text-xs tracking-widest px-5 py-3 bg-[#c8ff00] text-black font-medium w-fit"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            HIRE ME <ArrowUpRight size={12} />
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-end pb-16 pt-28 md:pt-0 md:justify-center relative overflow-hidden"
    >
      <AnimatedGrid />

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="flex-1">
            <p className="text-[#c8ff00] text-xs tracking-[0.3em] mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>
              CREATIVE TECHNOLOGIST & DESIGNER
            </p>
            <h1
              className="text-[clamp(4rem,13vw,11rem)] leading-[0.88] font-normal uppercase text-foreground"
              style={{ fontFamily: "'Anton', sans-serif", letterSpacing: "-0.01em" }}
            >
              FADERO
              <br />
              <span style={{ color: "#c8ff00" }}>JOSHUA</span>
            </h1>
          </div>

          <div className="md:max-w-xs flex flex-col gap-8">
            <p className="text-muted-foreground text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              I craft digital experiences that sit at the intersection of bold design and precision engineering — from pixel to production.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-[#c8ff00] text-black text-sm font-medium tracking-wider hover:bg-white transition-colors duration-200"
                style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}
              >
                VIEW WORK <ArrowRight size={14} />
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center justify-center gap-2 px-7 py-3.5 border border-border text-foreground text-sm tracking-wider hover:border-[#c8ff00] hover:text-[#c8ff00] transition-colors duration-200"
                style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}
              >
                CONTACT
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#c8ff00] animate-pulse" />
          <span className="text-xs text-muted-foreground tracking-widest" style={{ fontFamily: "'DM Mono', monospace" }}>
            AVAILABLE FOR FREELANCE — 2026
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Default Avatar ───────────────────────────────────────────────────────────

function DefaultAvatar() {
  return (
    <div className="w-full h-full bg-[#111111] flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,255,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2/3 h-auto relative z-10 opacity-80">
        <ellipse cx="100" cy="72" rx="38" ry="42" fill="#1e1e1e" stroke="#c8ff00" strokeWidth="1.5" />
        <ellipse cx="100" cy="68" rx="26" ry="30" fill="#161616" />
        <path d="M18 240 C18 178 42 158 100 158 C158 158 182 178 182 240Z" fill="#1e1e1e" stroke="#c8ff00" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M80 158 L100 185 L120 158" stroke="#c8ff00" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      </svg>
      <div className="absolute bottom-0 left-0 w-12 h-1 bg-[#c8ff00]" />
      <div className="absolute bottom-0 left-0 w-1 h-12 bg-[#c8ff00]" />
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="py-28 md:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6">
          <div className="md:col-span-5 flex flex-col gap-8">
            <p className="text-xs tracking-[0.3em] text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
              [ ABOUT ME ]
            </p>

            <div className="relative aspect-[4/5] overflow-hidden border border-border">
              <DefaultAvatar />
              <div className="absolute bottom-5 left-5 text-[#c8ff00] text-xs tracking-widest" style={{ fontFamily: "'DM Mono', monospace" }}>
                FADERO JOSHUA
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 flex-wrap">
              {SOCIAL.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex items-center gap-2.5 border border-border px-4 py-2.5 hover:border-[#c8ff00] transition-colors duration-200"
                >
                  <Icon size={14} className="text-muted-foreground group-hover:text-[#c8ff00] transition-colors duration-200" />
                  <span
                    className="text-[10px] tracking-widest text-muted-foreground group-hover:text-[#c8ff00] transition-colors duration-200"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {label.toUpperCase()}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 md:pl-10 flex flex-col justify-center gap-10">
            <div className="flex flex-col gap-6">
              <h2
                className="text-[clamp(2.8rem,6vw,5rem)] leading-[0.92] uppercase text-foreground"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                BUILDING THE <br />
                <span style={{ color: "#c8ff00" }}>FUTURE,</span> ONE<br />
                PIXEL AT A TIME.
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                I&apos;m Fadero Joshua — a Nigeria-based creative technologist turning complex problems into refined digital products. I work across Backend Development, frontend engineering, bringing a systems-thinking approach to every project.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                My work lives in the space between craft and code — where a great idea meets disciplined execution. I partner with startups, studios, and forward-thinking brands who demand both beauty and function.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["React/Vite", "TypeScript", "Bash", "Next.js", "JavaScript"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-widest border border-border px-3 py-1.5 text-muted-foreground"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="py-28 md:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>
              [ SERVICES ]
            </p>
            <h2 className="text-[clamp(2.8rem,6vw,5rem)] leading-[0.92] uppercase text-foreground" style={{ fontFamily: "'Anton', sans-serif" }}>
              WHAT I DO
              <br />
              <span style={{ color: "#c8ff00" }}>BEST.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            End-to-end digital services — from concept to code, strategy to screen.
          </p>
        </div>

        <div className="flex flex-col border-t border-border">
          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-10 py-8 border-b border-border cursor-default transition-all duration-200"
              style={{
                background: hovered === i ? "rgba(200,255,0,0.04)" : "transparent",
                paddingLeft: hovered === i ? "1.5rem" : "0",
              }}
            >
              <span className="text-xs text-muted-foreground pt-1 shrink-0" style={{ fontFamily: "'DM Mono', monospace", minWidth: "3rem" }}>
                {s.num}
              </span>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3
                    className="text-2xl md:text-3xl uppercase text-foreground group-hover:text-[#c8ff00] transition-colors duration-200"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    {s.title}
                  </h3>
                  {/* Badge */}
                  <span
                    className="text-[9px] tracking-widest px-2 py-1 border shrink-0"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      color: s.badge === "COMPLETED" ? "#c8ff00" : "#888880",
                      borderColor: s.badge === "COMPLETED" ? "#c8ff00" : "rgba(255,255,255,0.12)",
                      background: s.badge === "COMPLETED" ? "rgba(200,255,0,0.08)" : "rgba(255,255,255,0.03)",
                    }}
                  >
                    {s.badge}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed md:max-w-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {s.desc}
                </p>
              </div>
              <ArrowUpRight size={18} className="shrink-0 text-muted-foreground group-hover:text-[#c8ff00] transition-colors duration-200 mt-1 hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Work ─────────────────────────────────────────────────────────────────────

function Work() {
  return (
    <section id="work" className="py-28 md:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>
              [ SELECTED WORK ]
            </p>
            <h2 className="text-[clamp(2.8rem,6vw,5rem)] leading-[0.92] uppercase text-foreground" style={{ fontFamily: "'Anton', sans-serif" }}>
              RECENT
              <br />
              <span style={{ color: "#c8ff00" }}>PROJECTS.</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs tracking-widest text-[#c8ff00] hover:text-white transition-colors"
            style={{ fontFamily: "'DM Mono', monospace" }}
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            START A PROJECT <ArrowUpRight size={12} />
          </a>
        </div>

        <div className="flex flex-col gap-px bg-border">
          {PROJECTS.map((p) => (
            <div key={p.title} className="bg-background">
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden bg-[#111111] cursor-pointer">
                <div className="aspect-[16/7] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.alt}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <p className="text-[10px] tracking-widest text-[#c8ff00] mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {p.category} · {p.year}
                  </p>
                  <h3 className="text-4xl md:text-6xl text-white uppercase" style={{ fontFamily: "'Anton', sans-serif" }}>
                    {p.title}
                  </h3>
                </div>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-[#c8ff00] flex items-center justify-center">
                    <ArrowUpRight size={18} className="text-black" />
                  </div>
                </div>
              </a>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 py-8 border-b border-border">
                <span className="text-[10px] tracking-[0.25em] text-muted-foreground shrink-0" style={{ fontFamily: "'DM Mono', monospace" }}>
                  PROJECT OVERVIEW
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed md:max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {p.desc}
                </p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 text-[10px] tracking-widest text-[#c8ff00] hover:text-white transition-colors border border-[#c8ff00] hover:border-white px-4 py-2.5 h-fit"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  VISIT SITE <ArrowUpRight size={10} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

type SendStatus = "idle" | "sending" | "success" | "error";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<SendStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current)
      .then(() => {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  };

  return (
    <section id="contact" className="py-28 md:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          {/* Left */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>
                [ CONTACT ]
              </p>
              <h2 className="text-[clamp(3rem,6vw,5rem)] leading-[0.92] uppercase text-foreground" style={{ fontFamily: "'Anton', sans-serif" }}>
                LET&apos;S BUILD
                <br />
                SOMETHING
                <br />
                <span style={{ color: "#c8ff00" }}>GREAT.</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Have a project in mind? I&apos;m open to new collaborations, freelance gigs, and full-time opportunities. Let&apos;s talk.
            </p>
            <div className="flex flex-col gap-5 mt-4">
              {[
                { icon: Mail, label: "faderojoshua99@gmail.com" },
                { icon: Phone, label: "+234 913 919 2758" },
                { icon: MapPin, label: "Nigeria" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-9 h-9 border border-border flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-[#c8ff00]" />
                  </div>
                  <span className="text-sm text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              {SOCIAL.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group w-10 h-10 border border-border flex items-center justify-center hover:border-[#c8ff00] transition-colors duration-200"
                >
                  <Icon size={15} className="text-muted-foreground group-hover:text-[#c8ff00] transition-colors duration-200" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === "success" ? (
              <div className="flex flex-col items-start gap-4 h-full justify-center">
                <div className="w-12 h-12 bg-[#c8ff00] flex items-center justify-center text-black text-2xl font-bold">✓</div>
                <h3 className="text-3xl text-foreground uppercase" style={{ fontFamily: "'Anton', sans-serif" }}>
                  MESSAGE SENT!
                </h3>
                <p className="text-muted-foreground text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Thanks for reaching out — I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-xs text-[#c8ff00] tracking-widest mt-2 hover:text-white transition-colors"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  SEND ANOTHER →
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                {[
                  { id: "name", label: "FULL NAME", type: "text", placeholder: "Your name", emailjsName: "from_name" },
                  { id: "email", label: "EMAIL ADDRESS", type: "email", placeholder: "you@example.com", emailjsName: "from_email" },
                ].map((field) => (
                  <div key={field.id} className="flex flex-col gap-2">
                    <label
                      htmlFor={field.id}
                      className="text-[10px] tracking-[0.25em] text-muted-foreground"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.emailjsName}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={form[field.id as "name" | "email"]}
                      onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                      className="w-full bg-[#111111] border border-border px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#c8ff00] transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] tracking-[0.25em] text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                    YOUR MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#111111] border border-border px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#c8ff00] transition-colors resize-none"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>

                {/* Error / validation feedback — styled to match portfolio */}
                {status === "error" && (
                  <div
                    className="flex items-start gap-3 border px-4 py-3"
                    style={{ borderColor: "rgba(200,255,0,0.3)", background: "rgba(200,255,0,0.05)" }}
                  >
                    <span className="text-[#c8ff00] text-xs mt-0.5">!</span>
                    <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: "'DM Mono', monospace" }}>
                      SEND FAILED — please check your connection and try again, or reach me directly at faderojoshua99@gmail.com
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 flex items-center justify-center gap-2 bg-[#c8ff00] text-black text-sm font-medium py-4 tracking-widest hover:bg-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em" }}
                >
                  {status === "sending" ? "SENDING…" : <><span>SEND MESSAGE</span> <ArrowRight size={14} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xs text-muted-foreground tracking-widest" style={{ fontFamily: "'DM Mono', monospace" }}>
          © {year} FADERO JOSHUA. ALL RIGHTS RESERVED.
        </span>
        <div className="flex items-center gap-6">
          {SOCIAL.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-widest text-muted-foreground hover:text-[#c8ff00] transition-colors"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {label.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Work />
      <Contact />
      <Footer />
    </div>
  );
}
