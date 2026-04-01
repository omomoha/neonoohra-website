import { useState, useEffect } from "react";

/* ââââââââââââââââââââââââââââââââââââââââââââââââââââ
   NEONOOHRA ECOSYSTEM WEBSITE â Full Implementation
   All visuals use inline CSS (no external images)
   ââââââââââââââââââââââââââââââââââââââââââââââââââââ */

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

/* âââ Embedded Images (base64) âââ */
const IMG = {
  carousel_0: "/images/carousel_0.jpg",
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

/* âââ Shared Components âââ */
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

/* âââ Sparkle Star Motif (brand element) âââ */
function Sparkle({ size = 24, color = C.sec, style: cs = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ ...cs }}>
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z"/>
    </svg>
  );
}

/* âââ CSS Image Placeholder (no external URLs) âââ */
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

/* âââ NAVBAR âââ */
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

/* âââ FOOTER âââ */
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

/* âââââââââââââââââââââââââââ
   1. HOMEPAGE
   âââââââââââââââââââââââââââ */
function HomePage({ setPage }) {
  const [cur, setCur] = useState(0);
  const mob = useMedia("(max-width: 768px)");
  const go = (id) => { setPage(id); window.scrollTo(0, 0); };

  const slides = [
    { img: IMG.carousel_0, h: "Unlocking Possibilities for Neurodiversity", s: "A learning ecosystem designed for every kind of learner in classrooms, communities, & beyond." },
    { img: IMG.carousel_1, h: "Where Every Learner Belongs", s: "We dream of a future where the non-verbal can have a seat at the table. In regular jobs & spaces because learning sign language is accessible & normalised." },
    { img: IMG.carousel_2, h: "Real Access. Real Impact.", s: "Combining technology, inclusive education practices & research to create high quality learning experiences." },
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
              { icon: "ð", t: "Learning Clusters", d: "Safe, flexible learning spaces for out-of-school & homeschooled children.", p: "clusters", c: C.pri },
              { icon: "ð¤", t: "NeoSpeak", d: "Gamified sign language learning powered by AI & machine learning.", p: "neospeak", c: C.acc },
              { icon: "ð¬", t: "Neo Curiosity Corner", d: "A research group where educators, parents, & researchers explore better ways to support learning.", p: "neocorner", c: C.sec },
            ].map((e, i) => (
              <Card key={i} border={`4px solid ${e.c}`} style={{ cursor: "pointer" }}>
                <div onClick={() => go(e.p)}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{e.icon}</div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: C.dk, marginBottom: 12 }}>{e.t}</h3>
                  <p style={{ fontSize: 15, color: C.txL, lineHeight: 1.7, marginBottom: 20 }}>{e.d}</p>
                  <span style={{ color: e.c, fontWeight: 600, fontSize: 14 }}>Explore â</span>
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
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, marginBottom: 36, lineHeight: 1.7 }}>Whether you want to join our community, sponsor a child, or partner with us â every action counts.</p>
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

/* âââââââââââââââââââââââââââ
   2. ECOSYSTEM PAGE
   âââââââââââââââââââââââââââ */
function EcosystemPage({ setPage }) {
  const mob = useMedia("(max-width: 768px)");
  const go = (id) => { setPage(id); window.scrollTo(0, 0); };

  const pillars = [
    { icon: "ð", t: "Learning Clusters", p: "clusters", d: "Learning clusters are simple, structured learning environments designed to provide access to high-quality education without the need for a traditional classroom.", who: ["Neurodivergent & neurotypical learners", "Homeschooling families", "Out-of-school children"], c: C.pri, grad: "green", emoji: "ð«" },
    { icon: "ð¤", t: "NeoSpeak", p: "neospeak", d: "NeoSpeak is a gamified sign language learning tool designed to make communication accessible, engaging, & inclusive.", who: ["Non-verbal individuals", "Verbal individuals"], c: C.acc, grad: "purple", emoji: "ð¤" },
    { icon: "ð¬", t: "Neo Curiosity Corner", p: "neocorner", d: "A research group where learning is continuously explored, tested, & improved through real conversations & shared experiences.", who: ["Educators", "Learning designers", "Psychologists", "Parents", "Researchers", "Enthusiasts interested in inclusive learning"], c: C.sec, grad: "orange", emoji: "ð¡" },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: mob ? "60px 20px" : "80px 24px", background: C.bg }}>
        <SecTitle tag="The Ecosystem" title="What does an inclusive learning ecosystem look like?" sub="Three interconnected worlds â each one a doorway to a better way of learning." />
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
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28}}>
                {p.who.map((w, j) => <span key={j} style={{ background: C.priL, color: C.pri, padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500 }}>{w}</span>)}
              </div>
              <Btn onClick={() => go(p.p)} style={{ background: p.c }}>Enter this world â</Btn>
            </div>
            {(mob || i % 2 === 0) && <PlaceholderImg emoji={p.emoji} label={p.t} h={mob ? 240 : 340} gradient={p.grad} />}
          </div>
        </section>
      ))}
    </div>
  );
}

/* âââââââââââââââââââââââââââ
   3. LEARNING CLUSTERS PAGE
   âââââââââââââââââââââââââââ */
function ClustersPage({ setPage }) {
  const mob = useMedia("(max-width: 768px)");
  const go = (id) => { setPage(id); window.scrollTo(0, 0); };

  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ padding: mob ? "80px 20px 60px" : "100px 24px 80px", background: `linear-gradient(135deg, ${C.dk} 0%, ${C.pri} 100%)`, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <Sparkle size={32} color={`${C.sec}50`} style={{ position: "absolute", top: "20%", right: "12%", opacity: 0.5 }} />
        <Sparkle size={20} color={`${C.sec}30`} style={{ position: "absolute", bottom: "25%", left: "8%", opacity: 0.4 }} />
        <span style={{ fontSize: 48, display: "block", marginBottom: 20 }}>ð</span>
        <h1 style={{ fontSize: mob ? 32 : 44, fontWeight: 800, color: C.w, marginBottom: 16 }}>Learning Clusters</h1>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>Simple, safe, & structured learning spaces that make education accessible without needing a traditional classroom.</p>
      </section>

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
          {[["01", "Set Up a Space", "Set up a simple, safe space with basic tools & devices."], ["02", "Onboard & Assess", "Learners are onboarded & assessed (neurological profile + learning level)."], ["03", "Learning Path", "They are placed into a suitable learning]KÈ
[]\Ý\XÝ[[H[]\^XK[Ø[HÝ\XÝ[[KKÈ
H[Û]Ü	Y\[Û]ÜÙÜ\ÜÈ	Y\X\[È\ÙYÛHX\\ÜÈYYËWKX\

ÛKJHO
]Ù^O^Ú_HÝ[O^ÞÈ\Ü^N^Ø\X\Ú[ÝÛN[YÛ][\Î^\Ý\_O]Ý[O^ÞÈZ[ÚY
LZYÚ
LÜ\Y]\ÎMXÚÙÜÝ[ËS\Ü^N^[YÛ][\ÎÙ[\\ÝYPÛÛ[Ù[\ÛÙZYÚÛÛÜËKÛÚ^NMÈ_OÛOÙ]]
Ý[O^ÞÈÛÚ^NNÛÙZYÚ
ÌÛÛÜËËX\Ú[ÝÛN
_OÝOÚ
Ý[O^ÞÈÛÚ^NMKÛÛÜË[RZYÚKÈ_OÙOÜÙ]Ù]
J_BÙ]ÜÙXÝ[ÛËÊÚ]XZÙ\È]Y\[
ßBÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈXÚÙÜÝ[ËYS_OÙXÕ]HYÏHÚH\È]OHÚ]XZÙ\È]Y\[Ï]Ý[O^ÞÈX^ÚYX\Ú[]]È_OÜYÛÛÏ^ÌHØ\^ÌOÖÈ\ÚYÛYÜ]\Ù]\Ù[	]\Ý\XØ[X\\ÈØÝ\ÈÛ\ÛÛ[^YX\[È]ÈÛÛX[\ÈÙ[H[\ÛY[ÈÚ]YÚ][ÛÛÈØ[H\ÙYÈÝ\ÜÝËZ[ÛÛYH	[\Ù\YÛÛ[][]Y\ÈKX\

JHO
]Ù^O^Ú_HÝ[O^ÞÈ\Ü^N^Ø\L[YÛ][\Î^\Ý\_O]Ý[O^ÞÈZ[ÚYZYÚÜ\Y]\ÎLXÚÙÜÝ[ËK\Ü^N^[YÛ][\ÎÙ[\\ÝYPÛÛ[Ù[\X\Ú[Ü_OÜ[Ý[O^ÞÈÛÛÜËËÛÚ^NM_O¸§$ÏÜÜ[Ù]Ý[O^ÞÈÛÚ^NMKÛÛÜË[RZYÚK_OÙOÜÙ]
J_BÔÜYÙ]ÜÙXÝ[ÛËÊØ[\H
ßBÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈXÚÙÜÝ[ËÐH_OÙXÕ]HYÏHØ[\H]OHX[[ÛY[ËX[[\XÝÝXHX[Û\ÜÜÛÛH[ÛY[ËÝ]ÛÜX\[ËXÚ[]]ÜÝ\ÜÚ[[[ØYÚ[ÈÚ]X]\X[ËÏ]Ý[O^ÞÈX^ÚYLX\Ú[]]È_OÜYÛÛÏ^ÌßHØ\^ÌMO]Ý[O^ÞÈZYÚÜ\Y]\ÎMÝ\ÝÎY[_O[YÈÜÏ^ÒSQËÙWØÛ\Ý\_H[HXÚ[]]ÜÝ\ÜÝ[O^ÞÈÚYL	HZYÚL	HØXÝ]ÛÝ\_HÏÙ]]Ý[O^ÞÈZYÚÜ\Y]\ÎMÝ\ÝÎY[_O[YÈÜÏ^ÒSQËÙWØÛ\Ý\H[HÛ\ÜÜÛÛHX\[ÈÝ[O^ÞÈÚYL	HZYÚL	HØXÝ]ÛÝ\_HÏÙ]]Ý[O^ÞÈZYÚÜ\Y]\ÎMÝ\ÝÎY[_O[YÈÜÏ^ÒSQËÙWØÛ\Ý\ßH[HÚ[[Ú]X]\X[ÈÝ[O^ÞÈÚYL	HZYÚL	HØXÝ]ÛÝ\_HÏÙ]ÔÜYÙ]ÜÙXÝ[ÛÙ]
NÂBÊ8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d
SÔÔPRÈQÑB8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d
Â[Ý[Û[ÔÜXZÔYÙJÈÙ]YÙHJHÂÛÛÝ[ØH\ÙSYYXJX^]ÚY
Í
HNÂÛÛÝÛÈH
Y
HOÈÙ]YÙJY
NÈÚ[ÝËØÜÛÊ
NÈNÂ]\
]Ý[O^ÞÈY[ÕÜ
Ì_OÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈ
LXÚÙÜÝ[[X\YÜYY[
LÍYYË	ÐËßH	K	ÐËXØßHL	JX^[YÛÙ[\ÜÚ][Û[]]HÝ\ÝÎY[_OÜ\ÛHÚ^O^ÌHÛÛÜ^Ø	ÐËÙXßMHÝ[O^ÞÈÜÚ][ÛXÛÛ]HÜN	HYÚL	HÜXÚ]NH_HÏÜ\ÛHÚ^O^ÌNHÛÛÜ^Ø	ÐËÙXßLÌHÝ[O^ÞÈÜÚ][ÛXÛÛ]HÝÛN	HYÉHÜXÚ]N_HÏÜ[Ý[O^ÞÈÛÚ^N
\Ü^NØÚÈX\Ú[ÝÛN_O¼'é'ÏÜÜ[HÝ[O^ÞÈÛÚ^N[ØÈÌ

ÛÙZYÚÛÛÜËËX\Ú[ÝÛNM_O[ÔÜXZÏÚOÝ[O^ÞÈÛÚ^NNÛÛÜØJMKMKMKJH[RZYÚKËX^ÚY
X\Ú[]]È_OHØ[ZYYYÚYÛ[ÝXYÙHX\[ÈÛÛZ[ÈYÙHÛÛ[][XØ][ÛØ\È]ÙY[\[	Û]\[X\\È\Ú[ÈRH	XXÚ[HX\[ËÜÜÙXÝ[ÛÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈXÚÙÜÝ[ËÈ_O]Ý[O^ÞÈX^ÚYLX\Ú[]]È\Ü^NÜYÜY[\]PÛÛ[[Î[ØÈYYYØ\[ØÈÌ
[YÛ][\ÎÙ[\_O]ÙXÕ]HYÏHHÚH]OHÚHÚYÛ[ÝXYÙHX]\È[YÛHYÏÝ[O^ÞÈÛÚ^NMËÛÛÜË[RZYÚKX\Ú[ÝÛN_OÛÛ[][XØ][Û\È[[Y[[ÈX\[ËÛÛXÝ[Û	ÛÛY[ÙKÜÝ[O^ÞÈÛÚ^NMËÛÛÜË[RZYÚKX\Ú[ÝÛN_OÚYÛ[ÝXYÙHÜX]\ÈHYÙH]ÙY[Y\[Ú[ÈÙX\\ËXZÚ[È[\XÝ[Û[ÜH[Û\Ú]H	YX[[Ù[Ü]Ý[O^ÞÈXÚÙÜÝ[ËXØÓÜ\Y]\ÎMY[ÎÜ\Y
ÛÛY	ÐËXØßX_OÝ[O^ÞÈÛÚ^NMÛÛÜËË[RZYÚKËÛÙZYÚ
L_O[ÔÜXZÈ\ÈZ[ÈXZÙHÛÛ[][XØ][Û[ÜH[Û\Ú]KXØÙ\ÜÚXK	]\[ÜÜ\ÛHÚ^O^ÌMHÛÛÜ^ÐËÙXßHÝ[O^ÞÈX\Ú[ÜÜXÚ]N_HÏÙ]Ù]]Ý[O^ÞÈZYÚ[ØÈÎÜ\Y]\ÎMÝ\ÝÎY[XÚÙÜÝ[ËXØÓ\Ü^N^[YÛ][\ÎÙ[\\ÝYPÛÛ[Ù[\_O[YÈÜÏ^ÒSQËÙWÛ[ÜÜXZßH[H[ÔÜXZÈ\Ý[O^ÞÈÚYL	HZYÚL	HØXÝ]ÛÛZ[_HÏÙ]Ù]ÜÙXÝ[ÛÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈXÚÙÜÝ[ËÐH_OÙXÕ]HYÏHÜ]\[ÛH]OHÚÈ\È[ÔÜXZÈÜÈÏ]Ý[O^ÞÈX^ÚY
X\Ú[]]È_OÜYÛÛÏ^ÌHØ\^ÌOØ\Ü\^Ø
ÛÛY	ÐËXØßXHÝ[O^ÞÈ^[YÛÙ[\_O]Ý[O^ÞÈÛÚ^N
X\Ú[ÝÛNL_O¼'é*ÏÙ]ÈÝ[O^ÞÈÛÚ^NÛÙZYÚ
ÌÛÛÜËËX\Ú[ÝÛN_OÛ]\[[]YX[ÏÚÏÝ[O^ÞÈÛÚ^NMÛÛÜË_OHÚXÙHÝYÚ\ÝX[ÛÛ[][XØ][ÛÜÐØ\Ø\Ü\^Ø
ÛÛY	ÐË_XHÝ[O^ÞÈ^[YÛÙ[\_O]Ý[O^ÞÈÛÚ^N
X\Ú[ÝÛNL_O¼'åèûî#ÏÙ]ÈÝ[O^ÞÈÛÚ^NÛÙZYÚ
ÌÛÛÜËËX\Ú[ÝÛN_O\[[]YX[ÏÚÏÝ[O^ÞÈÛÚ^NMÛÛÜË_OX\ÈÛÛ[][XØ]H[Û\Ú][OÜÐØ\ÔÜYÙ]ÜÙXÝ[ÛÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈXÚÙÜÝ[[X\YÜYY[
LÍYYË	ÐËßH	K	ÐËXØßQL	JXÜÚ][Û[]]HÝ\ÝÎY[_OÜ\ÛHÚ^O^ÌÌHÛÛÜ^Ø	ÐËÙXßLÍXHÝ[O^ÞÈÜÚ][ÛXÛÛ]HÜMIHYL	HÜXÚ]NH_HÏÜ\ÛHÚ^O^ÌHÛÛÜ^Ø	ÐË_LÌHÝ[O^ÞÈÜÚ][ÛXÛÛ]HÝÛNN	HYÚ	HÜXÚ]N_HÏ]Ý[O^ÞÈX^ÚY
X\Ú[]]È^[YÛÙ[\ÜÚ][Û[]]H[^H_OÝ[O^ÞÈÛÚ^N[ØÈÌÛÙZYÚÛÛÜËËX\Ú[ÝÛNM_OH\ÙH[ÔÜXZÈÝ\^OÚÝ[O^ÞÈÛÚ^NMËÛÛÜØJMKMKMK
HX\Ú[ÝÛNÍ[RZYÚKÈ_OÚ[HØZ]\Ý\\Ú]\ËÜÝ\Ü][ÜY[Ü]Ý[O^ÞÈ\Ü^N^Ø\M\ÝYPÛÛ[Ù[\^Ü\Ü\_OHÚÛÛXÚÏ^Ê
HOÛÊÛÛXÝ_OÚ[ØZ]\ÝÐHÝ]ÈÛÛXÚÏ^Ê
HOÛÊÛÛXÝ_O\\Ú]\ÏÐHÙXÈY^ÔVKXßOÝ\Ü][ÜY[ÐÙ]Ù]ÜÙXÝ[ÛÙ]
NÂBÊ8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d
KSÈÕTSÔÒUHÓÔTQÑB8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d
Â[Ý[Û[ÐÛÜ\YÙJÈÙ]YÙHJHÂÛÛÝ[ØH\ÙSYYXJX^]ÚY
Í
HNÂÛÛÝÛÈH
Y
HOÈÙ]YÙJY
NÈÚ[ÝËØÜÛÊ
NÈNÂ]\
]Ý[O^ÞÈY[ÕÜ
Ì_OÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈ
LXÚÙÜÝ[[X\YÜYY[
LÍYYË	ÐËßH	K	ÐËÙXßQL	JX^[YÛÙ[\ÜÚ][Û[]]HÝ\ÝÎY[_OÜ\ÛHÚ^O^ÌHÛÛÜ^Ø	ÐËßLXHÝ[O^ÞÈÜÚ][ÛXÛÛ]HÜMIHYLHÜXÚ]NH_HÏÜ\ÛHÚ^O^ÌNHÛÛÜ^Ø	ÐËßLHÝ[O^ÞÈÜÚ][ÛXÛÛ]HÝÛNHYÚL	HÜXÚ]N_HÏÜ[Ý[O^ÞÈÛÚ^N
\Ü^NØÚÈX\Ú[ÝÛN_O¼'å+ÜÜ[HÝ[O^ÞÈÛÚ^N[ØÈÌ

ÛÙZYÚÛÛÜËËX\Ú[ÝÛNM_O[ÈÝ\[ÜÚ]HÛÜ\ÚOÝ[O^ÞÈÛÚ^NNÛÛÜØJMKMKMKJH[RZYÚKËX^ÚY
X\Ú[]]È_OHÛÛXÜ]]H\ÙX\ÚÛÛ[][]HØÝ\ÙYÛ[\Ý[ÈX\[È^\Y[Ù\ÈÝYÚÚ\YÛÝÛYÙH	X[]ÛÜ[ÚYÚËÜÜÙXÝ[ÛÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈXÚÙÜÝ[ËÈ_OÙXÕ]HYÏHÛÛ[][]H]OHÚÈÚ[ÈHÛÛ\Ø][ÛÈÏ]Ý[O^ÞÈX^ÚYLX\Ú[]]È_OÜYÛÛÏ^ÌßHØ\^ÌOÖÖÈ¼'äjx #|'ãêÈYXØ]ÜÈKÈ¼'ãªX\[È\ÚYÛ\ÈKÈ¼'éèÞXÚÛÙÚ\ÝÈKÈ¼'äj\[ÈKÈ¼'å+\ÙX\Ú\ÈKÈ¼'ä¨H[[ÛH[\\ÝY[[Û\Ú]HX\[ÈWKX\

ÚXÛÛX[KJHO
Ø\Ù^O^Ú_HÝ[O^ÞÈ^[YÛÙ[\Y[Î_O]Ý[O^ÞÈÛÚ^NÍX\Ú[ÝÛNL_OÚXÛÛOÙ]Ý[O^ÞÈÛÚ^NMÛÙZYÚ
ÛÛÜËÈ_OÛX[OÜÐØ\
J_BÔÜYÙ]ÜÙXÝ[ÛÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈXÚÙÜÝ[ËÐH_OÙXÕ]HYÏHÚ]ÙH^ÜH]OHÜXÜÈ\ØÝ\ÜÙYÏ]Ý[O^ÞÈX^ÚY
ÌX\Ú[]]È\Ü^N^^Ü\Ü\Ø\L\ÝYPÛÛ[Ù[\_OÖÈ]\Ù]\Ú]H[X\[ÈXXÚ[ÈÝ]YÚY\ÈX\[È\ÚYÛX[Û\ÜÜÛÛHÚ[[Ù\È\[[[ÚYÚÈ	Ú[[Ù\È[Û\Ú]HYXØ][ÛÛÛÈKX\

JHO
Ü[Ù^O^Ú_HÝ[O^ÞÈXÚÙÜÝ[ËÙXÓÛÛÜÎPMÌY[ÎLÜ\Y]\ÎÛÚ^NMKÛÙZYÚ
L_OÝOÜÜ[
J_BÙ]ÜÙXÝ[ÛÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈXÚÙÜÝ[ËÈ_O]Ý[O^ÞÈX^ÚY
ÌX\Ú[]]È^[YÛÙ[\_OÙXÕ]HYÏHÝ]ÛÛY\È]OHÚ]ÛÛY\ÈÝ]Ù\ÏÈÏÝ[O^ÞÈÛÚ^NMËÛÛÜË[RZYÚKX\Ú[ÝÛN_O[ÚYÚËXÝXØ[Ý]YÚY\Ë	YX\È]\XÝH[ÜHHÛÛËÝ\XÝ[[K	Þ\Ý[\ÈÚ][[ÓÛÚH	Ý\YXØ][Û[ÜXÙ\ËÜÝ[O^ÞÈÛÚ^NNÛÙZYÚ
ÛÛÜËËX\Ú[ÝÛNÍ_OÚ[Ý\ÛÛ[][]HÙ\ÜÚ[ÛÈ	ÛÛX]HÈÛÛ\Ø][ÛÈÚ\[ÈH]\HÙX\[ËÜÛÛXÚÏ^Ê
HOÛÊÛÛXÝ_OÚ[Ý\ÛÛ[][]OÐÙ]ÜÙXÝ[ÛÙ]
NÂBÊ8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d
ÑUSÓQQÑB8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d
Â[Ý[ÛÙ][ÛYYÙJÈÙ]YÙHJHÂÛÛÝ[ØH\ÙSYYXJX^]ÚY
Í
HNÂÛÛÝÛÈH
Y
HOÈÙ]YÙJY
NÈÚ[ÝËØÜÛÊ
NÈNÂ]\
]Ý[O^ÞÈY[ÕÜ
Ì_OÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈ
LXÚÙÜÝ[[X\YÜYY[
LÍYYË	ÐËßH	K	ÐË[ßPÐÈL	JX^[YÛÙ[\ÜÚ][Û[]]HÝ\ÝÎY[_OÜ\ÛHÚ^O^ÌÌHÛÛÜ^Ø	ÐËÙXßMHÝ[O^ÞÈÜÚ][ÛXÛÛ]HÜ	HYÚMIHÜXÚ]NH_HÏÜ\ÛHÚ^O^ÌHÛÛÜ^Ø	ÐËÙXßLÌHÝ[O^ÞÈÜÚ][ÛXÛÛ]HÝÛNIHYL	HÜXÚ]N_HÏHÝ[O^ÞÈÛÚ^N[ØÈÌ

ÛÙZYÚÛÛÜËËX\Ú[ÝÛNM_OÙ][ÛYÚOÝ[O^ÞÈÛÚ^NNÛÛÜØJMKMKMK
H[RZYÚKËX^ÚY
X\Ú[]]È_O\H\HX[HØ^\ÈÈH\ÙH[ÓÛÚH[Ý[Y[ÚÛÜÙHÝÈ[ÝIÙZÙHÈÛÛX]KÜÜÙXÝ[ÛÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈXÚÙÜÝ[ËÈ_O]Ý[O^ÞÈX^ÚYLX\Ú[]]È_OÜYÛÛÏ^ÌßOÖÂÈXÛÛ¼'ä¦ÈÛ]HÝ\ÜÝ\Z\ÜÚ[Û[[ÚX[K]\HÛÛX][Û[È\ÈXXÚ[ÜHX\\ËÝNÛ]HÝÈYVKÛÙKÎËÙXÈKÈXÛÛ¼'é'H\\ÛÛXÜ]HÚ]\ÈÈ^[XØÙ\ÜÈÈ[Û\Ú]HX\[È[[Ý\ÛÛ[][]KÝNXÛÛYHH\\ÎÛÛXÝÎËHKÈXÛÛ¸§"ÈÛ[Y\ÛÛX]H[Ý\ÚÚ[È	[YHÈ[Z[H[ÜH[Û\Ú]HX\[È]\KÝNÚ[\ÈÛ[Y\ÎÛÛXÝÎËXØÈKKX\

ËJHO
Ø\Ù^O^Ú_HÜ\^Ø
ÛÛY	ÝËßXHÝ[O^ÞÈ^[YÛÙ[\_O]Ý[O^ÞÈÛÚ^N
X\Ú[ÝÛNM_OÝËXÛÛOÙ]ÈÝ[O^ÞÈÛÚ^NÛÙZYÚ
ÌÛÛÜËËX\Ú[ÝÛNL_OÝËOÚÏÝ[O^ÞÈÛÚ^NMKÛÛÜË[RZYÚKËX\Ú[ÝÛN_OÝËOÜÝËYÈ[Y^ÝËYHÝ[O^ÞÈXÚÙÜÝ[ËÈ_OÝËÝ_OÐ[ÛÛXÚÏ^Ê
HOÛÊËÊ_HÝ[O^ÞÈXÚÙÜÝ[ËÈ_OÝËÝ_OÐBÐØ\
J_BÔÜYÙ]ÜÙXÝ[ÛÙXÝ[ÛÝ[O^ÞÈY[ÎXÚÙÜÝ[ËË^[YÛÙ[\_OÈÝ[O^ÞÈÛÚ^NÛÙZYÚ
ÌÛÛÜËËX\Ú[ÝÛNL_OØ[ÈÚ]HYÝ[\OÏÚÏÝ[O^ÞÈÛÚ^NMÛÛÜË[RZYÚKËX\Ú[ÝÛNX^ÚY
LX\Ú[]]È_OÙ]\HXÝ\[ÈÛ][ÛÈÝYHÝ\ÝZ[YÝ\ÜÜX\\ÈÚÈYY][ÜÝÜHÙXÈY^ÔVKXßOÙ]\XÝ\[ÈÛ][ÛÐÜÙXÝ[ÛÙXÝ[ÛÝ[O^ÞÈY[ÎXÚÙÜÝ[ËÐH_O]Ý[O^ÞÈX^ÚY
LX\Ú[]]È^[YÛÙ[\_OÈÝ[O^ÞÈÛÚ^NÛÙZYÚ
ÌÛÛÜËËX\Ú[ÝÛN_O[\][Û[[È[Ù\ÚÏØ\]Ý[O^ÞÈ\Ü^NÜYÜY[\]PÛÛ[[Î[ØÈYYYØ\^[YÛY_O]Ý[O^ÞÈÛÚ^NLËÛÛÜËX\Ú[ÝÛN
ÛÙZYÚ
_OÐXØÛÝ[ÜÝ[O^ÞÈÛÚ^NNÛÙZYÚ
ÌÛÛÜËÈ_O
ÌÍM

LMÜÝ[O^ÞÈÛÚ^NLËÛÛÜË_OÕ[ÏÜÙ]]Ý[O^ÞÈÛÚ^NLËÛÛÜËX\Ú[ÝÛN
ÛÙZYÚ
_OTÑXØÛÝ[ÜÝ[O^ÞÈÛÚ^NNÛÙZYÚ
ÌÛÛÜËÈ_O
ÌÍÌM

LOÜÝ[O^ÞÈÛÚ^NLËÛÛÜË_OÕ[ÏÜÙ]Ù]Ý[O^ÞÈÛÚ^NLËÛÛÜËX\Ú[ÜM^[YÛÙ[\_OÕÒQÛÙNÕSÓVÜÐØ\Ù]ÜÙXÝ[ÛÙ]
NÂBÊ8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d
ËPÕUQÑH
Ú]PSJB8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d
Â[Ý[ÛXÝ]YÙJ
HÂÛÛÝ[ØH\ÙSYYXJX^]ÚY
Í
HNÂÛÛÝX[HHÂÈ[YN[HØZÛNÝ[\[ÓÛÚHÎËHKÈ[YNXZÝ[Ù][ÛNÛËYÝ[\[ÔÜXZÈÎËXØÈKÈ[YNÚXXZØ\ÛNÙ^HY\ÛÜ
YÚ][Ú[	[\ÞHX[YÙ[Y[
HÎËÙXÈKÈ[YNZ\ÙHÚSÚÝÛÚÈÛN][ÜY[[ÞXÚÛÙÚ\ÝÎËHKÈ[YN[Z[YHYØÛÛHÛNZ][Ü[\\\ÝÈÑSYXØ]ÜÎËXØÈKÈ[YNÞ[ÜÚH]ÞYXHÛN[\Ý]ÜÎËÙXÈKNÂ]\
]Ý[O^ÞÈY[ÕÜ
Ì_OÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈXÚÙÜÝ[ËÈ_O]Ý[O^ÞÈX^ÚYX\Ú[]]È^[YÛÙ[\_OÙXÕ]HYÏHÝ\ÝÜH]OHXÝ][ÓÛÚHÏÝ[O^ÞÈÛÚ^NMËÛÛÜË[RZYÚKX\Ú[ÝÛN_O[ÓÛÚHØ\ÈZ[ÛH\Ý[^\Y[ÙHÚ]X\[È[\]X[]H[HÛX\[YY]XØÙ\ÜÈÈ]X[]HYXØ][ÛÚÝ[Ý\[ÛÚ\HHÚ[\ÈÜÜÝÈ^HX\ÜÝ[O^ÞÈÛÚ^NMËÛÛÜË[RZYÚKX\Ú[ÝÛN_OZ[HHX[HÙXXÚ\ËÞXÚÛÙÚ\ÝËÜXÚX[YYÈYXØ]ÜË[YXÚ^\ÈÚ]^\Y[ÙHXÜÜÜÈ[\Ù\YÛÛ[][]Y\È[ÜXÚX[YYÈ[\ÛY[ËÙH\H][Ü[ÈXÚÛÙÞKY][ÛÛ][ÛÈÈY\ÜÈ\ÙHØ\ËÜÝ[O^ÞÈÛÚ^NNÛÙZYÚ
ÛÛÜËK[RZYÚKÈ_OÝ\ÛØ[\ÈÚ[\NÈÜX]HÞ\Ý[\È]XZÙHX\[ÈXØÙ\ÜÚXK[Û\Ú]K[YXÝ]HÜ]\HÚ[ÙX\\ÜÙ]ÜÙXÝ[ÛÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈXÚÙÜÝ[ËÈ_O]Ý[O^ÞÈX^ÚYLX\Ú[]]È_OÜYÛÛÏ^ÌOØ\Ü\^Ø
ÛÛY	ÐË_XOÈÝ[O^ÞÈÛÚ^NMÛÙZYÚ
ÌÛÛÜËK^[ÙÜN\\Ø\ÙH]\ÜXÚ[ÎKX\Ú[ÝÛNM_OZ\ÜÚ[ÛÚÏÝ[O^ÞÈÛÚ^NMËÛÛÜË[RZYÚK_OÈ[\ÝÙ\]\HX\\YØ\\ÜÈÙZ\]\ÛÙÚXØ[Ù[HÜÛØÚ[ÙXÛÛÛZXÈXÚÙÜÝ[HÝY[ÈXØÙ\ÜÚXK[Û\Ú]K	YÚ\]X[]HX\[È^\Y[Ù\ËÜÐØ\Ø\Ü\^Ø
ÛÛY	ÐËÙXßXOÈÝ[O^ÞÈÛÚ^NMÛÙZYÚ
ÌÛÛÜËÙXË^[ÙÜN\\Ø\ÙH]\ÜXÚ[ÎKX\Ú[ÝÛNM_O\Ú[ÛÚÏÝ[O^ÞÈÛÚ^NMËÛÛÜË[RZYÚK_O[Ü\[ÈHÛÜÚ\H[Û\Ú]HYXØ][Û\ÈHÝ[\]\Ù]\Ú]H\ÈXØÙ\Y	]\HX\\\È[\ÝÙ\YÈ]KÜÐØ\ÔÜYÙ]ÜÙXÝ[ÛËÊ8¥d8¥d8¥dPSHÑPÕSÓ8¥d8¥d8¥d
ßBÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈXÚÙÜÝ[ËÐH_OÙXÕ]HYÏHHX[H]OHYY]H[ÜHZ[[ÓÛÚHÝXHHYXØ]YX[HÙYXØ]ÜËXÚÛÙÚ\ÝË[ÜXÚX[\ÝÈÛÛ[Z]YÈ[Û\Ú]HX\[ËÏ]Ý[O^ÞÈX^ÚYLX\Ú[]]È_OÜYÛÛÏ^ÌßHØ\^ÌOÝX[KX\

JHO
Ø\Ù^O^Ú_HÝ[O^ÞÈ^[YÛÙ[\Y[Î_O]Ý[O^ÞÈÚYLZYÚLÜ\Y]\ÎL	HX\Ú[]]ÈXÚÙÜÝ[[X\YÜYY[
LÍYYË	ÝßLÌ	ÝßM
X\Ü^N^[YÛ][\ÎÙ[\\ÝYPÛÛ[Ù[\Ü\ÜÛÛY	ÝßXÜÚ][Û[]]HÝ\ÝÎY[_OÜ[Ý[O^ÞÈÛÚ^NÍÛÙZYÚ
ÌÛÛÜÈ_OÝ[YKÜ]
KX\
OÌJKÚ[_OÜÜ[]Ý[O^ÞÈÜÚ][ÛXÛÛ]HÝÛNYYÚXÚÙÜÝ[ØJ
HY[ÎÜ^[YÛÙ[\_OÜ[Ý[O^ÞÈÛÛÜËËÛÚ^NLÛÙZYÚ
_OÕÏÜÜ[Ù]Ù]
Ý[O^ÞÈÛÚ^NNÛÙZYÚ
ÌÛÛÜËËX\Ú[ÝÛN
_OÝ[Y_OÚ
Ý[O^ÞÈÛÚ^NMÛÛÜË[RZYÚKH_OÝÛ_OÜÐØ\
J_BÔÜYÙ]ÜÙXÝ[ÛÙ]
NÂBÊ8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥dÓÓPÕQÑB8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d
Â[Ý[ÛÛÛXÝYÙJÈY[JHÂÛÛÝ[ØH\ÙSYYXJX^]ÚY
Í
HNÂÛÛÝÙÜKÙ]ÜWHH\ÙTÝ]JÈ[YN[XZ[ÛN\ÜÙNY[Y\ÜØYÙNJNÂÛÛÝÜÝXZ]YÙ]ÝXZ]YHH\ÙTÝ]J[ÙJNÂ\ÙQYXÝ


HOÈY
Y[
HÙ]ÜJ
HO
È\ÜÙNY[JJNÈKÜY[JNÂÛÛÝ\ÜÙ\ÈHÈÚ[[ÔÜXZÈØZ]\ÝÚ[H[ÈÛÜ\ÛÛ[][]H\\Û[Y\ÛHÙHXÝHNÂÛÛÝ[TÝXZ]H
JHOÈK][Y][

NÈÙ]ÝXZ]Y
YJNÈNÂÛÛÝ[HÈÚYL	HY[ÎMMÜ\K\ÛÛY	ÐËÐ_XÜ\Y]\ÎLÛÚ^NMKÝ][NÛHÛ[Z[N[\]XÚÙÜÝ[ËËÞÚ^[ÎÜ\XÞ[Ú][ÛÜ\ÈNÂ]\
]Ý[O^ÞÈY[ÕÜ
Ì_OÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈ

XÚÙÜÝ[ËÈ_O]Ý[O^ÞÈX^ÚYX\Ú[]]È^[YÛÙ[\_OÙXÕ]HYÏHÙ][ÝXÚ]OHÛÛXÝ\ÈÝXH]HH]Y\Ý[ÛØ[È\\ÜXYHÈÚ[Ý\ÛÛ[][]OÈÙIÙÝHÈX\ÛH[ÝKÏÙ]ÜÙXÝ[ÛÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈ
XÚÙÜÝ[ËÈ_O]Ý[O^ÞÈX^ÚYLLX\Ú[]]È\Ü^NÜYÜY[\]PÛÛ[[Î[ØÈYÙØ\[ØÈ

_OØ\Ý[O^ÞÈY[Î[ØÈ
_OÜÝXZ]YÈ
]Ý[O^ÞÈ^[YÛÙ[\Y[Î
_O]Ý[O^ÞÈÚY
ÌZYÚ
ÌÜ\Y]\ÎL	HXÚÙÜÝ[ËS\Ü^N^[YÛ][\ÎÙ[\\ÝYPÛÛ[Ù[\X\Ú[]]È_OÜ[Ý[O^ÞÈÛÚ^NÍÛÛÜËH_O¸§$ÏÜÜ[Ù]ÈÝ[O^ÞÈÛÚ^NÛÙZYÚ
ÌÛÛÜËKX\Ú[ÝÛN_O[È[ÝHOÚÏÝ[O^ÞÈÛÚ^NMÛÛÜË_OÙIÝHXÙZ]Y[Ý\Y\ÜØYÙH[Ú[Ù]XÚÈÈ[ÝHÛÛÛÜÙ]
H
ÜHÛÝXZ]^Ú[TÝXZ]OÈÝ[O^ÞÈÛÚ^NÛÙZYÚ
ÌÛÛÜËËX\Ú[ÝÛN_OÙ[\ÈHY\ÜØYÙOÚÏ]Ý[O^ÞÈ\Ü^NÜYÜY[\]PÛÛ[[Î[ØÈYYYØ\NX\Ú[ÝÛNN_O]X[Ý[O^ÞÈÛÚ^NLËÛÙZYÚ
ÛÛÜËË\Ü^NØÚÈX\Ú[ÝÛN
_O[[YH
ÛX[[]\OH^\]Z\Y[YO^ÙÜK[Y_HÛÚ[ÙO^ÊJHOÙ]ÜJÈÜK[YNK\Ù][YHJ_HÝ[O^Ú[HXÙZÛ\H[Ý\[[YHÏÙ]]X[Ý[O^ÞÈÛÚ^NLËÛÙZYÚ
ÛÛÜËË\Ü^NØÚÈX\Ú[ÝÛN
_O[XZ[Y\ÜÈ
ÛX[[]\OH[XZ[\]Z\Y[YO^ÙÜK[XZ[HÛÚ[ÙO^ÊJHOÙ]ÜJÈÜK[XZ[K\Ù][YHJ_HÝ[O^Ú[HXÙZÛ\H[ÝP^[\KÛÛHÏÙ]Ù]]Ý[O^ÞÈX\Ú[ÝÛNN_OX[Ý[O^ÞÈÛÚ^NLËÛÙZYÚ
ÛÛÜËË\Ü^NØÚÈX\Ú[ÝÛN
_OÛH[X\ÛX[[]\OH[[YO^ÙÜKÛ_HÛÚ[ÙO^ÊJHOÙ]ÜJÈÜKÛNK\Ù][YHJ_HÝ[O^Ú[HXÙZÛ\HÌÍÏÙ]]Ý[O^ÞÈX\Ú[ÝÛNN_OX[Ý[O^ÞÈÛÚ^NLËÛÙZYÚ
ÛÛÜËË\Ü^NØÚÈX\Ú[ÝÛN
_O\ÜÙH
Ü[Ý[O^ÞÈÛÙZYÚ
ÛÛÜË_OÚH\H[ÝHXXÚ[ÈÝ]ÊOÜÜ[ÛX[Ù[XÝ[YO^ÙÜK\ÜÙ_HÛÚ[ÙO^ÊJHOÙ]ÜJÈÜK\ÜÙNK\Ù][YHJ_H\]Z\YÝ[O^ÞÈ[Ý\ÛÜÚ[\\X\[ÙN]]ÈÛÛÜÜK\ÜÙHÈËÈË_OÜ[Û[YOH¸ %Ù[XÝH\ÜÙH8 %ÛÜ[ÛÜ\ÜÙ\ËX\


HOÜ[ÛÙ^O^ÜH[YO^ÜOÜOÛÜ[Û_BÜÙ[XÝÙ]]Ý[O^ÞÈX\Ú[ÝÛN_OX[Ý[O^ÞÈÛÚ^NLËÛÙZYÚ
ÛÛÜËË\Ü^NØÚÈX\Ú[ÝÛN
_OY\ÜØYÙOÛX[^\XH[YO^ÙÜKY\ÜØYÙ_HÛÚ[ÙO^ÊJHOÙ]ÜJÈÜKY\ÜØYÙNK\Ù][YHJ_HÝ[O^ÞÈ[Z[ZYÚM\Ú^N\XØ[_HXÙZÛ\H[\È[ÜHXÝ]ÝÈÙHØ[[ÏÙ][Ý[O^ÞÈY[ÎMÛÚ^NM_OÙ[Y\ÜØYÙOÐÙÜO
_BÐØ\]Ý[O^ÞÈ\Ü^N^^\XÝ[ÛÛÛ[[Ø\_OØ\Ý[O^ÞÈY[Î_O]Ý[O^ÞÈ\Ü^N^[YÛ][\ÎÙ[\Ø\LX\Ú[ÝÛNL_O]Ý[O^ÞÈÚY
ZYÚ
Ü\Y]\ÎLXÚÙÜÝ[ËS\Ü^N^[YÛ][\ÎÙ[\\ÝYPÛÛ[Ù[\_OÜ[Ý[O^ÞÈÛÚ^NN_O¼'äéÏÜÜ[Ù]
Ý[O^ÞÈÛÚ^NMÛÙZYÚ
ÌÛÛÜËÈ_O[XZ[\ÏÚ
Ù]Ý[O^ÞÈÛÚ^NMKÛÛÜËKÛÙZYÚ
_O[Ð[ÛÛÚKÛÛOÜÐØ\Ø\Ý[O^ÞÈY[Î_O]Ý[O^ÞÈ\Ü^N^[YÛ][\ÎÙ[\Ø\LX\Ú[ÝÛNL_O]Ý[O^ÞÈÚY
ZYÚ
Ü\Y]\ÎLXÚÙÜÝ[ËXØÓ\Ü^N^[YÛ][\ÎÙ[\\ÝYPÛÛ[Ù[\_OÜ[Ý[O^ÞÈÛÚ^NN_O¼'ã$ÜÜ[Ù]
Ý[O^ÞÈÛÚ^NMÛÙZYÚ
ÌÛÛÜËÈ_OÛÝÈ\ÏÚ
Ù]]Ý[O^ÞÈ\Ü^N^Ø\L^Ü\Ü\_OÖÈÚ]\[ÝYÜ[H[ÙY[KX\

ÊHOÜ[Ù^O^ÜßHÝ[O^ÞÈXÚÙÜÝ[ËSÛÛÜËKY[ÎMÜ\Y]\ÎÛÚ^NLËÛÙZYÚ
LÝ\ÛÜÚ[\_OÜßOÜÜ[_BÙ]ÐØ\Ø\Ý[O^ÞÈY[Î_O]Ý[O^ÞÈ\Ü^N^[YÛ][\ÎÙ[\Ø\LX\Ú[ÝÛNL_O]Ý[O^ÞÈÚY
ZYÚ
Ü\Y]\ÎLXÚÙÜÝ[ËÙXÓ\Ü^N^[YÛ][\ÎÙ[\\ÝYPÛÛ[Ù[\_OÜ[Ý[O^ÞÈÛÚ^NN_O¼'ä¬ÜÜ[Ù]
Ý[O^ÞÈÛÚ^NMÛÙZYÚ
ÌÛÛÜËÈ_OÝ\Ü[[ÚX[OÚ
Ù]]Ý[O^ÞÈ\Ü^N^^\XÝ[ÛÛÛ[[Ø\L_OHY^ÔVKÛÙ_H\Ù]HØ[È[HÛÜ[\ÜY\\Ý[O^ÞÈÛÛÜËKÛÚ^NMÛÙZYÚ
^XÛÜ][ÛÛH_OÛK][YHÛ][Û8¡¤ØOHY^ÔVKXßH\Ù]HØ[È[HÛÜ[\ÜY\\Ý[O^ÞÈÛÛÜËKÛÚ^NMÛÙZYÚ
^XÛÜ][ÛÛH_OXÝ\[ÈÛ][Û8¡¤ØOÙ]ÐØ\Ø\Ý[O^ÞÈY[ÎXÚÙÜÝ[ËS_OÝ[O^ÞÈÛÚ^NMÛÛÜËKÛÙZYÚ
X\Ú[ÝÛN_O]ZXÚÈ[ÜÎÜÝ[O^ÞÈÛÚ^NLËÛÛÜË[RZYÚ_O8 ([ÔÜXZÈØZ]\Ý8¡¤Ù[XÝÚ[[ÔÜXZÈØZ]\ÝÏ8 ([ÈÛÜ\ÛÛ[][]H8¡¤Ù[XÝÚ[H[ÈÛÜ\ÛÛ[][]HÏ8 (\\Ú\8¡¤Ù[XÝ\\Ï8 (Û[Y\[È8¡¤Ù[XÝÛ[Y\ÜÐØ\Ù]Ù]ÜÙXÝ[ÛÙ]
NÂBÊ8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥dKTPÓTÈQÑB8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d
Â[Ý[Û\XÛ\ÔYÙJ
HÂÛÛÝ[ØH\ÙSYYXJX^]ÚY
Í
HNÂ]\
]Ý[O^ÞÈY[ÕÜ
Ì_OÙXÝ[ÛÝ[O^ÞÈY[Î[ØÈXÚÙÜÝ[ËËZ[ZYÚ_OÙXÕ]HYÏHÙÈ]OH\XÛ\È	[ÚYÚÈÝXHÝYÚË\ÙX\Ú[ÝÜY\ÈÛHH[ÓÛÚHÛÛ[][]KÏ]Ý[O^ÞÈX^ÚYLX\Ú[]]È_OÜYÛÛÏ^ÌßHØ\^ÌOÖÂÈ[\Ý[[È]\Ù]\Ú]H[YXØ][ÛYÎYXØ][ÛÎËHKÈÚHÚYÛ[ÝXYÙHÚÝ[H]YÚ[]\HØÚÛÛYÎXØÙ\ÜÚX[]HÎËXØÈKÈZ[[È[Û\Ú]HX\[ÈÜXÙ\ÈÛHYÙ]YÎÛÛ[][]HÎËÙXÈKKX\

KJHO
Ø\Ù^O^Ú_HÜ\^Ø
ÛÛY	ØKßXOÜ[Ý[O^ÞÈXÚÙÜÝ[	ØKßLMXÛÛÜKËY[ÎLÜ\Y]\ÎLÛÚ^NLÛÙZYÚ
_OØKYßOÜÜ[ÈÝ[O^ÞÈÛÚ^NNÛÙZYÚ
ÌÛÛÜËËX\Ú[ÜMX\Ú[ÝÛN[RZYÚK_OØKOÚÏÝ[O^ÞÈÛÚ^NLËÛÛÜË_OÛÛZ[ÈÛÛÛÜÐØ\
J_BÔÜYÙ]Ý[O^ÞÈ^[YÛÙ[\X\Ú[Ü
ÛÚ^NMÛÛÜË_O[ÜH\XÛ\ÈÛÛZ[ÈÛÛÛÝ^H[YOÜÜÙXÝ[ÛÙ]
NÂBÊ8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¥d8¢âââââââ
   MAIN APP
   âââââââââââââââââââââââââââ */
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
