import { useState, useEffect, useRef } from "react";

const TICKERS = [
  "Marató",
  "Ironman",
  "Trail 100K",
  "Triatló Sprint",
  "Ciclisme",
  "Natació",
  "Futbol",
  "Halterofília",
  "Duatló",
  "Escalada",
];

const WEEK = [
  { d: "DLL", t: "run", l: "Rodatge suau", i: "8km Z2 · Ritme còmode", p: 36 },
  { d: "DIM", t: "str", l: "Força", i: "Core + cames · 45min", p: 48 },
  { d: "DMC", t: "run", l: "Sèries", i: "6×1km P3 · Descans 90s", p: 84 },
  { d: "DIJ", t: "rest", l: "Descans actiu", i: "Mobilitat / recuperació", p: 10 },
  { d: "DIV", t: "run", l: "Tempo", i: "12km Z3 progressiu", p: 68 },
  { d: "DIS", t: "bike", l: "Cross-train", i: "60min bici Z2", p: 52 },
  { d: "DUM", t: "run", l: "Tirada llarga", i: "22km Z2 · Ritme marató", p: 92 },
];

const P_CLASS = {
  run: "p-run",
  rest: "p-rest",
  bike: "p-bike",
  str: "p-str",
  swim: "p-swim",
};

const P_LABEL = {
  run: "Córrer",
  rest: "Descans",
  bike: "Bici",
  str: "Força",
  swim: "Natació",
};

const WEARABLES = [
  {
    logo: "⌚",
    name: "Garmin",
    desc: "VO2max, HRV, Training Load i Body Battery per a màxima precisió.",
    tags: ["HRV", "Training Load", "Zones"],
  },
  {
    logo: "🍎",
    name: "Apple Watch",
    desc: "Integració via Apple Health. Freqüència cardíaca, son i activitat.",
    tags: ["Apple Health", "FC", "Son"],
  },
  {
    logo: "🟠",
    name: "Strava",
    desc: "Importa automàticament totes les activitats. Historial complet.",
    tags: ["Activitats", "Segments", "Social"],
  },
  {
    logo: "🔴",
    name: "Polar",
    desc: "Orthostatic test i Sleep Plus Stages per a recuperació precisa.",
    tags: ["HRV", "Son", "Recuperació"],
  },
  {
    logo: "🔵",
    name: "Suunto",
    desc: "Altitud, dades de trail i peaks per a esports de muntanya.",
    tags: ["Trail", "Altitud", "GPS"],
  },
  {
    logo: "💚",
    name: "Fitbit",
    desc: "Son, estrès i activitat via Google Health Connect.",
    tags: ["Son", "Estrès", "Health Connect"],
    coming: true,
  },
];

const FAQS = [
  {
    q: "Necessito un wearable per usar l'app?",
    a: "No és obligatori. Pots introduir dades manualment, però amb un wearable connectat l'adaptació és molt més precisa: HRV, son i càrrega real.",
  },
  {
    q: "Com s'adapta el pla si em salto una sessió?",
    a: "L'app detecta la sessió no completada i redistribueix la càrrega de la setmana seguint els teus objectius, sense sobrecarregar-te.",
  },
  {
    q: "Per a quins nivells és adequat?",
    a: "Des de principiants absoluts fins a atletes avançats. L'IA ajusta volum, intensitat i progressió segons el teu historial real.",
  },
  {
    q: "Quants esports pot gestionar alhora?",
    a: "Pots tenir plans actius per a múltiples esports simultàniament — ideal per triatletes o qui combina disciplines.",
  },
  {
    q: "Les dades del meu wearable són segures?",
    a: "Sí. No emmagatzemem dades de salut en servidors de tercers. Només processem el necessari per generar el teu pla.",
  },
  {
    q: "Quan estarà disponible?",
    a: "Estem en beta privada. Les persones de la llista d'espera rebran accés per ordre d'inscripció.",
  },
  {
    q: "Quina diferència hi ha amb un entrenador personal?",
    a: "Un entrenador humà costa 100–300€/mes. 4mæ ofereix adaptació diària 24/7 per una fracció del preu, complementant (no substituint) l'entrenador si en tens.",
  },
];

const SPORTS = [
  { i: "🏃", n: "Marató" },
  { i: "🏊", n: "Natació" },
  { i: "🚴", n: "Ciclisme" },
  { i: "🏅", n: "Triatló" },
  { i: "⛰️", n: "Trail Running" },
  { i: "🔱", n: "Ironman" },
  { i: "🧗", n: "Escalada" },
  { i: "🚣", n: "Rem" },
  { i: "🥋", n: "Arts marcials" },
  { i: "⛷️", n: "Esquí alpí" },
  { i: "🏋️", n: "Halterofília" },
  { i: "⚽", n: "Futbol" },
  { i: "🚵", n: "MTB" },
  { i: "🎾", n: "Pàdel" },
  { i: "🏃‍♀️", n: "Duatló" },
  { i: "🤸", n: "CrossFit" },
];

const TARGET_COUNT = 347;

function useCountUp(target, delay = 1300) {
  const [count, setCount] = useState(0);
  const frame = useRef(null);

  useEffect(() => {
    let current = 0;
    const step = () => {
      current += Math.ceil((target - current) / 8);
      if (current >= target) {
        setCount(target);
        return;
      }
      setCount(current);
      frame.current = requestAnimationFrame(step);
    };
    const t = setTimeout(() => {
      frame.current = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(t);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, delay]);

  return count;
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function scrollToWaitlist() {
  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
}

export default function App() {
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [success1, setSuccess1] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [err1, setErr1] = useState("");
  const [err2, setErr2] = useState("");
  const [navScrolled, setNavScrolled] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const count = useCountUp(TARGET_COUNT);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = (value, setValue, setSuccess, setErr) => {
    if (!isValidEmail(value)) {
      setErr("Introdueix un email vàlid");
      return;
    }
    setErr("");
    setSuccess(true);
    setValue("");
  };

  const tickerItems = [...TICKERS, ...TICKERS];

  return (
    <>
      <nav className={navScrolled ? "s" : ""}>
        <div className="brand">4mæ</div>
        <div className="nav-r">
          <div className="nav-pill">Beta oberta aviat</div>
          <button type="button" className="nav-cta" onClick={scrollToWaitlist}>
            Accés anticipat
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-noise" aria-hidden />
        <div className="hero-glow" aria-hidden />
        <div className="hero-lines" aria-hidden />
        <div className="hero-inner">
          <div className="h-eyebrow">Entrenament adaptatiu · IA · Wearables</div>
          <h1 className="h1">
            Entrena
            <br />
            <em>per a tu.</em>
            <br />
            <span className="sub-word">Cada dia.</span>
          </h1>
          <p className="h-sub">
            4mæ connecta amb el teu wearable, analitza com estàs de veritat i genera un pla que
            s&apos;adapta cada setmana — o cada dia, si cal.
          </p>
          {success1 ? (
            <div className="ok">✓ Perfecte! Et notifiquem quan obrim.</div>
          ) : (
            <>
              <div className="h-form">
                <input
                  className="h-input"
                  type="email"
                  placeholder="el.teu@email.com"
                  value={email1}
                  onChange={(e) => {
                    setEmail1(e.target.value);
                    setErr1("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && submit(email1, setEmail1, setSuccess1, setErr1)}
                  aria-label="Email per accés anticipat"
                />
                <button type="button" className="btn" onClick={() => submit(email1, setEmail1, setSuccess1, setErr1)}>
                  Accés anticipat gratuït
                </button>
              </div>
              {err1 && <p className="err">{err1}</p>}
              <p className="h-note">Sense targeta de crèdit · Gratuït per als primers usuaris · Cancel·la quan vulguis</p>
            </>
          )}
        </div>
        <div className="h-badge">
          <div className="h-badge-num">{count}</div>
          <div className="h-badge-lbl">persones ja inscrites</div>
        </div>
        <div className="h-scroll">
          <div className="h-scroll-line" />
          Descobreix més
        </div>
      </section>

      <div className="ticker-wrap" aria-hidden>
        <div className="ticker">
          {tickerItems.map((t, i) => (
            <div className="ti" key={`${t}-${i}`}>
              {t}
              <span className="d" />
            </div>
          ))}
        </div>
      </div>

      <div className="stats">
        {[
          ["+16", "Esports suportats"],
          ["100%", "Adaptatiu setmana a setmana"],
          ["6+", "Wearables integrats"],
          ["24/7", "Pla sempre actualitzat"],
        ].map(([n, l]) => (
          <div className="si" key={l}>
            <div className="si-n">{n}</div>
            <div className="si-l">{l}</div>
          </div>
        ))}
      </div>

      <section className="sec">
        <div className="eyebrow">El problema</div>
        <h2 className="sec-title">
          Els plans genèrics
          <br />
          no <em>funcionen</em>
        </h2>
        <div className="prob-grid">
          {[
            {
              n: "01",
              t: "Plans estàtics",
              d: "Descarregues un PDF de 16 setmanes que no sap si t'has fet mal, si has dormit 4h o si aquesta setmana tens més feina.",
            },
            {
              n: "02",
              t: "Zero adaptació",
              d: "La vida canvia. El teu entrenament no. Saltes sessions, et lesions o millores més ràpid del previst — i el pla no ho sap.",
            },
            {
              n: "03",
              t: "Entrenadors inassequibles",
              d: "Un entrenador personal de qualitat costa 150–300€/mes. La majoria d'esportistes no poden permetre-s'ho.",
            },
          ].map((c) => (
            <div className="pc" key={c.n}>
              <div className="pc-n">{c.n}</div>
              <div className="pc-t">{c.t}</div>
              <div className="pc-d">{c.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec-s">
        <div className="eyebrow">Com funciona</div>
        <h2 className="sec-title">
          Quatre passos.
          <br />
          Un pla <em>perfecte.</em>
        </h2>
        <div className="steps">
          {[
            { i: "🎯", t: "Defineix l'objectiu", d: "Cursa, data, nivell actual, hores disponibles per setmana." },
            { i: "⌚", t: "Connecta el wearable", d: "Garmin, Apple Watch, Polar, Strava. Les teves dades reals." },
            { i: "🧠", t: "La IA dissenya el pla", d: "Periodització científica, zones de càrrega, progressió intel·ligent." },
            { i: "🔄", t: "S'adapta automàticament", d: "HRV baix? Sessió saltada? Millores més ràpid? El pla s'ajusta sol." },
          ].map((s, i) => (
            <div className="step" key={s.t}>
              <div className="step-n">0{i + 1}</div>
              <div className="step-i">{s.i}</div>
              <div className="step-t">{s.t}</div>
              <div className="step-d">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="eyebrow">El teu pla, en temps real</div>
        <h2 className="sec-title">
          Així s&apos;assembla
          <br />
          un pla de <em>4mæ</em>
        </h2>
        <div className="plan-l">
          <div>
            <p className="plan-desc">
              Cada setmana, 4mæ genera sessions específiques basades en el teu estat de forma, objectiu i
              disponibilitat. Si alguna cosa canvia, el pla s&apos;actualitza.
            </p>
            <div className="pfs">
              {[
                { i: "❤️", t: "Zones de freqüència cardíaca", d: "Cada sessió té una intensitat precisa segons les teves zones reals." },
                { i: "😴", t: "Índex de recuperació", d: "Si el HRV baixa o has dormit poc, la càrrega s'ajusta." },
                { i: "📈", t: "Progressió científica", d: "La càrrega augmenta seguint principis de periodització provats." },
                { i: "⚠️", t: "Alertes de sobreentrenament", d: "4mæ detecta patrons d'alarma i t'ho diu abans de lesionar-te." },
              ].map((f) => (
                <div className="pf" key={f.t}>
                  <div className="pf-ico">{f.i}</div>
                  <div>
                    <div className="pf-t">{f.t}</div>
                    <div className="pf-d">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="wk">
              <div className="wk-hd">
                <span className="wk-title">Setmana 8 · Preparació Marató BCN</span>
                <span className="wk-tag">Adaptat avui</span>
              </div>
              {WEEK.map((d) => (
                <div className="dr" key={d.d}>
                  <span className="dr-day">{d.d}</span>
                  <span className={`pill ${P_CLASS[d.t]}`}>{P_LABEL[d.t]}</span>
                  <div className="dr-info">
                    <b>{d.l}</b>
                    <small>{d.i}</small>
                  </div>
                  <div className="dr-load">
                    <div className="dr-pct">{d.p}%</div>
                    <div className="lb">
                      <div
                        className="lf"
                        style={{
                          width: `${d.p}%`,
                          opacity: d.t === "rest" ? 0.35 : 1,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="adapt-box">
              <span style={{ fontSize: 16 }}>⚡</span>
              <div className="adapt-txt">
                Pla adaptat avui: HRV baix detectat (41ms vs mitjana 58ms). Sèries de dimecres reduïdes de
                6×1km a 5×1km. Tirada de diumenge mantinguda en Z2.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-s">
        <div className="eyebrow">Integracions</div>
        <h2 className="sec-title">
          Connecta el que
          <br />
          ja <em>fas servir</em>
        </h2>
        <div className="wear-grid">
          {WEARABLES.map((w) => (
            <div className={`wc${w.coming ? " coming" : ""}`} key={w.name}>
              <div className="wc-logo">{w.logo}</div>
              <div className="wc-name">
                {w.name}
                {w.coming && <span className="coming-tag">Aviat</span>}
              </div>
              <div className="wc-desc">{w.desc}</div>
              <div className="wc-tags">
                {w.tags.map((t) => (
                  <span className={w.coming ? "coming-tag" : "wc-tag"} key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="eyebrow">Comparativa</div>
        <h2 className="sec-title">
          Per què <em>4mæ</em>
          <br />
          i no una altra?
        </h2>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: "26%" }}>Funcionalitat</th>
                <th className="hl">4mæ</th>
                <th>TrainingPeaks</th>
                <th>Nike Run Club</th>
                <th>Entrenador personal</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Pla 100% personalitzat", "✓", "✓", "✗", "✓"],
                ["Adaptació automàtica setmanal", "✓", "✗", "✗", "Parcial"],
                ["Múltiples esports", "✓", "✓", "✗", "✓"],
                ["Integració wearables", "✓", "✓", "Parcial", "✗"],
                ["Detecció sobreentrenament", "✓", "Parcial", "✗", "✓"],
                ["Accés 24/7 a les dades", "✓", "✓", "✗", "✗"],
                ["Preu mensual", "Gratis*", "19€", "Gratis", "100–300€"],
              ].map(([fn, ...vs]) => (
                <tr key={fn}>
                  <td className="fn">{fn}</td>
                  {vs.map((v, i) => (
                    <td key={i} className={i === 0 ? "hl" : ""}>
                      {v === "✓" ? (
                        <span className="chk">✓</span>
                      ) : v === "✗" ? (
                        <span className="crs">—</span>
                      ) : (
                        <span className="prt">{v}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="tbl-note">*Gratuït durant la beta. Pla premium previst a 7–9€/mes al llançament.</p>
      </section>

      <section className="sec-s2">
        <div className="eyebrow">Primers usuaris beta</div>
        <h2 className="sec-title">
          El que diuen
          <br />
          els que ho <em>proven</em>
        </h2>
        <div className="test-grid">
          {[
            {
              q: "Vaig trencar el meu rècord personal als 5km després de 3 mesos. Per primer cop un pla que realment s'adaptava quan em trobava malament.",
              name: "Laura M.",
              r: "Runner · Barcelona",
              ic: "🏃‍♀️",
            },
            {
              q: "Com a triatleta necessitava gestionar tres disciplines alhora sense sobreentrenar-me. 4mæ ho fa sol.",
              name: "Marc T.",
              r: "Triatleta · Girona",
              ic: "🏅",
            },
            {
              q: "Quan vaig veure que reduïa la sessió perquè havia dormit malament, vaig quedar convençut. Això no ho fa cap PDF.",
              name: "Anna R.",
              r: "Trail · Pyrenees",
              ic: "⛰️",
            },
          ].map((t) => (
            <div className="tc" key={t.name}>
              <div className="tc-sport">{t.ic}</div>
              <div className="tc-stars">★★★★★</div>
              <div className="tc-q">{t.q}</div>
              <div className="tc-author">
                <div className="tc-av">{t.ic}</div>
                <div>
                  <div className="tc-n">{t.name}</div>
                  <div className="tc-r">{t.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="eyebrow">Per a tot tipus d&apos;esportista</div>
        <h2 className="sec-title">
          El teu esport.
          <br />
          <em>Sigui quin sigui.</em>
        </h2>
        <div className="sport-grid">
          {SPORTS.map((s) => (
            <div className="stag" key={s.n}>
              <span className="stag-ico">{s.i}</span>
              {s.n}
            </div>
          ))}
        </div>
      </section>

      <section className="sec-s">
        <div className="eyebrow">Plans i preus</div>
        <h2 className="sec-title">
          Simple,
          <br />
          <em>transparent.</em>
        </h2>
        <div className="price-grid">
          <div className="price-card">
            <div className="price-name">Free</div>
            <div className="price-amt">0€</div>
            <div className="price-period">per sempre · sense targeta</div>
            <div className="price-feats">
              {[
                { t: "Pla bàsic per a 1 esport", on: true },
                { t: "Seguiment manual d'activitats", on: true },
                { t: "Fins a 3 sessions/setmana", on: true },
                { t: "Integració wearables", on: false },
                { t: "Adaptació automàtica", on: false },
                { t: "Múltiples esports", on: false },
                { t: "Alertes sobreentrenament", on: false },
              ].map((f) => (
                <div className={`price-feat${f.on ? "" : " off"}`} key={f.t}>
                  {f.t}
                </div>
              ))}
            </div>
            <button type="button" className="price-btn ghost" onClick={scrollToWaitlist}>
              Comença gratis
            </button>
          </div>
          <div className="price-card featured">
            <div className="price-badge">Més popular</div>
            <div className="price-name">Pro</div>
            <div className="price-amt">
              <em>7€</em>
            </div>
            <div className="price-period">al mes · facturació anual</div>
            <div className="price-feats">
              {[
                "Plans per a esports il·limitats",
                "Integració tots els wearables",
                "Adaptació automàtica diària",
                "Múltiples objectius simultanis",
                "Alertes sobreentrenament",
                "Exportació a calendar",
              ].map((t) => (
                <div className="price-feat" key={t}>
                  {t}
                </div>
              ))}
            </div>
            <button type="button" className="price-btn" onClick={scrollToWaitlist}>
              Prova gratis 30 dies
            </button>
          </div>
          <div className="price-card">
            <div className="price-name">Beta</div>
            <div className="price-amt">0€</div>
            <div className="price-period">durant tota la fase beta</div>
            <div className="price-feats">
              {[
                "Tot el que inclou Pro",
                "Accés prioritari a noves funcions",
                "Feedback directe amb l'equip",
                "Preu bloquejat de per vida",
              ].map((t) => (
                <div className="price-feat" key={t}>
                  {t}
                </div>
              ))}
            </div>
            <button type="button" className="price-btn" onClick={scrollToWaitlist}>
              Uneix-te a la beta
            </button>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="faq-layout">
          <div className="faq-sticky">
            <div className="eyebrow">FAQ</div>
            <h2 className="sec-title" style={{ marginBottom: 20 }}>
              Preguntes
              <br />
              <em>freqüents</em>
            </h2>
            <p className="faq-subdesc">
              Tens alguna altra pregunta? Escriu-nos a{" "}
              <a href="mailto:hola@4mae.app" style={{ color: "var(--a)" }}>
                hola@4mae.app
              </a>{" "}
              i et responem en menys de 24h.
            </p>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div className={`fi${faqOpen === i ? " open" : ""}`} key={f.q}>
                <div
                  className="fi-q"
                  role="button"
                  tabIndex={0}
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setFaqOpen(faqOpen === i ? null : i);
                    }
                  }}
                >
                  <span>{f.q}</span>
                  <span className="fi-ic">+</span>
                </div>
                <div className="fi-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" id="waitlist">
        <div className="cta-rings" aria-hidden>
          {[320, 520, 720, 960].map((s) => (
            <div className="ring" key={s} style={{ width: s, height: s }} />
          ))}
        </div>
        <div className="cta-inner">
          <h2 className="cta-big">
            Entrena millor.
            <br />
            <em>Comença ara.</em>
          </h2>
          <p className="cta-sub">Uneix-te a la llista d&apos;espera. Gratuït per als primers usuaris de la beta.</p>
          {success2 ? (
            <div className="ok">✓ Perfecte! Et contactem ben aviat.</div>
          ) : (
            <>
              <div className="cta-form">
                <input
                  className="h-input"
                  style={{ maxWidth: 300 }}
                  type="email"
                  placeholder="el.teu@email.com"
                  value={email2}
                  onChange={(e) => {
                    setEmail2(e.target.value);
                    setErr2("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && submit(email2, setEmail2, setSuccess2, setErr2)}
                  aria-label="Email llista d'espera"
                />
                <button type="button" className="btn" onClick={() => submit(email2, setEmail2, setSuccess2, setErr2)}>
                  Vull accés anticipat
                </button>
              </div>
              {err2 && <p className="err">{err2}</p>}
            </>
          )}
        </div>
      </section>

      <footer>
        <div className="f-brand">4mæ</div>
        <div className="f-links">
          <a href="#waitlist">Privacitat</a>
          <a href="#waitlist">Termes</a>
          <a href="mailto:hola@4mae.app">Contacte</a>
          <a href="#waitlist">Blog</a>
        </div>
        <div className="f-copy">© 2026 4mæ · Entrenament adaptatiu intel·ligent</div>
      </footer>
    </>
  );
}
