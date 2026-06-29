// Reusable UI components
const { useState, useEffect, useRef } = React;

// Reveal on scroll — premium easing + optional stagger
function Reveal({ children, delay = 0, as: Tag = 'div', once = true, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  // When shown, force inline final state. Use setProperty with !important so
  // it wins over any CSS rule even if a transition or animation is stuck.
  useEffect(() => {
    if (!shown || !ref.current) return;
    const node = ref.current;
    node.style.setProperty('opacity', '1', 'important');
    node.style.setProperty('transform', 'translateY(0) scale(1)', 'important');
    node.style.setProperty('transition',
      'opacity .85s cubic-bezier(.22,.7,.18,1), transform .85s cubic-bezier(.22,.7,.18,1)',
      'important'
    );
  }, [shown]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const fallback = setTimeout(() => setShown(true), 1400 + delay);
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return () => clearTimeout(fallback);
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    io.observe(node);
    return () => { clearTimeout(fallback); io.disconnect(); };
  }, [delay, once]);
  return <Tag ref={ref} {...rest} className={`reveal ${shown ? 'in' : ''} ${rest.className||''}`}>{children}</Tag>;
}

// Primary header — centered logo, split nav, cinematic interactions
function Header({ onOpenLead, onToggleTweaks }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const leftLinks = [
    ['Famiglia', '#why'],
    ['Categorie', '#categorie'],
    ['Tariffe', '#tariffe'],
  ];
  const rightLinks = [
    ['Gioca', '#contatti'],
    ['Lavora', '#lavora'],
    ['Safeguarding', 'safeguarding.html'],
  ];
  const allLinks = [...leftLinks, ...rightLinks];
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 3D tilt logo following cursor
  const logoRef = React.useRef(null);
  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width/2;
      const cy = r.top + r.height/2;
      const dx = (e.clientX - cx) / (window.innerWidth/2);
      const dy = (e.clientY - cy) / (window.innerHeight/2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rx = Math.max(-10, Math.min(10, -dy * 8));
        const ry = Math.max(-12, Math.min(12, dx * 10));
        el.style.setProperty('--rx', rx.toFixed(2) + 'deg');
        el.style.setProperty('--ry', ry.toFixed(2) + 'deg');
        el.style.setProperty('--px', (50 + dx*40).toFixed(1) + '%');
        el.style.setProperty('--py', (50 + dy*40).toFixed(1) + '%');
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <header className={`site-header pyh ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="pyh-glass" aria-hidden="true"/>
        <div className="pyh-rule" aria-hidden="true"/>
        <div className="container pyh-inner">
          {/* Left rail */}
          <nav className="pyh-rail pyh-rail-left" aria-label="Sezioni">
            {leftLinks.map(([l, h], i) => (
              <a key={h} href={h} className="pyh-link" style={{['--i']: i}}>
                <span className="pyh-link-text">{l}</span>
                <span className="pyh-link-sweep" aria-hidden="true"/>
              </a>
            ))}
          </nav>

          {/* Center logo — living mark */}
          <a href="#top" className="pyh-mark" aria-label="Pielle Young — home" ref={logoRef}>
            <span className="pyh-mark-aura" aria-hidden="true"/>
            <span className="pyh-mark-ring pyh-mark-ring-1" aria-hidden="true"/>
            <span className="pyh-mark-ring pyh-mark-ring-2" aria-hidden="true"/>
            <span className="pyh-mark-disc">
              <span className="pyh-mark-light" aria-hidden="true"/>
              <img src="assets/logo-pl-fish.png" alt="Pielle Young"/>
              <span className="pyh-mark-sweep" aria-hidden="true"/>
            </span>

          </a>

          {/* Right rail */}
          <nav className="pyh-rail pyh-rail-right" aria-label="Servizi">
            {rightLinks.map(([l, h], i) => (
              <a key={h} href={h} className="pyh-link" style={{['--i']: i}}>
                <span className="pyh-link-text">{l}</span>
                <span className="pyh-link-sweep" aria-hidden="true"/>
              </a>
            ))}
          </nav>

          {/* Floating CTA — absolute right edge */}
          <div className="pyh-cta">
            <button className="pyh-btn" onClick={onOpenLead}>
              <span className="pyh-btn-glow" aria-hidden="true"/>
              <span className="pyh-btn-text"><Icon name="ball" size={14}/> Iscriviti</span>
            </button>
            <button className="pyh-burger" aria-label="Apri menu" onClick={() => setMenuOpen(true)}>
              <span/><span/><span/>
            </button>
          </div>
          <a className="pyh-phone pyh-phone-left" href="tel:+393398225447" aria-label="Chiama">
            <Icon name="phone" size={13}/>
          </a>
        </div>
      </header>

      <div className={`mmenu pymm ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="pymm-bg" aria-hidden="true">
          <div className="pymm-glow pymm-glow-1"/>
          <div className="pymm-glow pymm-glow-2"/>
          <div className="pymm-grain"/>
        </div>
        <div className="pymm-head">
          <a href="#top" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="pymm-mark">
              <img src="assets/logo-pl-fish.png" alt=""/>
            </span>
            <span className="brand-text"><b style={{color:'#fff'}}>PIELLE YOUNG</b><span style={{color:'var(--gold)'}}>Settore Giovanile</span></span>
          </a>
          <button className="pyh-burger pyh-burger-close" aria-label="Chiudi" onClick={() => setMenuOpen(false)}>
            <span/><span/><span/>
          </button>
        </div>
        <div className="pymm-list">
          {allLinks.map(([l, h], i) => (
            <a key={h} href={h} onClick={() => setMenuOpen(false)} style={{['--i']: i}}>
              <span className="pymm-num">0{i+1}</span>
              <span className="pymm-label">{l}</span>
              <span className="pymm-arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
        <div className="pymm-foot">
          <button className="btn btn-primary btn-lg" onClick={() => { setMenuOpen(false); onOpenLead(); }}>
            <Icon name="ball" size={18}/> Iscriviti
          </button>
          <a className="btn btn-ghost btn-lg" style={{borderColor:'rgba(246,190,61,.35)', color:'#fff'}} href="tel:+393398225447">
            <Icon name="phone" size={18}/> 339 822 5447
          </a>
        </div>
      </div>
    </>
  );
}

// Sticky WhatsApp button
function WhatsAppSticky() {
  return (
    <a className="wa-sticky"
       href="https://wa.me/393398225447?text=Ciao%20Pielle%20Young%2C%20vorrei%20informazioni%20sulla%20prova%20gratuita"
       target="_blank" rel="noreferrer">
      <span className="pulse"/>
      <Icon name="wa" size={22}/>
      <span className="wa-text">Scrivici su WhatsApp</span>
    </a>
  );
}

// Lead form — inline + modal version share this
function LeadForm({ onSuccess }) {
  const [state, setState] = useState({ nome: '', cognome: '', nome_ragazzo: '', telefono: '', email: '', eta: '', categoria: 'Minibasket (5–10)', esperienza: 'Nessuna', note: '', consenso: false });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState('');

  const up = (k, v) => setState((s) => ({ ...s, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!state.nome.trim()) er.nome = 1;
    if (!state.telefono.trim() || state.telefono.length < 7) er.telefono = 1;
    if (!state.email.includes('@')) er.email = 1;
    if (!state.eta) er.eta = 1;
    if (!state.consenso) er.consenso = 1;
    setErrors(er);
    if (Object.keys(er).length) return;

    setSubmitting(true);
    setSendError('');
    const codice = 'PY-' + Math.floor(10000 + Math.random() * 90000);
    try {
      if (!window.emailjs) throw new Error('EmailJS non caricato');
      await window.emailjs.send('service_395fzke', 'template_qbfej5q', {
        nome: state.nome,
        cognome: state.cognome,
        nome_ragazzo: state.nome_ragazzo,
        telefono: state.telefono,
        email: state.email,
        eta: state.eta,
        categoria: state.categoria,
        esperienza: state.esperienza,
        note: state.note || '—',
        codice_richiesta: codice,
        data_invio: new Date().toLocaleString('it-IT'),
      });
      setState((s) => ({ ...s, _codice: codice }));
      setDone(true);
      if (onSuccess) onSuccess(state);
    } catch (err) {
      console.error('EmailJS error', err);
      setSendError('Invio non riuscito. Riprova o contattaci direttamente a info@pielleyoung.com');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="lead-success">
        <div className="icon"><Icon name="check" size={26}/></div>
        <h3>Richiesta inviata.</h3>
        <p>Grazie {state.nome}! Ti richiameremo in tempi brevi al numero {state.telefono} per maggiori informazioni.</p>
        <div className="mono" style={{fontSize:11, color:'var(--muted)', marginTop:10, letterSpacing:'.1em'}}>CODICE RICHIESTA — {state._codice || ('PY-' + Math.floor(10000 + Math.random()*90000))}</div>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="form-head">
        <div>
          <div className="mono" style={{fontSize:11, color:'var(--muted)', letterSpacing:'.12em', textTransform:'uppercase'}}>Modulo iscrizione</div>
          <div className="display" style={{marginTop:6}}>Richiedi informazioni.</div>
        </div>
      </div>

      <div className="row-2">
        <div className="field">
          <label>Nome del genitore</label>
          <input value={state.nome} onChange={(e)=>up('nome', e.target.value)} style={errors.nome?{borderColor:'#D7443A'}:undefined} placeholder="Es. Marco"/>
        </div>
        <div className="field">
          <label>Cognome</label>
          <input value={state.cognome} onChange={(e)=>up('cognome', e.target.value)} placeholder="Es. Rossi"/>
        </div>
      </div>

      <div className="row-2">
        <div className="field">
          <label>Telefono *</label>
          <input type="tel" value={state.telefono} onChange={(e)=>up('telefono', e.target.value)} style={errors.telefono?{borderColor:'#D7443A'}:undefined} placeholder="+39 ..."/>
        </div>
        <div className="field">
          <label>Email *</label>
          <input type="email" value={state.email} onChange={(e)=>up('email', e.target.value)} style={errors.email?{borderColor:'#D7443A'}:undefined} placeholder="nome@email.it"/>
        </div>
      </div>

      <div className="field">
        <label>Età del ragazzo/a *</label>
        <select value={state.eta} onChange={(e)=>up('eta', e.target.value)} style={errors.eta?{borderColor:'#D7443A'}:undefined}>
          <option value="">Seleziona…</option>
          {Array.from({length:15}).map((_,i)=>(
            <option key={i} value={5+i}>{5+i} anni</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Nome del ragazzo/a</label>
        <input value={state.nome_ragazzo} onChange={(e)=>up('nome_ragazzo', e.target.value)} placeholder="Es. Luca"/>
      </div>

      <div className="field">
        <label>Esperienza</label>
        <select value={state.esperienza} onChange={(e)=>up('esperienza', e.target.value)}>
          <option>Nessuna — prima esperienza</option>
          <option>Ha già giocato a minibasket</option>
          <option>Atleta tesserato</option>
        </select>
      </div>

      <div className="field">
        <label>Richieste o domande (facoltativo)</label>
        <textarea rows="2" value={state.note} onChange={(e)=>up('note', e.target.value)} placeholder="Es. vorremmo informazioni sugli orari"/>
      </div>

      <label className="consent">
        <input type="checkbox" checked={state.consenso} onChange={(e)=>up('consenso', e.target.checked)}/>
        <span style={errors.consenso?{color:'#D7443A'}:undefined}>Acconsento al trattamento dei dati personali ai sensi del GDPR per essere ricontattato da Pielle Young.</span>
      </label>

      {sendError && (
        <div style={{padding:'12px 14px', borderRadius:10, background:'rgba(215,68,58,.08)', border:'1px solid rgba(215,68,58,.25)', color:'#D7443A', fontSize:13}}>
          {sendError}
        </div>
      )}

      <button type="submit" className="btn btn-primary btn-lg lead-submit" disabled={submitting}>
        {submitting ? (<><span className="spinner"/> Invio in corso…</>) : (<><Icon name="ball" size={18}/> Richiedi informazioni</>)}
      </button>
      <div className="mono" style={{fontSize:10, color:'var(--muted)', letterSpacing:'.1em', textTransform:'uppercase', textAlign:'center'}}>
        Nessun costo · Nessun impegno · Risposta veloce garantita
      </div>
    </form>
  );
}

// Tweaks panel
function TweaksPanel({ values, setValues }) {
  const [available, setAvailable] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    setAvailable(true);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const persist = (patch) => {
    const next = { ...values, ...patch };
    setValues(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
  };

  if (!open) return null;

  const accents = ['royal','navy','powder'];
  const heros = ['split','center','stack'];

  return (
    <div className="tweaks open">
      <h6>Tweaks</h6>
      <div className="t-row">
        <label>Hero layout</label>
        <div className="chips">
          {heros.map((h) => (
            <button key={h} className={`chip ${values.heroVariant===h?'active':''}`} onClick={()=>persist({heroVariant:h})}>{h}</button>
          ))}
        </div>
      </div>
      <div className="t-row">
        <label>Colore accento CTA</label>
        <div className="chips">
          {accents.map((a) => (
            <button key={a} className={`chip ${values.accent===a?'active':''}`} onClick={()=>persist({accent:a})}>{a}</button>
          ))}
        </div>
      </div>
      <div className="t-row">
        <label>Hero headline</label>
        <input type="text" value={values.heroHeadline} onChange={(e)=>persist({heroHeadline:e.target.value})}/>
      </div>
      <div className="t-row t-toggle">
        <input id="court-lines" type="checkbox" checked={!!values.showCourtLines} onChange={(e)=>persist({showCourtLines:e.target.checked})}/>
        <label htmlFor="court-lines" style={{margin:0}}>Linee da campo decorative</label>
      </div>
    </div>
  );
}

Object.assign(window, { Reveal, Header, WhatsAppSticky, LeadForm, TweaksPanel });
