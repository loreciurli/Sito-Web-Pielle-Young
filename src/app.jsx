// App entry
const { useState, useEffect } = React;

function LeadModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div
      role="dialog" aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position:'fixed', inset:0, zIndex:70, background:'rgba(14,20,48,.75)',
        backdropFilter:'blur(4px)', display:'grid', placeItems:'center', padding:20,
        animation:'fade .18s ease',
      }}
    >
      <div style={{width:'100%', maxWidth:560, maxHeight:'92vh', overflow:'auto', position:'relative'}}>
        <button
          onClick={onClose}
          aria-label="Chiudi"
          style={{position:'absolute', right:16, top:16, zIndex:2, width:40, height:40, borderRadius:'50%', background:'#fff', color:'var(--ink)', display:'grid', placeItems:'center', boxShadow:'0 4px 14px rgba(0,0,0,.2)'}}
        >
          <Icon name="x" size={18}/>
        </button>
        <LeadForm onSuccess={() => {}}/>
      </div>
    </div>
  );
}

function App() {
  const [tweaks, setTweaks] = useState(window.__TWEAKS);
  const [leadOpen, setLeadOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.accent = tweaks.accent;
  }, [tweaks.accent]);

  const openLead = () => {
    // scroll to the contact section if it exists; otherwise open modal
    const el = document.getElementById('contatti');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior:'smooth' });
    } else {
      setLeadOpen(true);
    }
  };

  return (
    <>
      <ScrollProgress/>
      <Header onOpenLead={openLead}/>
      <Hero
        headline={tweaks.heroHeadline || 'Il futuro biancoazzurro inizia da qui.'}
        variant={tweaks.heroVariant}
        showCourtLines={tweaks.showCourtLines}
        onOpenLead={openLead}
      />
      <Slate/>
      <Powered/>
      <Why/>
      <Categorie onOpenLead={openLead}/>
      <Tariffe onOpenLead={openLead}/>
      <LeadSection/>
      <LavoraConNoi/>
      <Footer/>
      <WhatsAppSticky/>
      <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)}/>
      <TweaksPanel values={tweaks} setValues={setTweaks}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
