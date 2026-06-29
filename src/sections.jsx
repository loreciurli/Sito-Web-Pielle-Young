// ── Scroll progress bar ──
function ScrollProgress() {
  useEffect(() => {
    const bar = document.querySelector('.scroll-progress-bar');
    if (!bar) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const pct = max > 0 ? window.scrollY / max * 100 : 0;
        bar.style.width = pct + '%';
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {window.removeEventListener('scroll', update);window.removeEventListener('resize', update);};
  }, []);
  return (
    <div className="scroll-progress"><div className="scroll-progress-bar" /></div>);

}

// ── Ambient floating dust particles ──
function Dust({ count = 16, color }) {
  const items = React.useMemo(() => Array.from({ length: count }).map(() => ({
    x: Math.random() * 100,
    s: 2 + Math.random() * 4,
    d: Math.random() * -20,
    dur: 14 + Math.random() * 16,
    dx: -40 + Math.random() * 80,
    o: 0.3 + Math.random() * 0.5
  })), [count]);
  return (
    <div className="dust" aria-hidden="true">
      {items.map((p, i) =>
      <span key={i} style={{
        '--x': p.x + '%', '--s': p.s + 'px',
        '--d': p.d + 's', '--dur': p.dur + 's',
        '--dx': p.dx + 'px', '--o': p.o,
        background: color || 'rgba(255,255,255,.7)'
      }} />
      )}
    </div>);

}

// Page sections
function Hero({ headline, variant, showCourtLines, onOpenLead }) {
  // multi-layer scroll-driven parallax
  useEffect(() => {
    const els = document.querySelectorAll('[data-parallax]');
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        els.forEach((el) => {
          const k = parseFloat(el.getAttribute('data-parallax')) || 0;
          const mode = el.getAttribute('data-parallax-mode') || 'centered';
          if (mode === 'translate') {
            el.style.transform = `translate3d(0, ${y * k}px, 0)`;
          } else if (mode === 'scale') {
            const s = 1 + Math.min(0.18, y * 0.00018);
            el.style.transform = `translate3d(0, ${y * k}px, 0) scale(${s})`;
          } else {
            el.style.transform = `translate(-50%, calc(-50% + ${y * k}px))`;
          }
        });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="top" className={`hero variant-${variant}`}>
      {/* Full-bleed cinematic photo */}
      <div className="hero-photo" aria-hidden="true">
        <img src="assets/team-huddle.png" alt="" data-parallax="0.18" data-parallax-mode="scale" />
        <div className="hero-photo-grade" />
        <div className="hero-photo-grain" />
      </div>

      {/* Atmospheric layers — subtler now */}
      <div className="hero-atmos" aria-hidden="true">
        <div className="atmos-aurora atmos-aurora-1" />
        <div className="atmos-aurora atmos-aurora-2" />
        <div className="atmos-aurora atmos-aurora-3" />
      </div>

      {/* Ambient floating dust */}
      <Dust count={20} />

      {/* Vertical side label */}
      <div className="hero-side-label" aria-hidden="true">
        <span className="hsl-bar" />
        <span>EST. 2026 · LIVORNO · BASKET ACADEMY</span>
      </div>

      {/* Top-right index marker */}
      <div className="hero-index-marker" aria-hidden="true">
        <span>CHAPTER</span>
        <span className="him-bar" />
        <b>01</b>
        <span>The Future</span>
      </div>

      {/* HUGE breakout watermark */}
      <div className="hero-overword" data-parallax="-0.22" data-parallax-mode="translate" aria-hidden="true">PIELLE</div>

      {showCourtLines &&
      <svg className="court-lines" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="courtFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="40%" stopColor="#fff" stopOpacity=".5" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id="courtMask">
              <rect width="1440" height="900" fill="url(#courtFade)" />
            </mask>
          </defs>
          <g stroke="#B4D2EE" strokeWidth="1.2" fill="none" mask="url(#courtMask)" opacity=".9">
            <rect x="80" y="80" width="1280" height="740" rx="4" />
            <line x1="720" y1="80" x2="720" y2="820" />
            <circle cx="720" cy="450" r="110" />
            <circle cx="720" cy="450" r="50" />
            <path d="M80 300 h220 v300 H80z" />
            <path d="M1140 300 h220 v300 h-220z" />
            <path d="M300 300 a150 150 0 0 1 0 300" />
            <path d="M1140 300 a150 150 0 0 0 0 300" />
            <circle cx="300" cy="450" r="3" fill="#B4D2EE" />
            <circle cx="1140" cy="450" r="3" fill="#B4D2EE" />
          </g>
        </svg>
      }

      {/* Floating watermark wordmark — parallax */}
      <div className="hero-watermark" data-parallax="0.18" aria-hidden="true">PIELLE</div>

      {/* Cinematic corner brackets */}
      <span className="hero-corner hc-tl" aria-hidden="true" />
      <span className="hero-corner hc-tr" aria-hidden="true" />
      <span className="hero-corner hc-bl" aria-hidden="true" />
      <span className="hero-corner hc-br" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-stage">
          <Reveal className="hero-eyebrow">
            <span className="dot"></span>
            <span>Stagione 2026/2027 · Pre-iscrizioni aperte</span>
            <span className="eyebrow-sep">/</span>
            <span className="eyebrow-loc">Livorno</span>
          </Reveal>

          <Reveal as="h1" delay={80}>
            {(() => {
              const hadDot = /\.$/.test(headline);
              const clean = headline.replace(/\.$/, '').trim();
              const words = clean.split(/\s+/);
              const lastWord = words.pop() || '';
              const first = words.join(' ');
              return (
                <>
                  {first}{first ? <br /> : null}
                  <span className="accent">
                    <span className="accent-glow">{lastWord}{hadDot ? '.' : ''}</span>
                    <span className="accent-text">{lastWord}{hadDot ? '.' : ''}</span>
                  </span>
                </>);

            })()}
          </Reveal>

          <Reveal className="hero-tagstrip" delay={120} aria-hidden="true">
            <span className="hts-bar" />
            <span className="hts-text">Cresciamo Insieme</span>
            <span className="hts-bar" />
          </Reveal>

          <Reveal as="p" className="lead" delay={180}>
            <span className="lead-strong">Il nuovo settore giovanile Pielle, in collaborazione con <b>Roosters Livorno</b>.</span> Entra in campo: non è solo basket, è un viaggio fatto di sfide, valori e passione. Un percorso unico, pensato per far crescere il talento e formare l’atleta — dal primo palleggio fino al sogno dei grandi.
          </Reveal>

          <Reveal className="hero-ctas" delay={240}>
            <button className="btn btn-primary btn-lg btn-shine" onClick={onOpenLead}>
              <Icon name="ball" size={18} /> Richiedi informazioni
            </button>
            <a className="btn btn-ghost btn-lg btn-hero-ghost" href="#why">
              Scopri il progetto <Icon name="arrow" size={16} />
            </a>
          </Reveal>

          <Reveal className="hero-meta" delay={320}>
            <div className="meta-cell"><div className="k">5—19</div><div className="v">Età accolte</div></div>
            <div className="meta-divider" />
            <div className="meta-cell"><div className="k">100%</div><div className="v">Coach qualificati</div></div>
          </Reveal>
        </div>
      </div>

      <a className="hero-scroll-cue" href="#why" aria-label="Scorri per scoprire">
        <span className="cue-line" />
        <span className="cue-label">Scroll</span>
      </a>

    </section>);

}

// ── Marquee slate between hero and powered ──
function Slate() {
  const words = ['ROOSTERS LIVORNO', 'PIELLE LIVORNO', 'PIELLE YOUNG'];
  // Duplicate for seamless loop
  const loop = Array.from({ length: 10 }).flatMap(() => words);
  return (
    <section className="slate" aria-hidden="true">
      <div className="slate-edge-top" />
      <div className="slate-marquee">
        {loop.map((w, i) =>
        <React.Fragment key={i}>
            <span className={i % 3 === 2 ? 'filled' : ''}>{w}</span>
            <span className="sep" aria-hidden="true" />
          </React.Fragment>
        )}
      </div>
      <div className="slate-edge-bot" />
    </section>);

}

// ── Big-type manifesto interlude between Famiglia and Categorie ──
function Manifesto() {
  return (
    <section className="manifesto">
      <div className="manifesto-bg" data-parallax="0.12" data-parallax-mode="scale" aria-hidden="true" />
      <div className="manifesto-overlay" aria-hidden="true" />
      <div className="manifesto-grain" aria-hidden="true" />
      <Dust count={14} />
      <div className="container manifesto-inner">
        <Reveal className="manifesto-kicker">
          <span>Manifesto · 03</span>
        </Reveal>
        <Reveal as="h2" className="manifesto-title" delay={80}>
          QUI OGNI BAMBINO TROVA IL SUO SPAZIO PER <em>CRESCERE.</em>
        </Reveal>
        <Reveal className="manifesto-foot" delay={200}>
          <span><span className="dot" /> Pielle Young · Academy</span>
          <span>Allenamento dopo allenamento</span>
        </Reveal>
      </div>
    </section>);

}

function Powered() {
  return (
    <section className="powered">
      <div className="container">
        <div className="powered-wrap">
          <div className="powered-bg-grid" aria-hidden="true" />
          <div className="powered-head">
            <span className="lbl">
              <span className="lbl-dot" /> Un progetto congiunto
            </span>
            <h3>Due club. Una sola visione<br />per il futuro biancoazzurro.</h3>
          </div>

          <div className="partners-stage">
            <a className="partner-medal" href="https://www.piellelivorno.it" target="_blank" rel="noreferrer">
              <span className="medal-disc">
                <img src="assets/partner-pielle.png" alt="Pielle Livorno" />
              </span>
              <span className="medal-meta">
                <span className="role">Storia · Identità</span>
                <span className="name">Pielle Livorno</span>
                <span className="link">piellelivorno.it →</span>
              </span>
            </a>

            <span className="partners-bridge" aria-hidden="true">
              <span className="bridge-line" />
              <span className="bridge-glyph">×</span>
              <span className="bridge-line" />
            </span>

            <a className="partner-medal" href="https://www.roosterslivorno.com" target="_blank" rel="noreferrer">
              <span className="medal-disc">
                <img src="assets/partner-roosters.png" alt="Roosters Livorno" />
              </span>
              <span className="medal-meta">
                <span className="role">Metodo · Esperienza</span>
                <span className="name">Roosters Livorno</span>
                <span className="link">roosterslivorno.com →</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>);

}

function Why() {
  // MANIFESTO — "Entra nella famiglia Pielle"
  const pillars = [
  { n: '01', title: 'Identità', body: 'Si nasce biancoazzurri, si cresce biancoazzurri. Una maglia che vale più di un colore — è una città, una storia, un modo di stare al mondo.' },
  { n: '02', title: 'Crescita', body: 'Tecnica, mente, persona. Si lavora ogni giorno per chi sarà domani — non solo per chi è oggi.' },
  { n: '03', title: 'Squadra', body: 'Lo spogliatoio è casa. Si vince insieme, si perde insieme, si torna sempre più forti. Sempre.' },
  { n: '04', title: 'Rispetto', body: 'Per l\'avversario, l\'arbitro, il compagno, la palestra. Per la fatica di chi è venuto prima.' },
  { n: '05', title: 'Ambizione', body: 'Pensare in grande, lavorare nei dettagli. Il talento è una promessa — il lavoro la mantiene.' }];

  return (
    <section id="why" className="famiglia">
      <div className="famiglia-bg" aria-hidden="true">
        <div className="famiglia-photo" data-parallax="0.05" data-parallax-mode="scale" />
        <div className="famiglia-photo-overlay" />
        <div className="famiglia-photo-light" />
        <div className="famiglia-photo-grain" />
        <span className="famiglia-watermark famiglia-watermark-1" data-parallax="0.15">FAMIGLIA</span>
        <span className="famiglia-watermark famiglia-watermark-2" data-parallax="-0.08">PIELLE</span>
        <div className="famiglia-glow famiglia-glow-1" />
        <div className="famiglia-glow famiglia-glow-2" />
        <div className="famiglia-grain" />
      </div>

      <div className="container famiglia-wrap">
        <Reveal className="famiglia-eyebrow">
          <span className="dot" />
          <span>Famiglia</span>
          <span className="sep">/</span>
          <span className="dim">02 · Identità Pielle</span>
        </Reveal>

        <Reveal as="h2" className="famiglia-title" delay={100}>
          <span className="fl fl-pre">Entra nella</span>
          <span className="fl is-accent fl-duet">
            <span className="famiglia-accent-glow" aria-hidden="true">FAMIGLIA&nbsp;PIELLE.</span>
            <span className="famiglia-accent-text">FAMIGLIA</span>
            <span className="famiglia-accent-text-white">&nbsp;PIELLE.</span>
          </span>
        </Reveal>

        <div className="famiglia-manifesto-copy">
          <Reveal as="p" className="famiglia-para" delay={180}>
            Pielle Young è un luogo in cui i bambini possono sentirsi <b>accolti, ascoltati e liberi di crescere</b>.
          </Reveal>
          <Reveal as="p" className="famiglia-para" delay={240}>
            Qui il minibasket è uno strumento, non un fine: serve a costruire fiducia, amicizie, autonomia e serenità.
          </Reveal>
          <Reveal as="p" className="famiglia-para" delay={300}>
            Ogni allenamento è pensato per rispettare i <b>tempi di ogni bambino</b>, valorizzarne il carattere e aiutarlo a scoprire chi è, dentro e fuori dal campo.
          </Reveal>
          <Reveal as="p" className="famiglia-para" delay={360}>
            Crediamo che un educatore debba prima di tutto saper creare un ambiente positivo, dove sbagliare non fa paura, dove ci si sente parte di un gruppo e dove <b>ogni piccolo passo viene riconosciuto</b>.
          </Reveal>
          <Reveal as="p" className="famiglia-para famiglia-para-final" delay={420}>
            Perché la crescita più importante non si misura nei punti segnati, ma nella sicurezza con cui un bambino torna a casa <em>sorridendo</em>.
          </Reveal>

          <Reveal className="famiglia-mark" delay={480}>
            <span className="fm-line" />
            <span className="fm-text">DAL 1960 · CUORE BIANCOAZZURRO</span>
            <span className="fm-line" />
          </Reveal>
        </div>

        <Reveal className="famiglia-cinema famiglia-cinema--mark" delay={520} />
      </div>
    </section>);

}

function JobApplicationForm() {
  const [state, setState] = useState({
    nome: '', cognome: '', email: '',
    ruolo: '', presentazione: '', esperienza: '', consenso: false
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState('');
  const [done, setDone] = useState(false);
  const formRef = useRef(null);

  const up = (k, v) => setState((s) => ({ ...s, [k]: v }));

  const RUOLI = [
  'Allenatore Minibasket',
  'Allenatore Giovanili',
  'Assistente / Aiuto allenatore',
  'Dirigente accompagnatore',
  'Dirigente / Staff organizzativo',
  'Preparatore atletico',
  'Fisioterapista / Area medica',
  'Comunicazione & Social',
  'Volontario / Altro'];


  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!state.nome.trim()) er.nome = 1;
    if (!state.cognome.trim()) er.cognome = 1;
    if (!state.email.includes('@')) er.email = 1;
    if (!state.ruolo) er.ruolo = 1;
    if (!state.presentazione.trim() || state.presentazione.trim().length < 20) er.presentazione = 1;
    if (!state.esperienza.trim() || state.esperienza.trim().length < 10) er.esperienza = 1;
    if (!state.consenso) er.consenso = 1;
    setErrors(er);
    if (Object.keys(er).length) return;

    setSubmitting(true);
    setSendError('');
    const codice = 'PY-RC-' + Math.floor(10000 + Math.random() * 90000);

    try {
      if (!window.emailjs) throw new Error('EmailJS non caricato');
      await window.emailjs.sendForm(
        'service_z9u35fh',
        'template_3a9mepa',
        formRef.current,
        { publicKey: 'NU6dv_IcpskuUDtlM' }
      );
      setDone(true);
    } catch (err) {
      console.error('EmailJS error', err);
      // graceful fallback: open the user's mail client with prefilled content
      const subject = encodeURIComponent(`Candidatura — ${state.ruolo} — ${state.nome} ${state.cognome}`);
      const body = encodeURIComponent(
        `Nome: ${state.nome} ${state.cognome}\nEmail: ${state.email}\nRuolo: ${state.ruolo}\n\nPresentazione:\n${state.presentazione}\n\nEsperienze sportive passate:\n${state.esperienza}\n\nCodice: ${codice}`
      );
      setSendError('Invio diretto non riuscito. Apri il tuo client mail per completare l\'invio.');
      window.location.href = `mailto:info@pielleyoung.com?subject=${subject}&body=${body}`;
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="lavora-card-body lavora-success">
        <div className="ls-icon"><Icon name="check" size={28} /></div>
        <h3 className="ls-title">Candidatura ricevuta.</h3>
        <p className="ls-sub">
          Grazie {state.nome}. Abbiamo ricevuto il tuo profilo per il ruolo
          di <b>{state.ruolo}</b>. Ti ricontatteremo via email a <b>{state.email}</b>.
        </p>
        <div className="ls-meta">RISPOSTA IN TEMPI BREVI · CONVERSAZIONE RISERVATA</div>
      </div>);

  }

  return (
    <form ref={formRef} className="lavora-card-body job-form" onSubmit={submit} noValidate>
      <div className="jf-row jf-row-2">
        <label className={`jf-field ${errors.nome ? 'has-err' : ''} ${state.nome ? 'is-filled' : ''}`}>
          <span className="jf-label">Nome</span>
          <input
            type="text" name="nome" autoComplete="given-name"
            value={state.nome} onChange={(e) => up('nome', e.target.value)}
            placeholder="Marco" />
          
          <span className="jf-underline" aria-hidden="true" />
        </label>
        <label className={`jf-field ${errors.cognome ? 'has-err' : ''} ${state.cognome ? 'is-filled' : ''}`}>
          <span className="jf-label">Cognome</span>
          <input
            type="text" name="cognome" autoComplete="family-name"
            value={state.cognome} onChange={(e) => up('cognome', e.target.value)}
            placeholder="Rossi" />
          
          <span className="jf-underline" aria-hidden="true" />
        </label>
      </div>

      <label className={`jf-field ${errors.email ? 'has-err' : ''} ${state.email ? 'is-filled' : ''}`}>
        <span className="jf-label">Email</span>
        <input
          type="email" name="email" autoComplete="email" inputMode="email"
          value={state.email} onChange={(e) => up('email', e.target.value)}
          placeholder="nome@email.it" />
        
        <span className="jf-underline" aria-hidden="true" />
      </label>

      <label className={`jf-field jf-select ${errors.ruolo ? 'has-err' : ''} ${state.ruolo ? 'is-filled' : ''}`}>
        <span className="jf-label">Ruolo di interesse</span>
        <select
          name="ruolo"
          value={state.ruolo}
          onChange={(e) => up('ruolo', e.target.value)}>
          
          <option value="">Seleziona un ruolo…</option>
          {RUOLI.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <span className="jf-caret" aria-hidden="true">
          <Icon name="arrow" size={14} />
        </span>
        <span className="jf-underline" aria-hidden="true" />
      </label>

      <label className={`jf-field jf-textarea ${errors.presentazione ? 'has-err' : ''} ${state.presentazione ? 'is-filled' : ''}`}>
        <span className="jf-label">Breve presentazione</span>
        <textarea
          name="presentazione"
          rows="3"
          value={state.presentazione}
          onChange={(e) => up('presentazione', e.target.value)}
          placeholder="Raccontaci chi sei, perché vuoi entrare in Pielle Young…" />
        
        <span className="jf-underline" aria-hidden="true" />
        <span className="jf-counter">{state.presentazione.length}/600</span>
      </label>

      <label className={`jf-field jf-textarea ${errors.esperienza ? 'has-err' : ''} ${state.esperienza ? 'is-filled' : ''}`}>
        <span className="jf-label">Esperienze sportive passate</span>
        <textarea
          name="esperienza"
          rows="3"
          value={state.esperienza}
          onChange={(e) => up('esperienza', e.target.value)}
          placeholder="Società, ruoli, anni, livello… racconta il tuo percorso sportivo." />
        
        <span className="jf-underline" aria-hidden="true" />
        <span className="jf-counter">{state.esperienza.length}/600</span>
      </label>

      <label className={`jf-consent ${errors.consenso ? 'has-err' : ''}`}>
        <input
          type="checkbox"
          checked={state.consenso}
          onChange={(e) => up('consenso', e.target.checked)} />
        
        <span className="jf-check" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </span>
        <span className="jf-consent-text">
          Acconsento al trattamento dei dati personali (GDPR) per essere ricontattato da Pielle Young.
        </span>
      </label>

      {sendError &&
      <div className="jf-error">{sendError}</div>
      }

      <button type="submit" className="jf-submit" disabled={submitting}>
        <span className="jf-submit-bg" aria-hidden="true" />
        <span className="jf-submit-label">
          {submitting ?
          <><span className="jf-spinner" /> Invio in corso…</> :

          <>Invia candidatura <span className="jf-submit-arrow" aria-hidden="true">→</span></>
          }
        </span>
      </button>
    </form>);

}

function LavoraConNoi({ onOpenLead }) {
  const [copied, setCopied] = useState(false);
  const MAIL = 'info@pielleyoung.com';
  const MAIL_HREF = 'mailto:info@pielleyoung.com?subject=Candidatura%20Pielle%20Young&body=Ciao%20Pielle%20Young%2C%0A%0Anome%3A%20...%0Aruolo%3A%20...%0Apresentazione%3A%20...';
  const copyMail = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let ok = false;
    // Modern API
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(MAIL);
        ok = true;
      }
    } catch (_) {}
    // Fallback: hidden textarea + execCommand (older browsers / non-secure context)
    if (!ok) {
      try {
        const ta = document.createElement('textarea');
        ta.value = MAIL;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ta.setSelectionRange(0, MAIL.length);
        ok = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch (_) {}
    }
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } else {
      // Last-ditch: open mailto so user gets the address
      window.location.href = `mailto:${MAIL}`;
    }
  };
  const openClient = (e) => {
    // Native <a href="mailto:"> sometimes gets swallowed by overlays; force it.
    e.preventDefault();
    window.location.href = MAIL_HREF;
  };
  return (
    <section id="lavora" className="section lavora">
      <div className="lavora-bg" aria-hidden="true">
        <div className="lavora-gradient" />
        <div className="lavora-grid-bg" />
        <div className="lavora-glow lavora-glow-1" />
        <div className="lavora-glow lavora-glow-2" />
      </div>

      <div className="container">
        <div className="lavora-head lavora-head--left">
          <Reveal className="section-pill-eyebrow">
            <span className="dot" />
            <span>Lavora con noi</span>
            <span className="sep">/</span>
            <span className="dim">06 · Candidature aperte</span>
          </Reveal>
          <Reveal as="h2" className="lavora-title" delay={80}>
            Allenatori, dirigenti,{' '}
            <span className="lavora-title-accent">
              <span className="lt-glow" aria-hidden="true">appassionati biancoazzurri.</span>
              <span className="lt-text">appassionati biancoazzurri.</span>
            </span>
          </Reveal>
          <Reveal as="p" className="lavora-lead" delay={160}>
            Sei <b>allenatore, dirigente, educatore</b> o un semplice appassionato del
            basket giovanile? Pielle Young cresce, e ha bisogno di persone che vogliono
            costruire qualcosa di serio — insieme.
          </Reveal>

          <Reveal className="lavora-badges" delay={220}>
            <span className="lavora-badge"><Icon name="check" size={12} /> Ti ricontatteremo</span>
            <span className="lavora-badge"><Icon name="check" size={12} /> Colloquio in sede</span>
            <span className="lavora-badge"><Icon name="check" size={12} /> Trattamento GDPR</span>
          </Reveal>
        </div>

        <Reveal className="lavora-card lavora-card--wide" delay={300}>
          <div className="lavora-card-glow" aria-hidden="true" />
          <div className="lavora-card-inner">
            <div className="lavora-card-head">
              <span className="lavora-card-tag">
                <span className="dot" /> CANDIDATURE APERTE
              </span>
              <span className="lavora-card-num">01/01</span>
            </div>

            <JobApplicationForm />

            <div className="lavora-card-foot">
              <span className="lcf-line" />
              <span className="lcf-text">Risposta in tempi brevi · Conversazione riservata</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>);

}

function Categorie({ onOpenLead }) {
  const cats = [
  { age: '5 — 11 anni', name: 'Minibasket', body: 'Il primo contatto con la palla a spicchi. Gioco, coordinazione, socialità. Due/tre allenamenti a settimana più le partite del weekend.', freq: '2/3x / sett' },
  { age: '12 — 19 anni', name: 'Giovanili', body: 'Fondamentali individuali, tattica di squadra, campionati federali FIP. La fase in cui si forma il giocatore — dal Under 13 fino al Under 19.', freq: '3x / sett' }];

  return (
    <section id="categorie" className="section cat">
      <div className="container">
        <div className="section-head cat-head cat-head--left">
          <Reveal className="section-pill-eyebrow">
            <span className="dot" />
            <span>Categorie</span>
            <span className="sep">/</span>
            <span className="dim">04 · Percorso</span>
          </Reveal>
          <Reveal as="h2" className="cat-title" delay={80}>
            <span className="ct-line">UN PERCORSO</span>
            <span className="ct-line ct-line-accent">PER OGNI ETÀ.</span>
          </Reveal>
          <Reveal as="p" className="cat-sub" delay={140}>Dal minibasket al pre-agonismo: ogni categoria ha allenatori dedicati, obiettivi tecnici e una proposta settimanale chiara.</Reveal>
        </div>

        <div className="cat-grid">
          {cats.map((c, i) =>
          <Reveal key={i} delay={i * 80}>
              <a className="cat-card" href={i === 0 ? '#tariffe-minibasket' : '#tariffe-giovanili'} data-i={i}>
                <div className="bg" />
                <div className="label-top">
                  <span>0{i + 1} / 02</span>
                  <span>{c.freq}</span>
                </div>
                <div>
                  <div className="age"><Icon name="calendar" size={12} /> {c.age}</div>
                  <h3>{c.name}</h3>
                  <p>{c.body}</p>
                  <div className="arrow"><Icon name="arrow" size={18} /></div>
                </div>
              </a>
            </Reveal>
          )}
        </div>

        <Reveal delay={240}>
          <a className="cat-venue" href="https://maps.google.com/?q=Palacecioni+Via+Emilio+Zola+6+Livorno" target="_blank" rel="noreferrer">
            <span className="cv-glow" aria-hidden="true" />
            <span className="cv-grid-bg" aria-hidden="true" />
            <div className="cv-left">
              <div className="cv-eyebrow"><span className="cv-dot" /> Dove ci si allena</div>
              <div className="cv-venue">
                <span className="cv-pin"><Icon name="pin" size={22} /></span>
                <h3>PalaCecioni</h3>
              </div>
              <p className="cv-addr">Via Emilio Zola 6 · 57122 Livorno (LI)</p>
            </div>
            <div className="cv-right">
              <div className="cv-meta">
                <span className="cv-meta-k">Tutti gli allenamenti</span>
                <span className="cv-meta-v">Minibasket · Giovanili</span>
              </div>
              <span className="cv-map">Apri la mappa <Icon name="arrow" size={16} /></span>
            </div>
          </a>
        </Reveal>
      </div>
    </section>);

}

function Tariffe({ onOpenLead }) {
  const PriceFormula = ({ num, label, total, rates, cats }) => (
    <div className="pf">
      <div className="pf-head">
        <span className="pf-num" aria-hidden="true">{num}</span>
        <div className="pf-head-meta">
          <div className="pf-head-k">{label}</div>
          <div className="pf-head-v">a settimana</div>
          {cats && <div className="pf-head-cats">{cats}</div>}
        </div>
      </div>

      <div className="pf-options">
        <div className="pf-opt pf-opt-soluzione">
          <div className="pf-opt-eyebrow">
            <span className="pf-opt-dot"/>
            <span>Unica soluzione · all'iscrizione</span>
          </div>
          <div className="pf-price">
            <span className="pf-currency">€</span>
            <span className="pf-amount">{total}</span>
          </div>
        </div>

        <div className="pf-or" aria-hidden="true">
          <span className="pf-or-line"/>
          <span className="pf-or-text">oppure</span>
          <span className="pf-or-line"/>
        </div>

        <div className="pf-opt pf-opt-rate">
          <div className="pf-opt-eyebrow">
            <span className="pf-opt-dot"/>
            <span>3 rate</span>
          </div>
          <div className="pf-rates">
            {rates.map((r, i) => (
              <div key={i} className="pf-rate">
                <span className="pf-rate-num">{i+1}ª</span>
                <span className="pf-rate-amt">€{r}</span>
                {i === 0 ? <span className="pf-rate-note">all'iscrizione</span> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const inclusiPerks = [
    { t:'Kit sportivo ufficiale', s:'Completo Pielle Young' },
    { t:'Sconto fratello', s:'10% dal 2° figlio in poi' },
  ];

  return (
    <section id="tariffe" className="section tariffe">
      <div className="tariffe-bg-glow" />
      <div className="container">
        <div className="section-head tariffe-head tariffe-head--left">
          <Reveal className="section-pill-eyebrow">
            <span className="dot" />
            <span>Tariffe</span>
            <span className="sep">/</span>
            <span className="dim">05 · Stagione 2026/27</span>
          </Reveal>
          <h2>Quote <span className="accent-word">trasparenti.</span></h2>
          <p className="cat-sub">
            Tutto incluso, senza sorprese. Scegli la formula più adatta — il resto lo pensiamo noi.
          </p>
        </div>

        {/* MINIBASKET */}
        <div id="tariffe-minibasket" className="tariffe-block">
          <div className="tariffe-block-head">
            <div className="tariffe-eyebrow">
              <span className="dot" /> Categoria
            </div>
            <h3>Minibasket <span style={{ color: 'var(--muted)', fontWeight: 300 }}>· 5–11 anni</span></h3>
          </div>

          <div className="tariffe-grid">
            {/* FULL */}
            <div className="price-card price-card--featured">
              <span className="pc-spotlight" aria-hidden="true" />
              <span className="pc-corner pc-corner-tl" aria-hidden="true" />
              <span className="pc-corner pc-corner-tr" aria-hidden="true" />
              <span className="pc-corner pc-corner-bl" aria-hidden="true" />
              <span className="pc-corner pc-corner-br" aria-hidden="true" />

              <div className="pc-top">
                <span className="pc-id">
                  <span className="pc-id-dot"/>
                  <span>01 / 02 · FULL</span>
                </span>
                <span className="pc-pick">
                  <Icon name="star" size={11} />
                  <span>Scelta consigliata</span>
                </span>
              </div>

              <div className="pc-head">
                <div className="pc-name">FULL</div>
                <div className="pc-tag">Il percorso completo</div>
              </div>

              <div className="pc-formulas pc-formulas--row">
                <PriceFormula num={2} label="Allenamenti" total={449} rates={[200, 150, 99]} cats="Pulcini · Scoiattoli" />
                <PriceFormula num={3} label="Allenamenti" total={549} rates={[200, 200, 149]} cats="Aquilotti · Esordienti" />
              </div>

              <div className="pc-inclusi">
                <div className="pc-inclusi-label">
                  <span className="pc-inclusi-line"/>
                  <span>Inclusi nella quota</span>
                  <span className="pc-inclusi-line"/>
                </div>
                <div className="pc-inclusi-grid">
                  {inclusiPerks.map((p, i) => (
                    <div key={i} className="pc-perk">
                      <span className="pc-perk-check"><Icon name="check" size={12}/></span>
                      <div>
                        <b>{p.t}</b>
                        <span>{p.s}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary btn-lg btn-shine pc-cta" onClick={onOpenLead}>
                <Icon name="ball" size={18} /> Iscrivi tuo figlio
              </button>
            </div>

            {/* ONE DAY */}
            <div className="price-card">
              <span className="pc-corner pc-corner-tl" aria-hidden="true" />
              <span className="pc-corner pc-corner-tr" aria-hidden="true" />
              <span className="pc-corner pc-corner-bl" aria-hidden="true" />
              <span className="pc-corner pc-corner-br" aria-hidden="true" />

              <div className="pc-top">
                <span className="pc-id">
                  <span className="pc-id-dot"/>
                  <span>02 / 02 · ONE DAY</span>
                </span>
              </div>

              <div className="pc-head">
                <div className="pc-name">ONE DAY</div>
                <div className="pc-tag">Scelta flessibile</div>
              </div>

              <div className="pc-formulas">
                <PriceFormula num={1} label="Allenamento" total={349} rates={[200, 100, 49]} cats="Pulcini · Scoiattoli" />
              </div>

              <div className="pc-inclusi">
                <div className="pc-inclusi-label">
                  <span className="pc-inclusi-line"/>
                  <span>Inclusi nella quota</span>
                  <span className="pc-inclusi-line"/>
                </div>
                <div className="pc-inclusi-grid">
                  {inclusiPerks.map((p, i) => (
                    <div key={i} className="pc-perk">
                      <span className="pc-perk-check"><Icon name="check" size={12}/></span>
                      <div>
                        <b>{p.t}</b>
                        <span>{p.s}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn btn-ghost btn-lg pc-cta" onClick={onOpenLead}>
                <Icon name="ball" size={18} /> Iscrivi tuo figlio
              </button>
            </div>
          </div>

          {/* GIFT BANNER — perk esclusivo Minibasket (premium ticket) */}
          <Reveal delay={180}>
            <div className="gift-ticket">
              <div className="gift-ticket-bg" aria-hidden="true">
                <div className="gtb-photo" />
                <div className="gtb-overlay" />
                <div className="gtb-grain" />
                <div className="gtb-watermark" aria-hidden="true">PIELLE</div>
              </div>

              {/* Cinematic spotlights */}
              <span className="gt-spot gt-spot-1" aria-hidden="true" />
              <span className="gt-spot gt-spot-2" aria-hidden="true" />

              {/* Top boarding-pass strip */}
              <div className="gt-strip">
                <div className="gt-strip-brand">
                  <span className="gt-medal" aria-hidden="true">
                    <img src="assets/logo-pl-fish.png" alt="" />
                  </span>
                  <div>
                    <div className="gt-brand-name">PIELLE LIVORNO</div>
                    <div className="gt-brand-sub">SEASON PASS · CURVA SUD</div>
                  </div>
                </div>
                <div className="gt-strip-meta">
                  <span className="gt-strip-k">PASS</span>
                  <span className="gt-strip-v">2026/27</span>
                </div>
              </div>

              <div className="gt-body">
                {/* MAIN — left side */}
                <div className="gt-main">
                  <div className="gt-eyebrow">
                    <span className="gt-dot" />
                    <span>ESCLUSIVO MINIBASKET</span>
                  </div>

                  <div className="gt-hero">
                    <span className="gt-omaggio" aria-hidden="true">IN OMAGGIO</span>
                    <h3 className="gt-headline">
                      <span className="gt-h-1">UN ANNO IN</span>
                      <span className="gt-h-2">CURVA SUD</span>
                    </h3>
                  </div>

                  <p className="gt-sub">
                    Ogni bambino iscritto al <b>Minibasket Pielle Young</b> riceve in
                    <b> omaggio l'abbonamento</b> alla stagione <b>2026/27 della Pielle Livorno</b>.
                    Vivere ogni partita dal vivo, dentro il calore biancoazzurro — perché si
                    cresce anche dagli spalti.
                  </p>

                  <div className="gt-info">
                    <div className="gt-info-cell">
                      <span className="gt-info-k">STAGIONE</span>
                      <span className="gt-info-v">2026/27</span>
                    </div>
                    <div className="gt-info-cell">
                      <span className="gt-info-k">SETTORE</span>
                      <span className="gt-info-v">Curva Sud</span>
                    </div>
                    <div className="gt-info-cell">
                      <span className="gt-info-k">TIPO</span>
                      <span className="gt-info-v">Season Pass</span>
                    </div>
                    <div className="gt-info-cell">
                      <span className="gt-info-k">VALORE</span>
                      <span className="gt-info-v">In omaggio</span>
                    </div>
                  </div>
                </div>

                {/* PERFORATION — between left/right */}
                <div className="gt-perf" aria-hidden="true">
                  <span className="gt-perf-notch gt-perf-notch-top" />
                  <span className="gt-perf-line" />
                  <span className="gt-perf-notch gt-perf-notch-bottom" />
                </div>

                {/* STUB — right side */}
                <div className="gt-stub">
                  <div className="gt-stub-head">
                    <div className="gt-stub-eyebrow"></div>
                    <div className="gt-stub-title">CURVA<br />SUD</div>
                  </div>

                  <div className="gt-stub-barcode" aria-hidden="true">
                    <div className="gt-bc" />
                  </div>

                  <div className="gt-stub-foot">
                    <div className="gt-serial">
                      <span className="gt-serial-k"></span>
                      <span className="gt-serial-v"></span>
                    </div>
                    <div className="gt-stub-seal" aria-hidden="true">
                      <span>PIELLE</span>
                      <span>YOUNG</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom micro-print */}
              <div className="gt-microprint" aria-hidden="true">
                <span>PIELLEYOUNG · CURVA SUD SEASON PASS · 2026/27 · NON CEDIBILE · INCLUSO NELLA QUOTA MINIBASKET · </span>
                <span>PIELLEYOUNG · CURVA SUD SEASON PASS · 2026/27 · NON CEDIBILE · INCLUSO NELLA QUOTA MINIBASKET · </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* GIOVANILI */}
        <div id="tariffe-giovanili" className="tariffe-block">
          <div className="tariffe-block-head">
            <div className="tariffe-eyebrow">
              <span className="dot" /> Categoria
            </div>
            <h3>Giovanili <span style={{ color: 'var(--muted)', fontWeight: 300 }}>· 12–19 anni</span></h3>
          </div>

          <div className="price-card price-card--info">
            <div className="info-grid">
              <div className="info-icon">
                <Icon name="phone" size={28} />
              </div>
              <div>
                <h4>Quote personalizzate per categoria</h4>
                <p>
                  Le quote delle squadre giovanili (Under 13, 14, 15, 17, 19) variano in base alla
                  categoria, al livello di campionato e all'impegno settimanale. Per ricevere
                  il dettaglio della tua categoria contatta la segreteria.
                </p>
                <div className="info-actions">
                  <button className="btn btn-primary btn-md btn-shine" onClick={onOpenLead}>
                    <Icon name="ball" size={16} /> Contatta la segreteria
                  </button>
                  <a className="btn btn-ghost btn-md" href="tel:+393398225447">
                    <Icon name="phone" size={16} /> 339 822 5447
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>);

}

function Metodo() {
  const values = [
  { n: '01', ico: 'dribble', h: 'Tecnica', p: 'Fondamentali curati con costanza: palleggio, tiro, passaggio, difesa.' },
  { n: '02', ico: 'whistle', h: 'Disciplina', p: 'Puntualità, attenzione e impegno: la base di ogni atleta e ogni persona.' },
  { n: '03', ico: 'shield', h: 'Rispetto', p: 'Per compagni, avversari, arbitri, allenatori. Sempre. Su e fuori dal campo.' },
  { n: '04', ico: 'smile', h: 'Divertimento', p: 'Si gioca a basket. Il sorriso è parte del metodo — non l\'alternativa.' },
  { n: '05', ico: 'users', h: 'Squadra', p: 'Il gruppo prima del singolo. Il successo si condivide, la fatica anche.' },
  { n: '06', ico: 'rocket', h: 'Crescita', p: 'Obiettivi chiari anno per anno. Valutazioni tecniche e confronti con le famiglie.' }];

  return (
    <section id="metodo" className="section method">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label" style={{ color: 'var(--powder)' }}>Il metodo</div>
            <h2>Sei valori.<br />Un modo di fare basket.</h2>
          </div>
          <div className="right">
            Il modello Pielle Young unisce la scuola cestistica Roosters alla cultura del club biancoazzurro. Ecco i principi che guidano ogni singolo allenamento.
          </div>
        </div>
        <div className="method-grid">
          {values.map((v) =>
          <div key={v.n} className="method-cell">
              <div>
                <div className="n">{v.n}</div>
                <div className="ico" style={{ marginTop: 10 }}><Icon name={v.ico} size={24} /></div>
                <h4>{v.h}</h4>
                <p>{v.p}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function Staff() {return null;}

function FAQ() {
  const items = [
  { q: 'Da che età si inizia?', a: 'Accogliamo bambini dai 5 anni con i corsi minibasket, fino ai 19 anni con le giovanili. Non c\'è mai un momento sbagliato per iniziare.' },
  { q: 'Serve avere già esperienza?', a: 'No, assolutamente. La maggior parte dei nostri iscritti non ha mai toccato un pallone. I gruppi sono divisi per età e livello — ogni bambino parte dal punto giusto per lui.' },
  { q: 'Come funziona la prova gratuita?', a: 'Compili il modulo: ti richiamiamo in tempi brevi per fissare una lezione di prova. Si viene in palestra con scarpe da ginnastica pulite e abbigliamento sportivo. Nessun costo, nessun impegno.' },
  { q: 'Dove ci si allena?', a: 'Le sedute si svolgono in palestre convenzionate a Livorno. Comunichiamo sede e orari dopo il primo contatto, in base alla categoria d\'età.' },
  { q: 'Come ci si iscrive?', a: 'Dopo la prova, se il ragazzo o la ragazza vuole continuare, l\'iscrizione si formalizza con tesseramento FIP, visita medica sportiva e quota annuale. Ti seguiamo passo-passo.' },
  { q: 'Quanto costa?', a: 'Le quote variano per categoria e frequenza. Durante il primo contatto ti inviamo il listino completo, le modalità di pagamento e le eventuali agevolazioni per fratelli.' }];

  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section faq">
      <div className="container">
        <div className="section-head" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <div className="section-label">FAQ</div>
          <h2 style={{ textAlign: 'center' }}>Le domande dei genitori.</h2>
          <div className="right" style={{ textAlign: 'center' }}>Se la tua non è qui, scrivici: rispondiamo in tempi brevi.</div>
        </div>
        <div className="faq-list">
          {items.map((it, i) =>
          <div key={i} className="faq-item" data-open={open === i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{it.q}</span>
                <span className="plus"><Icon name="plus" size={16} /></span>
              </button>
              <div className="faq-a">{it.a}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function LeadSection() {
  return (
    <section id="contatti" className="section lead-wrap lead-cinema">
      <div className="lead-bg" aria-hidden="true">
        <div className="lead-gradient" />
        <div className="lead-grid-bg" />
        <div className="lead-glow lead-glow-1" />
        <div className="lead-glow lead-glow-2" />
        <span className="lead-watermark" data-parallax="0.1" data-parallax-mode="translate">PIELLE</span>
        <span className="lead-watermark lead-watermark-2" data-parallax="-0.06" data-parallax-mode="translate">YOUNG</span>
        <div className="lead-grain" />
      </div>
      <Dust count={14} />

      <div className="container lead-cinema-wrap">
        <div className="lead-cinema-head">
          <Reveal className="section-pill-eyebrow">
            <span className="dot" />
            <span>Contatti</span>
            <span className="sep">/</span>
            <span className="dim">07 · Iscrizioni aperte</span>
          </Reveal>
          <Reveal as="h2" className="lead-title" delay={80}>
            ENTRA IN <span className="lead-accent"><span className="la-glow" aria-hidden="true">CAMPO</span><span className="la-text">CAMPO</span></span>.
          </Reveal>
          <Reveal as="p" className="lead-sub" delay={160}>
            Lascia un contatto: un nostro referente ti ricontatterà <b>in tempi brevi</b> per orari,
            sedi, quote e prova gratuita. Nessun costo, nessun impegno.
          </Reveal>
        </div>

        <div className="lead-cinema-grid">
          <Reveal className="lead-cinema-aside" delay={200}>
            <div className="lead-aside-meta">
              <span className="lam-line" />
              <span className="lam-text">RICHIESTA INFORMAZIONI</span>
              <span className="lam-num">07/07</span>
            </div>

            <ul className="lead-bullets">
              <li>
                <span className="lb-num">01</span>
                <div>
                  <b>Compili il modulo</b>
                  <span>Pochi campi, due minuti.</span>
                </div>
              </li>
              <li>
                <span className="lb-num">02</span>
                <div>
                  <b>Ti chiamiamo noi</b>
                  <span>Risposta veloce garantita al numero indicato.</span>
                </div>
              </li>
              <li>
                <span className="lb-num">03</span>
                <div>
                  <b>Prova gratuita</b>
                  <span>Fissiamo insieme la prima lezione in palestra.</span>
                </div>
              </li>
            </ul>

            <div className="lead-aside-wa">
              <div className="law-label">Preferisci WhatsApp?</div>
              <a href="https://wa.me/393398225447" className="law-cta">
                <span className="law-num">+39 339 822 5447</span>
                <span className="law-btn"><Icon name="wa" size={16} /> Scrivici ora</span>
              </a>
            </div>

            <div className="lead-aside-place">
              <div className="lap-row">
                <span className="lap-ico"><Icon name="desk" size={15} /></span>
                <span className="lap-label">Segreteria</span>
                <span className="lap-v lap-v-soon">Coming soon</span>
              </div>
              <div className="lap-row">
                <span className="lap-ico"><Icon name="pin" size={15} /></span>
                <span className="lap-label">Palestra</span>
                <span className="lap-v">Palacecioni — Via Emilio Zola 6, 57122 Livorno (LI)</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="lead-cinema-form" delay={260}>
            <div className="lead-form-glow" aria-hidden="true" />
            <LeadForm />
          </Reveal>
        </div>

        <Reveal className="lead-reassure" delay={320}>
          <div className="lr-cell"><span className="lr-ico">★</span><span>STAFF QUALIFICATO</span></div>
          <span className="lr-divider" />
          <div className="lr-cell"><span className="lr-ico">●</span><span>PROVA GRATUITA</span></div>
          <span className="lr-divider" />
          <div className="lr-cell"><span className="lr-ico">▲</span><span>TUTTE LE ETÀ</span></div>
          <span className="lr-divider" />
          <div className="lr-cell"><span className="lr-ico">◆</span><span>COACH FIP</span></div>
        </Reveal>
      </div>
    </section>);

}

function CTAFinal({ onOpenLead }) {
  return (
    <section className="cta-final">
      <div className="bg-lines" />
      <div className="big-ball" />
      <div className="container cta-final-inner">
        <Reveal>
          <div className="mono" style={{ fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--powder)', marginBottom: 18 }}>
            ─── Inizia adesso
          </div>
        </Reveal>
        <Reveal as="h2" delay={80}>
          Richiedi<br /><span className="accent">informazioni</span> oggi.
        </Reveal>
        <Reveal as="p" delay={160}>
          Non si paga nulla. Non ci si tessera. Si mette solo una maglietta e si entra in palestra.
        </Reveal>
        <Reveal delay={220}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={onOpenLead}>
              <Icon name="ball" size={18} /> Richiedi informazioni
            </button>
            <a className="btn btn-white btn-lg" href="https://wa.me/393398225447">
              <Icon name="wa" size={18} /> Scrivici su WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>);

}

// Safeguarding section — must come before Footer
function Safeguarding() {
  return (
    <section id="safeguarding" className="section safe safe-cinema">
      <div className="safe-bg" aria-hidden="true">
        <div className="safe-gradient" />
        <div className="safe-grid-bg" />
        <div className="safe-glow safe-glow-1" />
        <div className="safe-glow safe-glow-2" />
        <span className="safe-watermark" data-parallax="0.08" data-parallax-mode="translate">PROTEZIONE</span>
        <div className="safe-grain" />
      </div>
      <Dust count={12} />

      <div className="container safe-cinema-wrap">
        <div className="safe-cinema-head">
          <Reveal className="safe-eyebrow">
            <span className="dot" />
            <span>Tutela dei minori</span>
            <span className="sep">•</span>
            <span className="dim">Policy 2026</span>
          </Reveal>
          <Reveal as="h2" className="safe-title" delay={80}>
            UN AMBIENTE <span className="safe-accent"><span className="sa-glow" aria-hidden="true">SICURO</span><span className="sa-text">SICURO</span></span>,<br />
            sempre.
          </Reveal>
          <Reveal as="p" className="safe-sub" delay={160}>
            La protezione dei nostri ragazzi è la prima responsabilità del club. Personale formato,
            protocolli chiari, un canale dedicato per ogni segnalazione — in totale riservatezza.
          </Reveal>
        </div>

        <Reveal className="safe-card-cinema" delay={240}>
          <div className="safe-card-glow" aria-hidden="true" />
          <div className="safe-card-inner">
            <div className="safe-shield">
              <Icon name="shield" size={48} />
            </div>
            <div className="safe-card-body">
              <h3>Segnala in modo riservato.</h3>
              <p>
                Se sei testimone o vittima di comportamenti scorretti, abusi o discriminazioni
                nell'ambito del nostro settore giovanile, puoi denunciare in piena riservatezza.
                Il referente safeguarding di Pielle Young raccoglie ogni segnalazione e attiva
                le procedure di tutela previste dalla <b>normativa FIP</b>.
              </p>
              <a
                href="mailto:safeguarding@pielleyoung.com?subject=Segnalazione%20Safeguarding%20Pielle%20Young"
                className="safe-cta">
                
                <Icon name="mail" size={16} />
                <span className="safe-cta-copy">
                  <span className="safe-cta-text">Scrivi al responsabile Safeguarding</span>
                  <span className="safe-cta-mail">safeguarding@pielleyoung.com</span>
                </span>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal className="safe-reassure" delay={320}>
          <div className="lr-cell"><span className="lr-ico">★</span><span>STAFF CERTIFICATO</span></div>
          <span className="lr-divider" />
          <div className="lr-cell"><span className="lr-ico">●</span><span>PROTOCOLLO CONI</span></div>
          <span className="lr-divider" />
          <div className="lr-cell"><span className="lr-ico">◆</span><span>CANALE RISERVATO</span></div>
        </Reveal>
      </div>
    </section>);

}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#top" className="brand brand-footer">
              <span className="brand-footer-medal">
                <img src="assets/logo-pl-fish.png" alt="Pielle Young" />
              </span>
              <span className="brand-text">
                <b style={{ color: '#fff', fontSize: 20 }}>PIELLE YOUNG</b>
                <span style={{ color: 'var(--powder)' }}>Settore Giovanile</span>
              </span>
            </a>
            <p className="footer-about">
              Il nuovo settore giovanile Pielle Livorno, in collaborazione con Roosters Livorno. Un progetto serio per far crescere il futuro biancoazzurro.
            </p>
            <div className="footer-social-block">
              <div className="footer-social-label">Seguici sui nostri social</div>
              <div className="social">
                <a href="https://www.instagram.com/pielleyoung/" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="ig" size={18} /></a>
                <a href="https://www.facebook.com/profile.php?id=61576424370018" target="_blank" rel="noreferrer" aria-label="Facebook"><Icon name="fb" size={18} /></a>
              </div>
            </div>
          </div>
          <div>
            <h5>Progetto</h5>
            <ul>
              <li><a href="#top">Home</a></li>
              <li><a href="#why">Famiglia</a></li>
              <li><a href="#categorie">Categorie</a></li>
              <li><a href="#tariffe">Tariffe</a></li>
              <li><a href="#contatti">Contatti</a></li>
              <li><a href="#lavora">Lavora con noi</a></li>
              <li><a href="safeguarding.html">Safeguarding</a></li>
            </ul>
          </div>
          <div>
            <h5>Contatti</h5>
            <ul className="footer-contact">
              <li><a href="tel:+393398225447"><Icon name="phone" size={14} /> +39 339 822 5447</a></li>
              <li><a href="mailto:info@pielleyoung.com"><Icon name="mail" size={14} /> info@pielleyoung.com</a></li>
              <li><a href="mailto:safeguarding@pielleyoung.com"><Icon name="shield" size={14} /> safeguarding@pielleyoung.com</a></li>
              <li><a href="https://wa.me/393398225447"><Icon name="wa" size={14} /> +39 339 822 5447</a></li>
              <li className="footer-loc"><Icon name="desk" size={14} /> <span>Segreteria · Coming soon</span></li>
              <li className="footer-loc"><Icon name="pin" size={14} /> <span>Palacecioni — Via Emilio Zola 6, 57122 Livorno (LI)</span></li>
            </ul>
          </div>
          <div>
            <h5>Network</h5>
            <ul>
              <li><a href="https://www.piellelivorno.it" target="_blank" rel="noreferrer">Pielle Livorno</a></li>
              <li><a href="https://www.roosterslivorno.com" target="_blank" rel="noreferrer">Roosters Livorno</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bot">
          <div>© 2026 Pielle Young — Roosters Livorno SSD a RL · P.IVA 02074990496 · Tutti i diritti riservati</div>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="privacy.html">Privacy</a>
            <a href="cookie.html">Cookie</a>
          </div>
        </div>
      </div>
    </footer>);

}

Object.assign(window, { Hero, ScrollProgress, Slate, Manifesto, Dust, Powered, Why, Categorie, Tariffe, Staff, FAQ, LeadSection, CTAFinal, Safeguarding, Footer, LavoraConNoi });