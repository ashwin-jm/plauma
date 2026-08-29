import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <div className="eyebrow">Compliance &amp; regulatory counsel — for startups &amp; growing companies</div>
        <h1>Run the business. <em style={{ color: 'var(--brass)' }}>We'll</em> run the paperwork.</h1>
        <p className="lede">
          Plauma is your outsourced compliance team — lawyers, chartered accountants and compliance managers who track your licenses, filings and notices, so you never have to hire a legal department of your own.
        </p>
        <div className="hero-actions">
          <a href="#support" className="btn btn-primary">Register now</a>
          <a href="#process" className="btn btn-ghost" style={{ color: 'var(--text-ink)', borderColor: 'var(--ink-line)' }}>See how it works →</a>
        </div>
        <div className="tag-row">
          <span className="tag">Manufacturing</span>
          <span className="tag">Export / Import</span>
          <span className="tag">Construction</span>
          <span className="tag">Tech</span>
          <span className="tag">Healthcare</span>
          <span className="tag">Retail</span>
          <span className="tag">NGO</span>
          <span className="tag">+ more</span>
        </div>
      </div>
    </section>
  )
}
