import { useState, useEffect } from "react";

/* ====================================================
   NEONOOHRA ECOSYSTEM WEBSITE - Full Implementation
   All visuals use inline CSS (no external images)
   ==================================================== */

const C = {
  pri: "#2EBAAC", priL: "#E6F8F6", priD: "#1E9A8E",
  sec: "#F3B419", secL: "#FDF5E0",
  acc: "#704D9D", accL: "#EEEBF5",
  pink: "#E31A50", pinkL: "#FDE8ED",
  blue: "#0071AA", blueL: "#E0F0F8",
  bg: "#FFFCF8", bgA: "#F5F3EF",
  dk: "#1E1338", tx: "#2D2D2D", txL: "#6B7280", w: "#FFFFFF",
};

const PAY = {
  once: "https://paystack.shop/pay/thenoohrasupportgroup-onetime",
  rec: "https://paystack.shop/pay/a9wx9n8yht",
};

/* --- Embedded Images (base64) --- */
const IMG = {
  carousel_1: "/images/carousel_1.jpg",
  carousel_2: "/images/carousel_2.jpg",
  body_children: "/images/body_children.jpg",
  body_cluster1: "/images/body_cluster1.jpg",
  body_cluster2: "/images/body_cluster2.jpg",
  body_cluster3: "/images/body_cluster3.jpg",
  body_neospeak: "/images/body_neospeak.jpg",
};


function useMedia(q) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(q);
    setM(mq.matches);
    const h = (e) => setM(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [q]);
  return m;
}

/* --- Reusable Hero Carousel --- */
function HeroCarousel({ slides, gradientColor = C.dk, accentColor = C.sec, children }) {
  const [cur, setCur] = useState(0);
  const mob = useMedia("(max-width: 768px)");

  useEffect(() => {
    const t = setInterval(() => setCur((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section style={{ position: "relative", minHeight: mob ? "60vh" : "70vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      {slides.map((s, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, opacity: i === cur ? 1 : 0, transition: "opacity 1s ease-in-out" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${s.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${gradientColor}E6 0%, ${gradientColor}99 50%, ${gradientColor}40 100%)` }} />
          <Sparkle size={48} color={`${accentColor}40`} style={{ position: "absolute", top: "12%", right: "15%", zIndex: 1 }} />
          <Sparkle size={28} color={`${accentColor}30`} style={{ position: "absolute", bottom: "20%", right: "30%", zIndex: 1 }} />
          <Sparkle size={20} color={`${C.pri}30`} style={{ position: "absolute", top: "55%", right: "8%", zIndex: 1 }} />
        </div>
      ))}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: mob ? "120px 20px 60px" : "100px 24px 80px", width: "100%", textAlign: "center" }}>
        {slides.map((s, i) => (
          <div key={i} style={{ display: i === cur ? "block" : "none" }}>
            {s.icon && <span style={{ fontSize: 48, display: "block", marginBottom: 20 }}>{s.icon}</span>}
            <h1 style={{ fontSize: mob ? 32 : 52, fontWeight: 800, color: C.w, lineHeight: 1.15, marginBottom: 20, letterSpacing: "-1px" }}>{s.h}</h1>
            <p style={{ fontSize: mob ? 16 : 19, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: 36, maxWidth: 650, margin: "0 auto 36px" }}>{s.s}</p>
          </div>
        ))}
        {children}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 48 }}>
          {slides.map((_, i) => <button key={i} onClick={() => setCur(i)} style={{ width: i === cur ? 32 : 10, height: 10, borderRadius: 5, border: "none", background: i === cur ? accentColor : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.3s" }} />)}
        </div>
      </div>
    </section>
  );
}

/* --- Shared Components --- */
function Btn({ children, v = "pri", href, onClick, full, style: cs = {} }) {
  const map = {
    pri: { background: C.pri, color: C.w, border: "none", boxShadow: "0 4px 14px rgba(46,186,172,0.3)" },
    sec: { background: C.sec, color: C.dk, border: "none", boxShadow: "0 4px 14px rgba(243,180,25,0.3)" },
    out: { background: "transparent", color: C.pri, border: `2px solid ${C.pri}`, boxShadow: "none" },
    outW: { background: "transparent", color: C.w, border: "2px solid rgba(255,255,255,0.5)", boxShadow: "none" },
    wht: { background: C.w, color: C.pri, border: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.08)" },
    acc: { background: C.acc, color: C.w, border: "none", boxShadow: "0 4px 14px rgba(112,77,157,0.3)" },
    pink: { background: C.pink, color: C.w, border: "none", boxShadow: "0 4px 14px rgba(227,26,80,0.25)" },
    blue: { background: C.blue, color: C.w, border: "none", boxShadow: "0 4px 14px rgba(0,113,170,0.25)" },
  };
  const base = { ...map[v], padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "inline-block", textAlign: "center", transition: "all 0.25s ease", width: full ? "100%" : "auto", fontFamily: "inherit", ...cs };
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={base}>{children}</a>;
  return <button onClick={onClick} style={base}>{children}</button>;
}

function Card({ children, style: cs = {}, border }) {
  return <div style={{ background: C.w, borderRadius: 20, padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.04)", transition: "all 0.3s ease", borderTop: border || "none", ...cs }}>{children}</div>;
}

function SecTitle({ tag, title, sub, align = "center", light }) {
  return (
    <div style={{ textAlign: align, marginBottom: 48, maxWidth: align === "center" ? 640 : "none", marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>
      {tag && <span style={{ display: "inline-block", background: light ? "rgba(255,255,255,0.15)" : C.priL, color: light ? C.w : C.pri, padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 16, letterSpacing: 0.5 }}>{tag}</span>}
      <h2 style={{ fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 800, color: light ? C.w : C.dk, lineHeight: 1.2, marginBottom: 16 }}>{title}</h2>
      {sub && <p style={{ fontSize: 17, color: light ? "rgba(255,255,255,0.75)" : C.txL, lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

/* --- Sparkle Star Motif (brand element) --- */
function Sparkle({ size = 24, color = C.sec, style: cs = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ ...cs }}>
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z"/>
    </svg>
  );
}

/* --- CSS Image Placeholder (no external URLs) --- */
function PlaceholderImg({ emoji, label, h = 300, gradient, r = 16, style: cs = {} }) {
  const grads = {
    warm: `linear-gradient(135deg, ${C.sec}40 0%, ${C.pri}30 50%, ${C.pink}15 100%)`,
    cool: `linear-gradient(135deg, ${C.blue}30 0%, ${C.pri}30 50%, ${C.priL} 100%)`,
    purple: `linear-gradient(135deg, ${C.acc}30 0%, ${C.pink}20 50%, ${C.accL} 100%)`,
    orange: `linear-gradient(135deg, ${C.sec}40 0%, ${C.sec}20 50%, ${C.secL} 100%)`,
    green: `linear-gradient(135deg, ${C.pri}40 0%, ${C.blue}20 50%, ${C.priL} 100%)`,
    soft: `linear-gradient(135deg, ${C.secL} 0%, ${C.pinkL}60 100%)`,
    pink: `linear-gradient(135deg, ${C.pink}30 0%, ${C.acc}20 50%, ${C.pinkL} 100%)`,
    blue: `linear-gradient(135deg, ${C.blue}30 0%, ${C.pri}20 50%, ${C.blueL} 100%)`,
  };
  return (
    <div style={{ height: h, borderRadius: r, background: grads[gradient] || grads.warm, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, position: "relative", overflow: "hidden", ...cs }}>
      {/* decorative circles */}
      <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
      <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
      <span style={{ fontSize: 48, zIndex: 1 }}>{emoji}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: C.txL, letterSpacing: 0.5, textTransform: "uppercase", zIndex: 1 }}>{label}</span>
    </div>
  );
}

function RGrid({ cols = 3, gap = 32, children, style: cs = {} }) {
  const mob = useMedia("(max-width: 768px)");
  const tab = useMedia("(max-width: 1024px)") && !mob;
  const gc = mob ? "1fr" : tab ? (cols > 2 ? "repeat(2, 1fr)" : "1fr") : `repeat(${cols}, 1fr)`;
  return <div style={{ display: "grid", gridTemplateColumns: gc, gap, ...cs }}>{children}</div>;
}

/* --- NAVBAR --- */
function NavBar({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mob = useMedia("(max-width: 768px)");

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id) => { setPage(id); setOpen(false); window.scrollTo(0, 0); };

  const links = [
    { id: "home", label: "Home" }, { id: "ecosystem", label: "Ecosystem" },
    { id: "about", label: "About" }, { id: "articles", label: "Articles" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 10000, background: scrolled || open ? C.bg : "transparent", backdropFilter: scrolled ? "blur(10px)" : "none", boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none", transition: "all 0.3s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72, padding: "0 24px" }}>
        <div onClick={() => go("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 2, zIndex: 1001 }}>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>
            <span style={{ color: C.dk }}>Neo</span><span style={{ color: C.acc }}>N</span><span style={{ color: C.blue }}>oo</span><span style={{ color: C.pink }}>hr</span><span style={{ color: C.pri }}>a</span>
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={C.sec} style={{ marginLeft: 2, marginTop: -10 }}>
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z"/>
          </svg>
        </div>
        {mob ? (
          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", zIndex: 1001, padding: 8 }}>
            <div style={{ width: 24, height: 2, background: C.dk, marginBottom: 6, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <div style={{ width: 24, height: 2, background: C.dk, marginBottom: 6, opacity: open ? 0 : 1, transition: "all 0.3s" }} />
            <div style={{ width: 24, height: 2, background: C.dk, transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        ) : (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {links.map((l) => <button key={l.id} onClick={() => go(l.id)} style={{ background: page === l.id ? C.priL : "transparent", color: page === l.id ? C.pri : C.tx, border: "none", padding: "8px 16px", borderRadius: 8, fontSize: 14, fontWeight: page === l.id ? 600 : 500, cursor: "pointer", fontFamily: "inherit" }}>{l.label}</button>)}
            <Btn onClick={() => go("get-involved")} style={{ padding: "10px 20px", fontSize: 14, marginLeft: 8 }}>Get Involved</Btn>
          </div>
        )}
      </div>
      {mob && open && (
        <div style={{ position: "fixed", top: 72, left: 0, right: 0, bottom: 0, background: C.bg, padding: 24, display: "flex", flexDirection: "column", gap: 8, zIndex: 9999, overflowY: "auto" }}>
          {links.map((l) => <button key={l.id} onClick={() => go(l.id)} style={{ background: page === l.id ? C.priL : "transparent", color: page === l.id ? C.pri : C.tx, border: "none", padding: "16px 20px", borderRadius: 12, fontSize: 17, fontWeight: page === l.id ? 700 : 500, cursor: "pointer", textAlign: "left", fontFamily: "inherit", flexShrink: 0 }}>{l.label}</button>)}
          <div style={{ marginTop: 16, flexShrink: 0 }}><Btn full onClick={() => go("get-involved")}>Get Involved</Btn></div>
        </div>
      )}
    </nav>
  );
}

/* --- FOOTER --- */
function Footer({ setPage }) {
  const mob = useMedia("(max-width: 768px)");
  const go = (id) => { setPage(id); window.scrollTo(0, 0); };
  return (
    <footer style={{ background: C.dk, color: C.w, padding: "64px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(4, 1fr)", gap: 40 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, display: "flex", alignItems: "center", gap: 2 }}>
            <span><span style={{ color: C.w }}>Neo</span><span style={{ color: C.acc }}>N</span><span style={{ color: C.blue }}>oo</span><span style={{ color: C.pink }}>hr</span><span style={{ color: C.pri }}>a</span></span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill={C.sec} style={{ marginTop: -6, marginLeft: 2 }}><path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z"/></svg>
          </div>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.7 }}>A learning ecosystem designed for every kind of learner in classrooms, communities, & beyond.</p>
        </div>
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1, color: C.sec }}>Ecosystem</h4>
          {[["Learning Clusters", "clusters"], ["NeoSpeak", "neospeak"], ["Neo Curiosity Corner", "neocorner"]].map(([l, id]) => <a key={id} onClick={() => go(id)} style={{ display: "block", color: "rgba(255,255,255,0.65)", fontSize: 14, cursor: "pointer", marginBottom: 10, textDecoration: "none" }}>{l}</a>)}
        </div>
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1, color: C.sec }}>Get Involved</h4>
          <a href={PAY.once} target="_blank" rel="noopener noreferrer" style={{ display: "block", color: "rgba(255,255,255,0.65)", fontSize: 14, marginBottom: 10, textDecoration: "none" }}>Donate</a>
          <a onClick={() => go("contact")} style={{ display: "block", color: "rgba(255,255,255,0.65)", fontSize: 14, cursor: "pointer", marginBottom: 10, textDecoration: "none" }}>Partner with Us</a>
          <a onClick={() => go("contact")} style={{ display: "block", color: "rgba(255,255,255,0.65)", fontSize: 14, cursor: "pointer", marginBottom: 10, textDecoration: "none" }}>Volunteer</a>
        </div>
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1, color: C.sec }}>Bank Transfer</h4>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}><strong style={{ color: "rgba(255,255,255,0.8)" }}>GBP:</strong> 0736144516 GTBank</p>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}><strong style={{ color: "rgba(255,255,255,0.8)" }}>USD:</strong> 0737144509 GTBank</p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 }}>SWIFT: GTBINGLAXXX</p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "48px auto 0", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>&copy; {new Date().getFullYear()} NeoNoohra. All rights reserved.</div>
    </footer>
  );
}

/* ===========================
   1. HOMEPAGE
   =========================== */
function HomePage({ setPage }) {
  const [cur, setCur] = useState(0);
  const mob = useMedia("(max-width: 768px)");
  const go = (id) => { setPage(id); window.scrollTo(0, 0); };

  const slides = [
    { img: IMG.carousel_1, h: "Unlocking Possibilities for Neurodiversity", s: "A learning ecosystem designed for every kind of learner in classrooms, communities, & beyond." },
    { img: IMG.carousel_2, h: "Where Every Learner Belongs", s: "We dream of a future where the non-verbal can have a seat at the table. In regular jobs & spaces because learning sign language is accessible & normalised." },
  ];

  useEffect(() => {
    const t = setInterval(() => setCur((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {slides.map((s, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, opacity: i === cur ? 1 : 0, transition: "opacity 1s ease-in-out" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${s.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            {/* Dark overlay for text readability */}
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${C.dk}E6 0%, ${C.dk}99 50%, ${C.dk}40 100%)` }} />
            {/* Sparkle decorations */}
            <Sparkle size={48} color={`${C.sec}40`} style={{ position: "absolute", top: "12%", right: "15%", zIndex: 1 }} />
            <Sparkle size={28} color={`${C.sec}30`} style={{ position: "absolute", bottom: "20%", right: "30%", zIndex: 1 }} />
            <Sparkle size={20} color={`${C.pri}30`} style={{ position: "absolute", top: "55%", right: "8%", zIndex: 1 }} />
            <Sparkle size={36} color={`${C.sec}20`} style={{ position: "absolute", bottom: "35%", left: "60%", zIndex: 1 }} />
          </div>
        ))}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: mob ? "120px 20px 60px" : "120px 24px 80px", width: "100%" }}>
          <div style={{ maxWidth: 700 }}>
            {slides.map((s, i) => (
              <div key={i} style={{ display: i === cur ? "block" : "none" }}>
                <h1 style={{ fontSize: mob ? 32 : 52, fontWeight: 800, color: C.w, lineHeight: 1.15, marginBottom: 20, letterSpacing: "-1px" }}>{s.h}</h1>
                <p style={{ fontSize: mob ? 16 : 19, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: 36, maxWidth: 560 }}>{s.s}</p>
              </div>
            ))}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Btn onClick={() => go("contact")}>Join the NeoSpeak Waitlist</Btn>
              <Btn v="outW" onClick={() => go("ecosystem")}>Explore the Ecosystem</Btn>
              <Btn v="sec" href={PAY.once}>Support a Child</Btn>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 48 }}>
            {slides.map((_, i) => <button key={i} onClick={() => setCur(i)} style={{ width: i === cur ? 32 : 10, height: 10, borderRadius: 5, border: "none", background: i === cur ? C.sec : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.3s" }} />)}
          </div>
        </div>
      </section>

      {/* DREAM */}
      <section style={{ padding: mob ? "60px 20px" : "100px 24px", background: C.bg }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 16, color: C.pink, fontWeight: 600, marginBottom: 16, letterSpacing: 1, textTransform: "uppercase" }}>Our Dream</p>
          <p style={{ fontSize: mob ? 18 : 22, color: C.tx, lineHeight: 1.8, fontStyle: "italic" }}>Let's start this journey by sharing one of our dreams with you.</p>
          <div style={{ width: 60, height: 3, background: C.sec, margin: "32px auto", borderRadius: 2 }} />
          <p style={{ fontSize: mob ? 20 : 26, color: C.dk, lineHeight: 1.6, fontWeight: 600, marginBottom: 24 }}>We dream of a future where the non-verbal can have a seat at the table. In regular jobs & spaces because learning sign language is accessible & normalised.</p>
          <p style={{ fontSize: 18, color: C.txL, fontStyle: "italic" }}>Please sit with that for a moment....</p>
          <p style={{ fontSize: 16, color: C.txL, marginTop: 32 }}>Alright let's keep going.</p>
        </div>
      </section>

      {/* WHAT IS NEONOOHRA */}
      <section style={{ padding: mob ? "60px 20px" : "100px 24px", background: C.w }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 32 : 64, alignItems: "center" }}>
          <div>
            <SecTitle tag="About Us" title="What is NeoNoohra?" align="left" />
            <p style={{ fontSize: 17, color: C.tx, lineHeight: 1.8, marginBottom: 16 }}>NeoNoohra is a learning ecosystem that provides high quality learning experiences for the neurodivergent & the neurotypical by combining technology, inclusive education practices & research.</p>
            <p style={{ fontSize: 17, color: C.tx, lineHeight: 1.8, marginBottom: 8 }}><strong>Who is it for?</strong></p>
            <p style={{ fontSize: 17, color: C.tx, lineHeight: 1.8, marginBottom: 24 }}>All learners, especially neurodivergent & underserved communities.</p>
            <p style={{ fontSize: 17, color: C.tx, lineHeight: 1.8, marginBottom: 8 }}>We provide:</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: C.pri }}>Real access. Real impact.</p>
          </div>
          <div style={{ height: mob ? 260 : 380, borderRadius: 16, overflow: "hidden" }}><img src={IMG.body_children} alt="Children learning together" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
        </div>
      </section>

      {/* ECOSYSTEM 3 BLOCKS */}
      <section style={{ padding: mob ? "60px 20px" : "100px 24px", background: C.bgA }}>
        <SecTitle tag="Our Ecosystem" title="The NeoNoohra Ecosystem" sub="Three interconnected worlds working together to transform learning." />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <RGrid cols={3}>
            {[
              { icon: "📚", t: "Learning Clusters", d: "Safe, flexible learning spaces for out-of-school & homeschooled children.", p: "clusters", c: C.pri },
              { icon: "🤟", t: "NeoSpeak", d: "Gamified sign language learning powered by AI & machine learning.", p: "neospeak", c: C.acc },
              { icon: "🔬", t: "Neo Curiosity Corner", d: "A research group where educators, parents, & researchers explore better ways to support learning.", p: "neocorner", c: C.sec },
            ].map((e, i) => (
              <Card key={i} border={`4px solid ${e.c}`} style={{ cursor: "pointer" }}>
                <div onClick={() => go(e.p)}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{e.icon}</div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: C.dk, marginBottom: 12 }}>{e.t}</h3>
                  <p style={{ fontSize: 15, color: C.txL, lineHeight: 1.7, marginBottom: 20 }}>{e.d}</p>
                  <span style={{ color: e.c, fontWeight: 600, fontSize: 14 }}>Explore →</span>
                </div>
              </Card>
            ))}
          </RGrid>
        </div>
      </section>

      {/* HOW WE SERVE */}
      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: `linear-gradient(135deg, ${C.dk} 0%, ${C.acc} 100%)` }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <SecTitle tag="How We Serve" title="Education that adapts to the learner" light />
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", lineHeight: 1.8 }}>We combine technology, curriculum, & community-based learning to deliver education that adapts to the learner, not the other way around.</p>
        </div>
      </section>

      {/* IMPACT */}
      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.w }}>
        <SecTitle tag="Our Impact" title="Making a difference, one learner at a time" />
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <RGrid cols={3}>
            {[{ n: "20+", l: "Learners Reached" }, { n: "2", l: "Clusters Created" }, { n: "5", l: "Sessions Completed" }].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: mob ? 44 : 56, fontWeight: 800, color: C.pri, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 15, color: C.txL, marginTop: 8, fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </RGrid>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: `linear-gradient(135deg, ${C.dk} 0%, ${C.acc}CC 100%)`, position: "relative", overflow: "hidden" }}>
        <Sparkle size={40} color={`${C.sec}40`} style={{ position: "absolute", top: "15%", right: "8%", opacity: 0.5 }} />
        <Sparkle size={24} color={`${C.sec}30`} style={{ position: "absolute", bottom: "20%", left: "5%", opacity: 0.4 }} />
        <Sparkle size={18} color={`${C.pri}30`} style={{ position: "absolute", top: "40%", left: "15%", opacity: 0.3 }} />
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: mob ? 28 : 36, fontWeight: 800, color: C.w, marginBottom: 16 }}>Ready to make a difference?</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, marginBottom: 36, lineHeight: 1.7 }}>Whether you want to join our community, sponsor a child, or partner with us - every action counts.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn onClick={() => go("contact")}>Join the NeoSpeak Waitlist</Btn>
            <Btn v="sec" href={PAY.once}>Sponsor a Child</Btn>
            <Btn v="outW" onClick={() => go("contact")}>Partner With Us</Btn>
            <Btn v="outW" href={PAY.rec}>Support Development</Btn>
            <Btn v="wht" onClick={() => go("contact")}>Join The Neo Corner Community</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===========================
   2. ECOSYSTEM PAGE
   =========================== */
function EcosystemPage({ setPage }) {
  const mob = useMedia("(max-width: 768px)");
  const go = (id) => { setPage(id); window.scrollTo(0, 0); };

  const pillars = [
    { icon: "📚", t: "Learning Clusters", p: "clusters", d: "Learning clusters are simple, structured learning environments designed to provide access to high-quality education without the need for a traditional classroom.", who: ["Neurodivergent & neurotypical learners", "Homeschooling families", "Out-of-school children"], c: C.pri, grad: "green", emoji: "🏫" },
    { icon: "🤟", t: "NeoSpeak", p: "neospeak", d: "NeoSpeak is a gamified sign language learning tool designed to make communication accessible, engaging, & inclusive.", who: ["Non-verbal individuals", "Verbal individuals"], c: C.acc, grad: "purple", emoji: "🤟" },
    { icon: "🔬", t: "Neo Curiosity Corner", p: "neocorner", d: "A research group where learning is continuously explored, tested, & improved through real conversations & shared experiences.", who: ["Educators", "Learning designers", "Psychologists", "Parents", "Researchers", "Enthusiasts interested in inclusive learning"], c: C.sec, grad: "orange", emoji: "💡" },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.bg }}>
        <SecTitle tag="The Ecosystem" title="What does an inclusive learning ecosystem look like?" sub="Three interconnected worlds - each one a doorway to a better way of learning." />
      </section>
      {pillars.map((p, i) => (
        <section key={i} style={{ padding: mob ? "60px 20px" : "80px 24px", background: i % 2 === 0 ? C.w : C.bgA }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 32 : 64, alignItems: "center" }}>
            {(!mob && i % 2 === 1) && <PlaceholderImg emoji={p.emoji} label={p.t} h={340} gradient={p.grad} />}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 36 }}>{p.icon}</span>
                <h2 style={{ fontSize: mob ? 26 : 32, fontWeight: 800, color: C.dk }}>{p.t}</h2>
              </div>
              <p style={{ fontSize: 17, color: C.tx, lineHeight: 1.8, marginBottom: 24 }}>{p.d}</p>
              <p style={{ fontWeight: 700, color: C.dk, marginBottom: 10, fontSize: 15 }}>Who it's for:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {p.who.map((w, j) => <span key={j} style={{ background: C.priL, color: C.pri, padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500 }}>{w}</span>)}
              </div>
              <Btn onClick={() => go(p.p)} style={{ background: p.c }}>Enter this world →</Btn>
            </div>
            {(mob || i % 2 === 0) && <PlaceholderImg emoji={p.emoji} label={p.t} h={mob ? 240 : 340} gradient={p.grad} />}
          </div>
        </section>
      ))}
    </div>
  );
}

/* ===========================
   3. LEARNING CLUSTERS PAGE
   =========================== */
function ClustersPage({ setPage }) {
  const mob = useMedia("(max-width: 768px)");
  const go = (id) => { setPage(id); window.scrollTo(0, 0); };

  const clusterSlides = [
    { img: IMG.carousel_1, icon: "📚", h: "Learning Clusters", s: "Simple, safe, & structured learning spaces that make education accessible without needing a traditional classroom." },
    { img: IMG.carousel_2, icon: "📚", h: "Education Without Barriers", s: "Bringing quality learning directly to communities, homes, & families who need it most." },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <HeroCarousel slides={clusterSlides} gradientColor={C.dk} accentColor={C.pri}>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn href={PAY.once}>Sponsor a Cluster</Btn>
          <Btn v="outW" onClick={() => go("contact")}>Partner with Us</Btn>
        </div>
      </HeroCarousel>

      {/* Problem / Solution */}
      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.w }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <RGrid cols={2}>
            <Card border="4px solid #EF4444">
              <h3 style={{ fontSize: 24, fontWeight: 700, color: "#EF4444", marginBottom: 16 }}>The Problem</h3>
              <p style={{ fontSize: 16, color: C.tx, lineHeight: 1.8 }}>Many children lack access to quality education due to financial, structural, or learning-related barriers.</p>
              <p style={{ fontSize: 16, color: C.tx, lineHeight: 1.8, marginTop: 12 }}>The Neurodivergent learners are often underserved, out-of-school children are left behind, & homeschooling families struggle to find structured, high-quality resources.</p>
            </Card>
            <Card border={`4px solid ${C.pri}`}>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: C.pri, marginBottom: 16 }}>The Solution</h3>
              <p style={{ fontSize: 16, color: C.tx, lineHeight: 1.8 }}>Simple, safe, & structured learning spaces that make education accessible without needing a traditional classroom.</p>
            </Card>
          </RGrid>
        </div>
      </section>

      {/* Two Types */}
      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.bgA }}>
        <SecTitle tag="Types" title="Two Types of Learning Clusters" />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <RGrid cols={2}>
            <Card style={{ overflow: "hidden", padding: 0 }}>
              <div style={{ height: 200 }}><img src={IMG.body_cluster1} alt="Community Learning" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
              <div style={{ padding: mob ? 20 : 32 }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: C.dk, marginBottom: 12 }}>1. Community Learning Clusters</h3>
                <p style={{ fontSize: 15, color: C.tx, lineHeight: 1.7, marginBottom: 12 }}>Facilitator-led spaces set up in communities to support out-of-school learners.</p>
                <p style={{ fontSize: 15, color: C.tx, lineHeight: 1.7, marginBottom: 12 }}>These are structured environments where children receive guided learning using a mobile curriculum & digital tools.</p>
                <p style={{ fontSize: 15, color: C.txL, lineHeight: 1.7, marginBottom: 24 }}>These clusters bring education directly to children who would otherwise have no access.</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Btn href={PAY.once} style={{ padding: "10px 16px", fontSize: 13 }}>Sponsor a Cluster</Btn>
                  <Btn v="sec" href={PAY.once} style={{ padding: "10px 16px", fontSize: 13 }}>Sponsor a Child</Btn>
                  <Btn v="out" onClick={() => go("contact")} style={{ padding: "10px 16px", fontSize: 13 }}>Partner with Us</Btn>
                </div>
              </div>
            </Card>
            <Card style={{ overflow: "hidden", padding: 0 }}>
              <div style={{ height: 200 }}><img src={IMG.body_cluster2} alt="Home & Flexible Learning" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
              <div style={{ padding: mob ? 20 : 32 }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: C.dk, marginBottom: 12 }}>2. Home & Flexible Learning Clusters</h3>
                <p style={{ fontSize: 15, color: C.tx, lineHeight: 1.7, marginBottom: 12 }}>Designed for homeschooling families or small group learning.</p>
                <p style={{ fontSize: 15, color: C.tx, lineHeight: 1.7, marginBottom: 12 }}>These remove the burden of sourcing quality materials & provide a clear learning pathway to allow parents or guardians to guide learners with flexible pacing.</p>
                <p style={{ fontSize: 15, color: C.txL, lineHeight: 1.7, marginBottom: 24 }}>We provide access to structured curriculum, worksheets, & assessments.</p>
                <Btn onClick={() => go("contact")} style={{ padding: "10px 16px", fontSize: 13 }}>Explore Prices</Btn>
              </div>
            </Card>
          </RGrid>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.w }}>
        <SecTitle tag="Process" title="How It Works" />
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {[["01", "Set Up a Space", "Set up a simple, safe space with basic tools & devices."], ["02", "Onboard & Assess", "Learners are onboarded & assessed (neurological profile + learning level)."], ["03", "Learning Path", "They are placed into a suitable learning path."], ["04", "Deliver Curriculum", "Deliver flexible, mobile curriculum."], ["05", "Monitor & Adapt", "Monitor progress & adapt learning based on the learner's needs."]].map(([n, t, d], i) => (
            <div key={i} style={{ display: "flex", gap: 20, marginBottom: 28, alignItems: "flex-start" }}>
              <div style={{ minWidth: 52, height: 52, borderRadius: 16, background: C.priL, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: C.pri, fontSize: 17 }}>{n}</div>
              <div><h4 style={{ fontSize: 18, fontWeight: 700, color: C.dk, marginBottom: 4 }}>{t}</h4><p style={{ fontSize: 15, color: C.txL, lineHeight: 1.7 }}>{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* What Makes It Different */}
      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.blueL }}>
        <SecTitle tag="Why Us" title="What Makes It Different" />
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <RGrid cols={2} gap={20}>
            {["Designed for neurodivergent & neurotypical learners", "Focus on personalized learning paths", "Combines offline environments with digital tools", "Can be used to support low-income & underserved communities"].map((d, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ minWidth: 24, height: 24, borderRadius: 12, background: C.pri, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}><span style={{ color: C.w, fontSize: 14 }}>✓</span></div>
                <p style={{ fontSize: 15, color: C.tx, lineHeight: 1.6 }}>{d}</p>
              </div>
            ))}
          </RGrid>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.bgA }}>
        <SecTitle tag="Gallery" title="Real moments, real impact" sub="Real classroom moments, outdoor learning, facilitator support, children engaging with materials." />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <RGrid cols={3} gap={16}>
            <div style={{ height: 220, borderRadius: 16, overflow: "hidden" }}><img src={IMG.body_cluster1} alt="Facilitator support" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
            <div style={{ height: 220, borderRadius: 16, overflow: "hidden" }}><img src={IMG.body_cluster2} alt="Classroom learning" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
            <div style={{ height: 220, borderRadius: 16, overflow: "hidden" }}><img src={IMG.body_cluster3} alt="Children with materials" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
          </RGrid>
        </div>
      </section>
    </div>
  );
}

/* ===========================
   4. NEOSPEAK PAGE
   =========================== */
function NeoSpeakPage({ setPage }) {
  const mob = useMedia("(max-width: 768px)");
  const go = (id) => { setPage(id); window.scrollTo(0, 0); };

  const speakSlides = [
    { img: IMG.carousel_1, icon: "🤟", h: "NeoSpeak", s: "A gamified sign language learning tool built to bridge communication gaps between verbal & non-verbal learners using AI & machine learning." },
    { img: IMG.carousel_2, icon: "🤟", h: "Communication Without Limits", s: "Making sign language accessible, fun, & normalized so everyone can connect meaningfully." },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <HeroCarousel slides={speakSlides} gradientColor={C.dk} accentColor={C.acc}>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn onClick={() => go("contact")}>Join the Waitlist</Btn>
          <Btn v="outW" href={PAY.rec}>Support Development</Btn>
        </div>
      </HeroCarousel>

      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.w }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 32 : 64, alignItems: "center" }}>
          <div>
            <SecTitle tag="The Why" title="Why sign language matters" align="left" />
            <p style={{ fontSize: 17, color: C.tx, lineHeight: 1.8, marginBottom: 20 }}>Communication is fundamental to learning, connection, & confidence.</p>
            <p style={{ fontSize: 17, color: C.tx, lineHeight: 1.8, marginBottom: 20 }}>Sign language creates a bridge between different kinds of learners, making interaction more inclusive & meaningful.</p>
            <div style={{ background: C.accL, borderRadius: 16, padding: 24, borderLeft: `4px solid ${C.acc}` }}>
              <p style={{ fontSize: 16, color: C.dk, lineHeight: 1.7, fontWeight: 500 }}>NeoSpeak is built to make communication more inclusive, accessible, & natural.</p>
              <Sparkle size={14} color={C.sec} style={{ marginTop: 8, opacity: 0.6 }} />
            </div>
          </div>
          <div style={{ height: mob ? 260 : 380, borderRadius: 16, overflow: "hidden", background: C.accL, display: "flex", alignItems: "center", justifyContent: "center" }}><img src={IMG.body_neospeak} alt="NeoSpeak App" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
        </div>
      </section>

      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.bgA }}>
        <SecTitle tag="For Everyone" title="Who is NeoSpeak for?" />
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <RGrid cols={2} gap={24}>
            <Card border={`4px solid ${C.acc}`} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🤫</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: C.dk, marginBottom: 8 }}>Non-verbal individuals</h3>
              <p style={{ fontSize: 14, color: C.txL }}>A voice through visual communication</p>
            </Card>
            <Card border={`4px solid ${C.pri}`} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🗣️</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: C.dk, marginBottom: 8 }}>Verbal individuals</h3>
              <p style={{ fontSize: 14, color: C.txL }}>Learn to communicate inclusively</p>
            </Card>
          </RGrid>
        </div>
      </section>

      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: `linear-gradient(135deg, ${C.dk} 0%, ${C.acc}DD 100%)`, position: "relative", overflow: "hidden" }}>
        <Sparkle size={30} color={`${C.sec}35`} style={{ position: "absolute", top: "15%", left: "10%", opacity: 0.5 }} />
        <Sparkle size={22} color={`${C.pri}30`} style={{ position: "absolute", bottom: "18%", right: "8%", opacity: 0.4 }} />
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: mob ? 26 : 32, fontWeight: 800, color: C.w, marginBottom: 16 }}>Be part of the NeoSpeak journey</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.8)", marginBottom: 36, lineHeight: 1.7 }}>Join the waitlist, partner with us, or support development.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn v="wht" onClick={() => go("contact")}>Join Waitlist</Btn>
            <Btn v="outW" onClick={() => go("contact")}>Partner with Us</Btn>
            <Btn v="sec" href={PAY.rec}>Support Development</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===========================
   5. NEO CURIOSITY CORNER PAGE
   =========================== */
function NeoCornerPage({ setPage }) {
  const mob = useMedia("(max-width: 768px)");
  const go = (id) => { setPage(id); window.scrollTo(0, 0); };

  const cornerSlides = [
    { img: IMG.carousel_1, icon: "🔬", h: "Neo Curiosity Corner", s: "A collaborative research community focused on improving learning experiences through shared knowledge & real-world insights." },
    { img: IMG.carousel_2, icon: "🔬", h: "Where Ideas Shape Learning", s: "Educators, parents, researchers, & designers come together to explore better ways to teach & learn." },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <HeroCarousel slides={cornerSlides} gradientColor={C.dk} accentColor={C.sec}>
        <Btn onClick={() => go("contact")}>Join Our Community</Btn>
      </HeroCarousel>

      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.w }}>
        <SecTitle tag="Community" title="Who joins the conversation?" />
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <RGrid cols={3} gap={20}>
            {[["👩‍🏫", "Educators"], ["🎨", "Learning designers"], ["🧠", "Psychologists"], ["👪", "Parents"], ["🔬", "Researchers"], ["💡", "Anyone interested in inclusive learning"]].map(([icon, label], i) => (
              <Card key={i} style={{ textAlign: "center", padding: 24 }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{icon}</div>
                <p style={{ fontSize: 16, fontWeight: 600, color: C.dk }}>{label}</p>
              </Card>
            ))}
          </RGrid>
        </div>
      </section>

      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.bgA }}>
        <SecTitle tag="What We Explore" title="Topics Discussed" />
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          {["Neurodiversity in learning", "Teaching strategies", "Learning design", "Real classroom challenges", "Parental insights & challenges", "Inclusive education tools"].map((t, i) => (
            <span key={i} style={{ background: C.secL, color: "#9A7200", padding: "10px 20px", borderRadius: 24, fontSize: 15, fontWeight: 500 }}>{t}</span>
          ))}
        </div>
      </section>

      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.w }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <SecTitle tag="Outcomes" title="What comes out of this?" />
          <p style={{ fontSize: 17, color: C.tx, lineHeight: 1.8, marginBottom: 24 }}>Insights, practical strategies, & ideas that directly inform the tools, curriculum, & systems within NeoNoohra & other educational spaces.</p>
          <p style={{ fontSize: 18, fontWeight: 600, color: C.dk, marginBottom: 36 }}>Join our community sessions & contribute to conversations shaping the future of learning.</p>
          <Btn onClick={() => go("contact")}>Join Our Community</Btn>
        </div>
      </section>
    </div>
  );
}

/* ===========================
   6. GET INVOLVED PAGE
   =========================== */
function GetInvolvedPage({ setPage }) {
  const mob = useMedia("(max-width: 768px)");
  const go = (id) => { setPage(id); window.scrollTo(0, 0); };
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: mob ? "80px 20px 60px" : "100px 24px 80px", background: `linear-gradient(135deg, ${C.dk} 0%, ${C.pink}CC 100%)`, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <Sparkle size={32} color={`${C.sec}40`} style={{ position: "absolute", top: "20%", right: "15%", opacity: 0.5 }} />
        <Sparkle size={20} color={`${C.sec}30`} style={{ position: "absolute", bottom: "25%", left: "10%", opacity: 0.4 }} />
        <h1 style={{ fontSize: mob ? 32 : 44, fontWeight: 800, color: C.w, marginBottom: 16 }}>Get Involved</h1>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>There are many ways to be part of the NeoNoohra movement. Choose how you'd like to contribute.</p>
      </section>

      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <RGrid cols={3}>
            {[
              { icon: "💛", t: "Donate", d: "Support our mission financially. Every contribution helps us reach more learners.", cta: "Donate Now", href: PAY.once, c: C.sec },
              { icon: "🤝", t: "Partner", d: "Collaborate with us to expand access to inclusive learning in your community.", cta: "Become a Partner", pg: "contact", c: C.pri },
              { icon: "✋", t: "Volunteer", d: "Contribute your skills & time to help build a more inclusive learning future.", cta: "Join as Volunteer", pg: "contact", c: C.acc },
            ].map((w, i) => (
              <Card key={i} border={`4px solid ${w.c}`} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{w.icon}</div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: C.dk, marginBottom: 12 }}>{w.t}</h3>
                <p style={{ fontSize: 15, color: C.txL, lineHeight: 1.7, marginBottom: 28 }}>{w.d}</p>
                {w.href ? <Btn full href={w.href} style={{ background: w.c }}>{w.cta}</Btn> : <Btn full onClick={() => go(w.pg)} style={{ background: w.c }}>{w.cta}</Btn>}
              </Card>
            ))}
          </RGrid>
        </div>
      </section>

      <section style={{ padding: "60px 24px", background: C.w, textAlign: "center" }}>
        <h3 style={{ fontSize: 24, fontWeight: 700, color: C.dk, marginBottom: 12 }}>Want to give regularly?</h3>
        <p style={{ fontSize: 16, color: C.txL, lineHeight: 1.7, marginBottom: 24, maxWidth: 500, margin: "0 auto 24px" }}>Set up a recurring donation to provide sustained support for learners who need it most.</p>
        <Btn v="sec" href={PAY.rec}>Set Up Recurring Donation</Btn>
      </section>

      <section style={{ padding: "60px 24px", background: C.bgA }}>
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: C.dk, marginBottom: 20 }}>International Bank Transfer</h3>
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 24, textAlign: "left" }}>
              <div><p style={{ fontSize: 13, color: C.txL, marginBottom: 4, fontWeight: 600 }}>GBP Account</p><p style={{ fontSize: 18, fontWeight: 700, color: C.dk }}>0736144516</p><p style={{ fontSize: 13, color: C.txL }}>GTBank</p></div>
              <div><p style={{ fontSize: 13, color: C.txL, marginBottom: 4, fontWeight: 600 }}>USD Account</p><p style={{ fontSize: 18, fontWeight: 700, color: C.dk }}>0737144509</p><p style={{ fontSize: 13, color: C.txL }}>GTBank</p></div>
            </div>
            <p style={{ fontSize: 13, color: C.txL, marginTop: 16, textAlign: "center" }}>SWIFT Code: GTBINGLAXXX</p>
          </Card>
        </div>
      </section>
    </div>
  );
}

/* ===========================
   7. ABOUT PAGE (with TEAM)
   =========================== */
function AboutPage() {
  const mob = useMedia("(max-width: 768px)");
  const team = [
    { name: "Anne Noah", role: "Founder, NeoNoohra", c: C.pri },
    { name: "Ibukun Odutan", role: "Co-founder, NeoSpeak", c: C.acc },
    { name: "John Abubakar", role: "Key Advisor (PhD, Digital Twin & Energy Management)", c: C.sec },
    { name: "Praise John-Okwok", role: "Developmental Psychologist", c: C.pri },
    { name: "Demilade Agboola", role: "Behavioral Therapist / SEN Educator", c: C.acc },
    { name: "Toyosi Atoyebi", role: "Illustrator", c: C.sec },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.bg }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <SecTitle tag="Our Story" title="About NeoNoohra" />
          <p style={{ fontSize: 17, color: C.tx, lineHeight: 1.8, marginBottom: 20 }}>NeoNoohra was built from firsthand experience with learning inequality and a clear belief that access to quality education should not depend on where a child is born or how they learn.</p>
          <p style={{ fontSize: 17, color: C.tx, lineHeight: 1.8, marginBottom: 20 }}>Built by a team of teachers, psychologists, special needs educators, and EdTech experts with experience across underserved communities and special needs environments, we are developing technology-driven solutions to address these gaps.</p>
          <p style={{ fontSize: 18, fontWeight: 600, color: C.pri, lineHeight: 1.7 }}>Our goal is simple: to create systems that make learning accessible, inclusive, and effective for every kind of learner.</p>
        </div>
      </section>

      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.w }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <RGrid cols={2}>
            <Card border={`4px solid ${C.pri}`}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: C.pri, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Mission</h3>
              <p style={{ fontSize: 17, color: C.tx, lineHeight: 1.8 }}>To empower every learner, regardless of their neurological profile or socioeconomic background by providing accessible, inclusive, & high-quality learning experiences.</p>
            </Card>
            <Card border={`4px solid ${C.sec}`}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: C.sec, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Vision</h3>
              <p style={{ fontSize: 17, color: C.tx, lineHeight: 1.8 }}>Inspiring a world where inclusive education is the standard, neurodiversity is accepted & every learner is empowered to thrive.</p>
            </Card>
          </RGrid>
        </div>
      </section>

      {/* === TEAM SECTION === */}
      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.bgA }}>
        <SecTitle tag="The Team" title="Meet the people behind NeoNoohra" sub="A dedicated team of educators, technologists, and specialists committed to inclusive learning." />
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <RGrid cols={3} gap={24}>
            {team.map((t, i) => (
              <Card key={i} style={{ textAlign: "center", padding: 28 }}>
                <div style={{ width: 100, height: 100, borderRadius: "50%", margin: "0 auto 20px", background: `linear-gradient(135deg, ${t.c}30, ${t.c}60)`, display: "flex", alignItems: "center", justifyContent: "center", border: `3px solid ${t.c}`, position: "relative", overflow: "hidden" }}>
                  <span style={{ fontSize: 34, fontWeight: 700, color: t.c }}>{t.name.split(" ").map(n => n[0]).join("")}</span>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.4)", padding: "3px 0", textAlign: "center" }}>
                    <span style={{ color: C.w, fontSize: 10, fontWeight: 600 }}>PHOTO</span>
                  </div>
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 700, color: C.dk, marginBottom: 6 }}>{t.name}</h4>
                <p style={{ fontSize: 14, color: C.txL, lineHeight: 1.5 }}>{t.role}</p>
              </Card>
            ))}
          </RGrid>
        </div>
      </section>
    </div>
  );
}

/* =======================================
   8. CONTACT PAGE
   ======================================= */
function ContactPage({ prefill }) {
  const mob = useMedia("(max-width: 768px)");
  const [form, setForm] = useState({ name: "", email: "", phone: "", purpose: prefill || "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { if (prefill) setForm((f) => ({ ...f, purpose: prefill })); }, [prefill]);

  const purposes = ["Join NeoSpeak Waitlist", "Join the Neo Corner Community", "Partner", "Volunteer", "None of the above"];
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  const inp = { width: "100%", padding: "14px 16px", border: `1.5px solid ${C.bgA}`, borderRadius: 12, fontSize: 15, outline: "none", fontFamily: "inherit", background: C.w, boxSizing: "border-box", transition: "border 0.2s" };

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: mob ? "80px 20px 40px" : "80px 24px 40px", background: C.bg }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <SecTitle tag="Get In Touch" title="Contact Us" sub="Have a question, want to partner, or ready to join our community? We'd love to hear from you." />
        </div>
      </section>

      <section style={{ padding: mob ? "20px 20px 60px" : "20px 24px 80px", background: C.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: mob ? "1fr" : "3fr 2fr", gap: mob ? 40 : 64 }}>
          <Card style={{ padding: mob ? 24 : 40 }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: 48 }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.priL, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}><span style={{ fontSize: 36, color: C.pri }}>✓</span></div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: C.pri, marginBottom: 8 }}>Thank you!</h3>
                <p style={{ fontSize: 16, color: C.txL }}>We've received your message and will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: C.dk, marginBottom: 24 }}>Send us a message</h3>
                <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: 18, marginBottom: 18 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: C.dk, display: "block", marginBottom: 6 }}>Full Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inp} placeholder="Your full name" />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: C.dk, display: "block", marginBottom: 6 }}>Email Address *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inp} placeholder="you@example.com" />
                  </div>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: C.dk, display: "block", marginBottom: 6 }}>Phone Number</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inp} placeholder="+234..." />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: C.dk, display: "block", marginBottom: 6 }}>Purpose * <span style={{ fontWeight: 400, color: C.txL }}>(Why are you reaching out?)</span></label>
                  <select value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} required style={{ ...inp, cursor: "pointer", appearance: "auto", color: form.purpose ? C.dk : C.txL }}>
                    <option value="">- Select a purpose -</option>
                    {purposes.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: C.dk, display: "block", marginBottom: 6 }}>Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inp, minHeight: 140, resize: "vertical" }} placeholder="Tell us more about how we can help..." />
                </div>
                <Btn full style={{ padding: "16px 28px", fontSize: 16 }}>Send Message</Btn>
              </form>
            )}
          </Card>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: C.priL, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 18 }}>📧</span></div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: C.dk }}>Email Us</h4>
              </div>
              <p style={{ fontSize: 15, color: C.pri, fontWeight: 600 }}>hello@neonoohra.com</p>
            </Card>
            <Card style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: C.accL, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 18 }}>🌐</span></div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: C.dk }}>Follow Us</h4>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["Twitter", "Instagram", "LinkedIn"].map((s) => <span key={s} style={{ background: C.priL, color: C.pri, padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>{s}</span>)}
              </div>
            </Card>
            <Card style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: C.secL, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 18 }}>💰</span></div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: C.dk }}>Support Financially</h4>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href={PAY.once} target="_blank" rel="noopener noreferrer" style={{ color: C.pri, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>One-time donation →</a>
                <a href={PAY.rec} target="_blank" rel="noopener noreferrer" style={{ color: C.pri, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Recurring donation →</a>
              </div>
            </Card>
            <Card style={{ padding: 24, background: C.priL }}>
              <p style={{ fontSize: 14, color: C.pri, fontWeight: 600, marginBottom: 8 }}>Quick links:</p>
              <p style={{ fontSize: 13, color: C.tx, lineHeight: 2 }}>
                • NeoSpeak Waitlist → select "Join NeoSpeak Waitlist"<br/>
                • Neo Corner Community → select "Join the Neo Corner Community"<br/>
                • Partnership → select "Partner"<br/>
                • Volunteering → select "Volunteer"
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===========================
   9. ARTICLES PAGE
   =========================== */
function ArticlesPage() {
  const mob = useMedia("(max-width: 768px)");
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.bg, minHeight: "60vh" }}>
        <SecTitle tag="Blog" title="Articles & Insights" sub="Thoughts, research, and stories from the NeoNoohra community." />
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <RGrid cols={3} gap={24}>
            {[
              { t: "Understanding Neurodiversity in Education", tag: "Education", c: C.pri },
              { t: "Why Sign Language Should Be Taught in Every School", tag: "Accessibility", c: C.acc },
              { t: "Building Inclusive Learning Spaces on a Budget", tag: "Community", c: C.sec },
            ].map((a, i) => (
              <Card key={i} border={`4px solid ${a.c}`}>
                <span style={{ background: `${a.c}15`, color: a.c, padding: "4px 12px", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>{a.tag}</span>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.dk, marginTop: 16, marginBottom: 8, lineHeight: 1.4 }}>{a.t}</h3>
                <p style={{ fontSize: 13, color: C.txL }}>Coming Soon</p>
              </Card>
            ))}
          </RGrid>
        </div>
        <p style={{ textAlign: "center", marginTop: 48, fontSize: 16, color: C.txL }}>More articles coming soon. Stay tuned!</p>
      </section>
    </div>
  );
}

/* ===========================
   MAIN APP
   =========================== */
export default function App() {
  const [page, setPage] = useState("home");
  const [contactPrefill, setContactPrefill] = useState("");

  const nav = (id) => { setContactPrefill(""); setPage(id); window.scrollTo(0, 0); };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={nav} />;
      case "ecosystem": return <EcosystemPage setPage={nav} />;
      case "clusters": return <ClustersPage setPage={nav} />;
      case "neospeak": return <NeoSpeakPage setPage={nav} />;
      case "neocorner": return <NeoCornerPage setPage={nav} />;
      case "get-involved": return <GetInvolvedPage setPage={nav} />;
      case "about": return <AboutPage />;
      case "contact": return <ContactPage prefill={contactPrefill} />;
      case "articles": return <ArticlesPage />;
      default: return <HomePage setPage={nav} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: C.tx, background: C.bg, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        img { max-width: 100%; height: auto; }
        h1, h2, h3, h4, p { overflow-wrap: break-word; word-wrap: break-word; }
        a:hover { opacity: 0.85; }
        button:hover { opacity: 0.92; }
        input:focus, select:focus, textarea:focus { border-color: ${C.pri} !important; box-shadow: 0 0 0 3px ${C.pri}20 !important; }
        ::selection { background: ${C.priL}; color: ${C.pri}; }
      `}</style>
      <NavBar page={page} setPage={nav} />
      {renderPage()}
      <Footer setPage={nav} />
    </div>
  );
}