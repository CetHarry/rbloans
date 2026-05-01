// === RB Loans Architectural — sections ===
const { useState, useEffect, useMemo } = React;

// ---------- NAV ----------
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={"nav " + (scrolled ? "scrolled" : "")}>
      <div className="shell nav-inner">
        <a href="#" className="brand">
          <span className="mono">R B&nbsp;·&nbsp;L O A N S</span>
          <span className="small">Property Finance Advisory</span>
        </a>
        <div className="nav-links">
          <a href="#approach">Approach</a>
          <a href="#services">Services</a>
          <a href="#calculator">Calculator</a>
          <a href="#journal">Blog</a>
          <a href="#contact" className="nav-cta">Make an enquiry</a>
        </div>
      </div>
    </nav>
  );
}

// ---------- HERO ----------
function CountUp({ to, suffix = "", duration = 1800, delay = 800 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf, start;
    const t = setTimeout(() => {
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(eased * to);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [to, duration, delay]);
  const display = to >= 100 ? Math.round(val) : val.toFixed(to % 1 ? 1 : 0);
  return <>{display}<em>{suffix}</em></>;
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true"></div>
      <div className="hero-inner">
        <div className="shell">
          <div className="hero-meta">
            <span className="line"></span>
            <span className="caps">Sydney&nbsp;&nbsp;·&nbsp;&nbsp;Property finance&nbsp;&nbsp;·&nbsp;&nbsp;Est. 2014</span>
          </div>
          <div className="hero-grid">
            <h1 className="hero-title">
              <span className="reveal"><span>Quiet</span></span>
              <span className="reveal"><span><i className="it">expertise</i></span></span>
              <span className="reveal"><span>in finance.</span></span>
            </h1>
            <div className="hero-side">
              <p>
                A discreet mortgage advisory for first‑home buyers and property
                investors. We negotiate terms across more than forty lenders —
                privately, patiently, and on your behalf.
              </p>
              <a href="#contact" className="hero-cta">
                Begin a conversation
                <span className="arrow"></span>
              </a>
            </div>
          </div>
          <div className="hero-foot">
            <div className="hf-cell">
              <span className="num"><CountUp to={40} suffix="+" delay={800} /></span>
              <div className="lab">Lenders on panel</div>
            </div>
            <div className="hf-cell">
              <span className="num"><CountUp to={1.2} suffix="B" delay={950} /></span>
              <div className="lab">Loans settled</div>
            </div>
            <div className="hf-cell">
              <span className="num"><CountUp to={12} suffix="yr" delay={1100} /></span>
              <div className="lab">Established</div>
            </div>
            <div className="hf-cell">
              <span className="num"><CountUp to={98} suffix="%" delay={1250} /></span>
              <div className="lab">Approval rate</div>
            </div>
          </div>
          <LenderTicker />
        </div>
      </div>
    </section>
  );
}

// ---------- LENDER TICKER ----------
const LENDERS = [
  "Commonwealth", "Westpac", "ANZ", "NAB", "Macquarie", "ING", "Bankwest",
  "St.George", "Suncorp", "Bank of Melbourne", "BankSA", "BOQ",
  "Pepper Money", "Resimac", "Bluestone", "Liberty", "AMP", "HSBC",
  "Heritage", "Auswide", "Adelaide Bank", "Bendigo", "Citibank",
  "Bank of China", "Beyond Bank", "Deposit Power", "HomeStart",
  "Keystart", "La Trobe", "ME Bank", "MKM Capital", "P&N Bank",
  "The Rock", "Thinktank", "Wide Bay"
];
function LenderTicker() {
  return (
    <div className="ticker-wrap">
      <div className="ticker-label">A selection of our 40+ lenders on panel</div>
      <div className="ticker">
        <div className="ticker-track">
          {[...LENDERS, ...LENDERS].map((l, i) => (
            <span key={i} className="ticker-item">{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- MANIFESTO ----------
function Manifesto() {
  return (
    <section className="manifesto">
      <div className="manifesto-marks"><span></span></div>
      <div className="shell">
        <p className="manifesto-text">
          Property is the largest decision most of us will make.
          <br/>
          We treat it that way — <span className="it">with care, with patience,</span>
          and without rush.
        </p>
      </div>
    </section>
  );
}

// ---------- SERVICES ----------
const SERVICES = [
  { num: "I", name: <>First‑home <i className="it">buyers</i></>, desc: "Grants, schemes and lender quirks translated. We move you from saving to settling without surprise." },
  { num: "II", name: <>Property <i className="it">investors</i></>, desc: "Equity release, multi‑property servicing, lender mix — modelled scenarios so your portfolio scales considered, not constrained." },
  { num: "III", name: <>Refinance &amp; <i className="it">review</i></>, desc: "An annual rate review, on us. If we can secure better terms — same lender or another — we handle the switch." },
  { num: "IV", name: <>Self‑employed <i className="it">finance</i></>, desc: "Alternative documentation, lenders that look at the full picture. We know which banks say yes when the PAYG box doesn't tick." },
  { num: "V", name: <>Construction &amp; <i className="it">land</i></>, desc: "Drawdowns, valuations and progress payments coordinated end‑to‑end. We hold the timeline so you can hold the keys." }
];

function Services() {
  return (
    <section className="section" id="services">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-num">— 01</div>
            <h2 className="section-title">Services</h2>
          </div>
          <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.75, margin: 0, maxWidth: '52ch' }}>
            Five disciplines, one practitioner. Whether you're entering the market for the first time or
            structuring an investment portfolio across borders, the work is patient, careful, and
            entirely your own.
          </p>
        </div>

        <div className="services">
          {SERVICES.map((s, i) => (
            <div className="svc" key={i}>
              <div className="svc-num">{s.num}</div>
              <h3 className="svc-name">{s.name}</h3>
              <p className="svc-desc">{s.desc}</p>
              <div className="svc-cta">Learn more →</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- PLATE / MEET RANDA ----------
function Plate() {
  return (
    <section className="plate" id="approach">
      <div className="plate-img" aria-hidden="true">
        <div className="portrait-frame">
          <div className="portrait-img"></div>
          <div className="portrait-cap">
            <span className="cap-line"></span>
            <span>Randa B. — Principal Broker</span>
          </div>
        </div>
      </div>
      <div className="plate-text">
        <div className="section-num">— 02 / Meet Randa</div>
        <h2>An advisory that <span className="it">listens</span> first.</h2>
        <p className="randa-lede">
          <span className="it-serif">Randa</span> founded RB Loans in 2014 after a decade
          inside the major banks — long enough to see how impersonal home finance had
          become, and to know it could be done differently.
        </p>
        <p>
          Most brokers begin with the loan. Randa begins with the life around it —
          the property you're buying, the family you're building, the portfolio
          you're growing toward. Finance is the instrument; the music belongs to you.
        </p>
        <p>
          You'll work directly with her from the first conversation through to
          settlement, and through every annual review that follows. No call centres.
          No hand‑offs. One practitioner, the entire way.
        </p>

        <div className="randa-creds">
          <div className="cred">
            <div className="cred-k">Credentials</div>
            <div className="cred-v">Cert IV Finance &amp; Mortgage Broking · Diploma FMBM · MFAA member</div>
          </div>
          <div className="cred">
            <div className="cred-k">Languages</div>
            <div className="cred-v">English · Arabic</div>
          </div>
          <div className="cred">
            <div className="cred-k">Specialty</div>
            <div className="cred-v">First‑home buyers · Investors · Self‑employed finance</div>
          </div>
        </div>

        <a href="#contact" className="hero-cta plate-link">
          Begin a conversation with Randa
          <span className="arrow"></span>
        </a>
      </div>
    </section>
  );
}

// ---------- CALCULATOR ----------
function Calculator() {
  const [amount, setAmount] = useState(900000);
  const [rate, setRate] = useState(5.85);
  const [term, setTerm] = useState(30);

  const monthly = useMemo(() => {
    const r = rate / 100 / 12;
    const n = term * 12;
    if (r === 0) return amount / n;
    return (amount * r) / (1 - Math.pow(1 + r, -n));
  }, [amount, rate, term]);

  const total = monthly * term * 12;
  const interest = total - amount;
  const fmt = (n) => new Intl.NumberFormat('en-AU', { maximumFractionDigits: 0 }).format(n);

  return (
    <section className="calc" id="calculator">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-num">— 03</div>
            <h2 className="section-title">An <span className="it">indicative</span> repayment.</h2>
          </div>
          <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.75, margin: 0, maxWidth: '50ch' }}>
            A starting figure for principal &amp; interest. The real work begins when we
            model lender scenarios for your specific situation.
          </p>
        </div>

        <div className="calc-card">
          <div className="calc-fields">
            <div>
              <div className="field-row">
                <span className="name">Loan amount</span>
                <span className="value"><em>A$</em>{fmt(amount)}</span>
              </div>
              <input className="slider" type="range" min="200000" max="3000000" step="10000" value={amount} onChange={e => setAmount(+e.target.value)} />
              <div className="tics"><span>$200K</span><span>$1.5M</span><span>$3M</span></div>
            </div>
            <div>
              <div className="field-row">
                <span className="name">Interest rate</span>
                <span className="value">{rate.toFixed(2)}<em>%</em></span>
              </div>
              <input className="slider" type="range" min="3" max="9" step="0.05" value={rate} onChange={e => setRate(+e.target.value)} />
              <div className="tics"><span>3.00</span><span>6.00</span><span>9.00</span></div>
            </div>
            <div>
              <div className="field-row">
                <span className="name">Term</span>
                <span className="value">{term}<em>yrs</em></span>
              </div>
              <input className="slider" type="range" min="5" max="30" step="1" value={term} onChange={e => setTerm(+e.target.value)} />
              <div className="tics"><span>5</span><span>20</span><span>30</span></div>
            </div>
          </div>

          <div className="calc-result">
            <div>
              <div className="eb">Estimated repayment</div>
              <div className="calc-amt">
                <span className="ccy">A$</span>{fmt(monthly)}<span className="per">/ month</span>
              </div>
              <div className="calc-meta">
                <div><div className="k">Total repaid</div><div className="v">${fmt(total)}</div></div>
                <div><div className="k">Total interest</div><div className="v">${fmt(interest)}</div></div>
                <div><div className="k">Fortnightly</div><div className="v">${fmt(monthly*12/26)}</div></div>
                <div><div className="k">Weekly</div><div className="v">${fmt(monthly*12/52)}</div></div>
              </div>
            </div>
            <a href="#contact" className="hero-cta calc-cta">Request a tailored quote <span className="arrow"></span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- PROPS ----------
const PROPS = [
  { num: "I", h: <>Forty <span className="it">lenders</span></>, p: "We negotiate across the full panel — major banks, second‑tier, specialist and non‑bank — to find terms that fit." },
  { num: "II", h: <>One <span className="it">practitioner</span></>, p: "You work directly with Randa from first call to settlement and beyond. No queues. No transfers. No introductions repeated." },
  { num: "III", h: <>Annual <span className="it">reviews</span></>, p: "A no‑cost rate review every year for the life of the loan. If terms have improved, we move you. Quietly." },
  { num: "IV", h: <>Strategy, <span className="it">not sales</span></>, p: "We model three to five scenarios across our panel and walk through trade‑offs honestly. No pressure. No urgency." },
  { num: "V", h: <>Investor <span className="it">structuring</span></>, p: "Equity release, multi‑property servicing, lender mix — strategy designed to scale alongside your portfolio." },
  { num: "VI", h: <>Discreet <span className="it">advice</span></>, p: "Conversations stay between us. Commissions disclosed up front. No surprises, no fine print, no slipped clauses." }
];

function Propositions() {
  return (
    <section className="section">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-num">— 04</div>
            <h2 className="section-title">Why <span className="it">RB Loans</span></h2>
          </div>
          <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.75, margin: 0, maxWidth: '52ch' }}>
            A boutique by design. Every relationship begins, continues and ends with the same person —
            because finance is too consequential for a queue.
          </p>
        </div>
        <div className="props">
          {PROPS.map((p, i) => (
            <div className="prop" key={i}>
              <div className="prop-num">— {p.num}</div>
              <h4>{p.h}</h4>
              <p>{p.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- TESTIMONY ----------
function Testimony() {
  return (
    <section className="testimony">
      <div className="shell">
        <blockquote>
          They got us into our first home when three other brokers said it
          wasn't possible.
        </blockquote>
        <cite>
          <span className="name">Aisha &amp; Marcus K.</span>
          First‑home buyers · Sydney
        </cite>
      </div>
    </section>
  );
}

// ---------- CONTACT ----------
function Contact() {
  return (
    <section className="contact-band" id="contact">
      <div className="shell">
        <div className="section-num">— 05</div>
        <div className="contact-grid">
          <h2>
            Begin with a<br/>
            <span className="it">conversation.</span>
          </h2>
          <div className="contact-info">
            <div className="row">
              <div className="k">By phone</div>
              <div>+61 2 9000 0000<br/>Mon–Fri, 9:00–18:00 AEST</div>
            </div>
            <div className="row">
              <div className="k">By email</div>
              <div>hello@rbloans.com.au</div>
            </div>
            <div className="row">
              <div className="k">In person</div>
              <div>Suite 401, 123 King Street<br/>Sydney NSW 2000</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- FOOTER ----------
function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-row">
        <a href="#" className="brand">
          <span className="mono">R B&nbsp;·&nbsp;L O A N S</span>
        </a>
        <div className="footer-social">
          <a href="https://instagram.com/" aria-label="Instagram" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="3" y="3" width="18" height="18" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="https://facebook.com/" aria-label="Facebook" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M14 8h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3h2.5v6H14v-6h2.5l.5-3H14V8.5A.5.5 0 0 1 14.5 8H14z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/" aria-label="LinkedIn" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>
            </svg>
          </a>
          <a href="mailto:hello@rbloans.com.au" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="3" y="5" width="18" height="14" rx="2"/>
              <path d="M3 7l9 6 9-6"/>
            </svg>
          </a>
        </div>
        <div className="footer-meta">
          <span>© 2026 RB Loans Pty Ltd</span>
          <span>ACL 000000</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Nav, Hero, Manifesto, Services, Plate, Calculator, Propositions, Testimony, Contact, Footer
});
