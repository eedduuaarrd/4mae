import { useState, useEffect, useCallback } from "react";
import Nav from "./components/Nav";
import WaitlistForm from "./components/WaitlistForm";
import LegalModal from "./components/LegalModal";
import Reveal from "./components/Reveal";
import FaqItem from "./components/FaqItem";
import PlanWeek from "./components/PlanWeek";
import { useCountUp } from "./hooks/useCountUp";
import { getSignupCount } from "./lib/waitlist";
import {
  TICKERS,
  STATS,
  WEARABLES,
  FAQS,
  SPORTS,
  PROBLEMS,
  STEPS,
  PLAN_FEATURES,
  COMPARISON_ROWS,
  TESTIMONIALS,
  PRICING_FREE,
  PRICING_PRO,
  PRICING_BETA,
  LEGAL,
} from "./data/content";

function scrollToWaitlist() {
  document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
}

function scrollToMain() {
  document.getElementById("problema")?.scrollIntoView({ behavior: "smooth" });
}

export default function App() {
  const [signupCount, setSignupCount] = useState(getSignupCount);
  const [faqOpen, setFaqOpen] = useState(null);
  const [legal, setLegal] = useState(null);
  const [sportQuery, setSportQuery] = useState("");

  const count = useCountUp(signupCount);

  const refreshCount = useCallback(() => setSignupCount(getSignupCount()), []);

  useEffect(() => {
    window.addEventListener("4mae:waitlist-updated", refreshCount);
    return () => window.removeEventListener("4mae:waitlist-updated", refreshCount);
  }, [refreshCount]);

  const tickerItems = [...TICKERS, ...TICKERS];
  const filteredSports = SPORTS.filter((s) => s.n.toLowerCase().includes(sportQuery.toLowerCase().trim()));

  return (
    <>
      <Nav onWaitlist={scrollToWaitlist} />
      <main id="main">
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
              4mæ connecta amb el teu wearable, analitza com estàs de veritat i genera un pla que s&apos;adapta
              cada setmana — o cada dia, si cal.
            </p>
            <WaitlistForm
              source="hero"
              compact
              buttonLabel="Accés anticipat gratuït"
              note="Sense targeta de crèdit · Gratuït per als primers usuaris · Cancel·la quan vulguis"
              onSuccess={refreshCount}
            />
          </div>
          <div className="h-badge" aria-live="polite">
            <div className="h-badge-num">{count}</div>
            <div className="h-badge-lbl">persones ja inscrites</div>
          </div>
          <button type="button" className="h-scroll" onClick={scrollToMain}>
            <div className="h-scroll-line" />
            Descobreix més
          </button>
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
          {STATS.map(([n, l]) => (
            <div className="si" key={l}>
              <div className="si-n">{n}</div>
              <div className="si-l">{l}</div>
            </div>
          ))}
        </div>

        <section className="sec" id="problema">
          <Reveal>
            <div className="eyebrow">El problema</div>
            <h2 className="sec-title">
              Els plans genèrics
              <br />
              no <em>funcionen</em>
            </h2>
          </Reveal>
          <div className="prob-grid">
            {PROBLEMS.map((c, i) => (
              <Reveal key={c.n} delay={i * 80}>
                <div className="pc">
                  <div className="pc-n">{c.n}</div>
                  <div className="pc-t">{c.t}</div>
                  <div className="pc-d">{c.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="sec-s" id="com-funciona">
          <Reveal>
            <div className="eyebrow">Com funciona</div>
            <h2 className="sec-title">
              Quatre passos.
              <br />
              Un pla <em>perfecte.</em>
            </h2>
          </Reveal>
          <div className="steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 70}>
                <div className="step">
                  <div className="step-n">0{i + 1}</div>
                  <div className="step-i">{s.i}</div>
                  <div className="step-t">{s.t}</div>
                  <div className="step-d">{s.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="sec" id="pla">
          <Reveal>
            <div className="eyebrow">El teu pla, en temps real</div>
            <h2 className="sec-title">
              Així s&apos;assembla
              <br />
              un pla de <em>4mæ</em>
            </h2>
          </Reveal>
          <div className="plan-l">
            <Reveal>
              <div>
                <p className="plan-desc">
                  Cada setmana, 4mæ genera sessions específiques basades en el teu estat de forma, objectiu i
                  disponibilitat. Si alguna cosa canvia, el pla s&apos;actualitza.
                </p>
                <div className="pfs">
                  {PLAN_FEATURES.map((f) => (
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
            </Reveal>
            <Reveal delay={120}>
              <PlanWeek />
            </Reveal>
          </div>
        </section>

        <section className="sec-s" id="integracions">
          <Reveal>
            <div className="eyebrow">Integracions</div>
            <h2 className="sec-title">
              Connecta el que
              <br />
              ja <em>fas servir</em>
            </h2>
          </Reveal>
          <div className="wear-grid">
            {WEARABLES.map((w, i) => (
              <Reveal key={w.name} delay={i * 60}>
                <div className={`wc${w.coming ? " coming" : ""}`}>
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
              </Reveal>
            ))}
          </div>
        </section>

        <section className="sec" id="comparativa">
          <Reveal>
            <div className="eyebrow">Comparativa</div>
            <h2 className="sec-title">
              Per què <em>4mæ</em>
              <br />
              i no una altra?
            </h2>
          </Reveal>
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
                {COMPARISON_ROWS.map(([fn, ...vs]) => (
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

        <section className="sec-s2" id="testimonis">
          <Reveal>
            <div className="eyebrow">Primers usuaris beta</div>
            <h2 className="sec-title">
              El que diuen
              <br />
              els que ho <em>proven</em>
            </h2>
          </Reveal>
          <div className="test-grid">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="tc">
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
              </Reveal>
            ))}
          </div>
        </section>

        <section className="sec" id="esports">
          <Reveal>
            <div className="eyebrow">Per a tot tipus d&apos;esportista</div>
            <h2 className="sec-title">
              El teu esport.
              <br />
              <em>Sigui quin sigui.</em>
            </h2>
          </Reveal>
          <div className="sport-search-wrap">
            <input
              type="search"
              className="sport-search"
              placeholder="Cerca el teu esport…"
              value={sportQuery}
              onChange={(e) => setSportQuery(e.target.value)}
              aria-label="Cercar esport"
            />
          </div>
          <div className="sport-grid">
            {filteredSports.length === 0 ? (
              <p className="sport-empty">Cap esport coincideix amb la cerca.</p>
            ) : (
              filteredSports.map((s) => (
                <div className="stag" key={s.n}>
                  <span className="stag-ico">{s.i}</span>
                  {s.n}
                </div>
              ))
            )}
          </div>
        </section>

        <section className="sec-s" id="preus">
          <Reveal>
            <div className="eyebrow">Plans i preus</div>
            <h2 className="sec-title">
              Simple,
              <br />
              <em>transparent.</em>
            </h2>
          </Reveal>
          <div className="price-grid">
            <Reveal>
              <div className="price-card">
                <div className="price-name">Free</div>
                <div className="price-amt">0€</div>
                <div className="price-period">per sempre · sense targeta</div>
                <div className="price-feats">
                  {PRICING_FREE.map((f) => (
                    <div className={`price-feat${f.on ? "" : " off"}`} key={f.t}>
                      {f.t}
                    </div>
                  ))}
                </div>
                <button type="button" className="price-btn ghost" onClick={scrollToWaitlist}>
                  Comença gratis
                </button>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="price-card featured">
                <div className="price-badge">Més popular</div>
                <div className="price-name">Pro</div>
                <div className="price-amt">
                  <em>7€</em>
                </div>
                <div className="price-period">al mes · facturació anual</div>
                <div className="price-feats">
                  {PRICING_PRO.map((t) => (
                    <div className="price-feat" key={t}>
                      {t}
                    </div>
                  ))}
                </div>
                <button type="button" className="price-btn" onClick={scrollToWaitlist}>
                  Prova gratis 30 dies
                </button>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="price-card">
                <div className="price-name">Beta</div>
                <div className="price-amt">0€</div>
                <div className="price-period">durant tota la fase beta</div>
                <div className="price-feats">
                  {PRICING_BETA.map((t) => (
                    <div className="price-feat" key={t}>
                      {t}
                    </div>
                  ))}
                </div>
                <button type="button" className="price-btn" onClick={scrollToWaitlist}>
                  Uneix-te a la beta
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="sec" id="faq">
          <div className="faq-layout">
            <Reveal className="faq-sticky">
              <div className="eyebrow">FAQ</div>
              <h2 className="sec-title" style={{ marginBottom: 20 }}>
                Preguntes
                <br />
                <em>freqüents</em>
              </h2>
              <p className="faq-subdesc">
                Tens alguna altra pregunta? Escriu-nos a{" "}
                <a href="mailto:hola@4mae.app">hola@4mae.app</a> i et responem en menys de 24h.
              </p>
            </Reveal>
            <div className="faq-list">
              {FAQS.map((f, i) => (
                <FaqItem
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  open={faqOpen === i}
                  onToggle={() => setFaqOpen(faqOpen === i ? null : i)}
                />
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
            <WaitlistForm source="cta" onSuccess={refreshCount} />
          </div>
        </section>
      </main>

      <footer>
        <div className="f-brand">4mæ</div>
        <div className="f-links">
          <button type="button" onClick={() => setLegal(LEGAL.privacy)}>
            Privacitat
          </button>
          <button type="button" onClick={() => setLegal(LEGAL.terms)}>
            Termes
          </button>
          <a href="mailto:hola@4mae.app">Contacte</a>
          <button type="button" onClick={scrollToWaitlist}>
            Beta
          </button>
        </div>
        <div className="f-copy">© 2026 4mæ · Entrenament adaptatiu intel·ligent</div>
      </footer>

      <LegalModal doc={legal} onClose={() => setLegal(null)} />
    </>
  );
}
