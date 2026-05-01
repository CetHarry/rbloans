// === RB Loans Architectural — main app ===
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "obsidian"
}/*EDITMODE-END*/;

const THEMES = [
  { id: "obsidian", label: "Obsidian", sub: "Almost-black with bone & brass",  swatch: ["#0e0e0e", "#f3eee5", "#c4a47a"] },
  { id: "bone",     label: "Bone",     sub: "Inverted — warm paper, ink",      swatch: ["#f3eee5", "#1a1a1a", "#8a6a3a"] },
  { id: "onyx",     label: "Onyx",     sub: "Pure black, white type",          swatch: ["#050505", "#ffffff", "#d4b87a"] }
];

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme);
  }, [tweaks.theme]);

  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <Manifesto />
      <Services />
      <Plate />
      <Calculator />
      <Propositions />
      <Testimony />
      <Contact />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Color theme" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => setTweak('theme', t.id)}
              style={{
                display: 'grid',
                gridTemplateColumns: '76px 1fr',
                gap: 12,
                alignItems: 'center',
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid ' + (tweaks.theme === t.id ? '#111' : 'rgba(0,0,0,0.12)'),
                background: tweaks.theme === t.id ? 'rgba(0,0,0,0.04)' : '#fff',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'inherit'
              }}
            >
              <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height: 28, border: '1px solid rgba(0,0,0,0.08)' }}>
                {t.swatch.map((c, i) => (
                  <div key={i} style={{ flex: 1, background: c }}></div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{t.label}</div>
                <div style={{ fontSize: 11, color: '#666' }}>{t.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
