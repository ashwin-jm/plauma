import { useState, type ChangeEvent } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import './LandingPage.css'

const STEP_LABELS: Record<number, string> = {
  1: 'Step 1 of 4 — Your business',
  2: 'Step 2 of 4 — Your challenge',
  3: 'Step 3 of 4 — Company info',
  4: 'Step 4 of 4 — How to reach you',
  5: 'Request received',
}

const BUSINESS_OPTIONS = [
  'Manufacturing',
  'Export / Import',
  'Construction',
  'Tech',
  'Healthcare',
  'Retail',
  'NGO',
  'Other',
]

const CHALLENGE_OPTIONS = [
  'Starting a business',
  'Routine compliance',
  'Government notices',
  'Licensing',
  'Labour compliance',
  'GST & tax',
  'Contracts',
  'Full compliance mgmt',
  'Not sure',
]

export default function LandingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [business, setBusiness] = useState<string | null>(null)
  const [challenge, setChallenge] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    phone: '',
    email: '',
    employees: '',
    state: '',
  })
  const [contactMethod, setContactMethod] = useState<'call' | 'checklist' | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  return (
    <>
      <Navbar />
      <Hero />

      <section id="pain-points">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">What we take off your plate</div>
            <h2>If it involves a form, a deadline or a government office, it's ours to handle.</h2>
          </div>
          <div className="checklist">
            <div className="check-item"><span className="check-box"></span><h3>Starting a business</h3><p>Registrations, approvals and the paperwork to get you legally trading, from day one.</p></div>
            <div className="check-item"><span className="check-box"></span><h3>Routine compliance</h3><p>The recurring filings and renewals that are easy to lose track of when you're busy building.</p></div>
            <div className="check-item"><span className="check-box"></span><h3>Government notices</h3><p>Someone reads them, understands them, and responds before the deadline passes.</p></div>
            <div className="check-item"><span className="check-box"></span><h3>Licensing</h3><p>New licenses and renewals, tracked and filed before anything lapses.</p></div>
            <div className="check-item"><span className="check-box"></span><h3>Labour compliance</h3><p>PF, ESI and the employment paperwork that grows more complex as your team grows.</p></div>
            <div className="check-item"><span className="check-box"></span><h3>GST &amp; tax coordination</h3><p>Returns and reconciliations, coordinated directly with your accountant.</p></div>
            <div className="check-item"><span className="check-box"></span><h3>Contracts</h3><p>Drafted, reviewed and negotiated by a lawyer before you ever sign.</p></div>
            <div className="check-item" style={{ background: 'var(--ink)', color: 'var(--text-paper)' }}>
              <span className="check-box" style={{ borderColor: 'var(--brass)' }}></span>
              <h3 style={{ color: 'var(--text-paper)' }}>Not sure what you need?</h3>
              <p style={{ color: 'var(--slate-on-ink)' }}>Start the free health check below — we'll tell you exactly where you stand.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="process" id="process">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">How Plauma works</div>
            <h2>Four steps to a compliance file that runs itself.</h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <h3>Tell us about your business</h3>
              <p>What you do, how big you are, and what's worrying you right now.</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <h3>We staff your file</h3>
              <p>A lawyer and chartered accountant are matched to your industry and challenge.</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <h3>Free compliance health check</h3>
              <p>A straight answer on where you stand and what needs attention first.</p>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <h3>We stay on it</h3>
              <p>Ongoing filings, renewals and notices, handled without reminders from you.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="wizard-section" id="wizard">
        <div className="wrap">
          <div className="section-head" style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
            <div className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>Free compliance health check</div>
            <h2>Answer four questions. We'll tell you exactly where you stand.</h2>
          </div>

          <div className="wizard-card">
            <div className="wizard-head">
              <span id="wizard-label">{STEP_LABELS[currentStep]}</span>
              {currentStep <= 4 && (
                <div className="wizard-progress">
                  <span className={`dot ${currentStep >= 1 ? 'done' : ''}`} data-dot="1"></span>
                  <span className={`dot ${currentStep >= 2 ? 'done' : ''}`} data-dot="2"></span>
                  <span className={`dot ${currentStep >= 3 ? 'done' : ''}`} data-dot="3"></span>
                  <span className={`dot ${currentStep >= 4 ? 'done' : ''}`} data-dot="4"></span>
                </div>
              )}
            </div>
            <div className="wizard-body">

              {/* Step 1 */}
              <div className={`wizard-step ${currentStep === 1 ? 'active' : ''}`} data-step="1">
                <h3>What type of business do you run?</h3>
                <p className="hint">This helps us match you with a lawyer and CA who know your industry.</p>
                <div className="choice-grid" data-group="business">
                  {BUSINESS_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`choice ${business === opt ? 'selected' : ''}`}
                      onClick={() => setBusiness(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="wizard-nav">
                  <button type="button" className="link-btn" disabled>Back</button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    id="next1"
                    disabled={!business}
                    onClick={() => goToStep(2)}
                  >
                    Continue →
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`wizard-step ${currentStep === 2 ? 'active' : ''}`} data-step="2">
                <h3>What's your biggest challenge right now?</h3>
                <p className="hint">Pick the one that's costing you the most sleep.</p>
                <div className="choice-grid" data-group="challenge">
                  {CHALLENGE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`choice ${challenge === opt ? 'selected' : ''}`}
                      onClick={() => setChallenge(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="wizard-nav">
                  <button type="button" className="link-btn" data-back="1" onClick={() => goToStep(1)}>Back</button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    id="next2"
                    disabled={!challenge}
                    onClick={() => goToStep(3)}
                  >
                    Continue →
                  </button>
                </div>
              </div>

              {/* Step 3 */}
              <div className={`wizard-step ${currentStep === 3 ? 'active' : ''}`} data-step="3">
                <h3>A little about your company</h3>
                <p className="hint">So the right person can call you prepared, not cold.</p>
                <div className="field-grid">
                  <div className="field">
                    <label htmlFor="f-company">Company name</label>
                    <input
                      id="f-company"
                      name="company"
                      type="text"
                      placeholder="e.g. Riverstone Exports"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="f-contact">Contact person</label>
                    <input
                      id="f-contact"
                      name="contact"
                      type="text"
                      placeholder="Your name"
                      value={formData.contact}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="f-phone">Phone</label>
                    <input
                      id="f-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="f-email">Email</label>
                    <input
                      id="f-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="f-employees">No. of employees</label>
                    <input
                      id="f-employees"
                      name="employees"
                      type="text"
                      placeholder="e.g. 12"
                      value={formData.employees}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="f-state">State</label>
                    <input
                      id="f-state"
                      name="state"
                      type="text"
                      placeholder="e.g. Kerala"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="wizard-nav">
                  <button type="button" className="link-btn" data-back="2" onClick={() => goToStep(2)}>Back</button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    id="next3"
                    onClick={() => goToStep(4)}
                  >
                    Continue →
                  </button>
                </div>
              </div>

              {/* Step 4 */}
              <div className={`wizard-step ${currentStep === 4 ? 'active' : ''}`} data-step="4">
                <h3>How should we reach you?</h3>
                <p className="hint">Either way, it's free and there's no obligation.</p>
                <div className="contact-grid" data-group="contact">
                  <div
                    className={`contact-choice ${contactMethod === 'call' ? 'selected' : ''}`}
                    data-value="call"
                    onClick={() => setContactMethod('call')}
                  >
                    <h4>Call me</h4>
                    <p>A compliance advisor calls within one business day.</p>
                  </div>
                  <div
                    className={`contact-choice ${contactMethod === 'checklist' ? 'selected' : ''}`}
                    data-value="checklist"
                    onClick={() => setContactMethod('checklist')}
                  >
                    <h4>Send me a checklist</h4>
                    <p>Get a written compliance checklist by email first.</p>
                  </div>
                </div>
                <div className="wizard-nav">
                  <button type="button" className="link-btn" data-back="3" onClick={() => goToStep(3)}>Back</button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    id="submitWizard"
                    disabled={!contactMethod}
                    onClick={() => goToStep(5)}
                  >
                    Book my health check
                  </button>
                </div>
              </div>

              {/* Step 5 / Thank you */}
              <div className={`wizard-step ${currentStep === 5 ? 'active' : ''}`} data-step="5">
                <div className="thankyou">
                  <div className="stamp">
                    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="60" cy="60" r="56" stroke="#1D4ED8" strokeWidth="2.5" />
                      <circle cx="60" cy="60" r="46" stroke="#1D4ED8" strokeWidth="1.2" />
                      <path d="M42 61 L54 73 L80 47" stroke="#1D4ED8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <text x="60" y="26" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" letterSpacing="2" fill="#1D4ED8">
                        PLAUMA
                      </text>
                      <text x="60" y="102" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="7" letterSpacing="1.5" fill="#1D4ED8">
                        RECEIVED
                      </text>
                    </svg>
                  </div>
                  <h3>Request received.</h3>
                  <p id="thankyou-msg">
                    {contactMethod === 'call'
                      ? 'A compliance advisor will call you within one business day.'
                      : 'A written compliance checklist is on its way to your inbox.'}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section id="team">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Who's on your file</div>
            <h2>A dedicated lawyer and chartered accountant — not a call centre.</h2>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <div className="eyebrow">Legal counsel</div>
              <h3>Handles the law</h3>
              <p>Registrations, licenses, contracts and notices — reviewed and actioned by a lawyer who knows your file.</p>
            </div>
            <div className="team-card">
              <div className="eyebrow">Chartered accountant</div>
              <h3>Handles the numbers</h3>
              <p>GST, tax coordination and financial filings, kept accurate and on schedule.</p>
            </div>
            <div className="team-card">
              <div className="eyebrow">Compliance manager</div>
              <h3>Handles the calendar</h3>
              <p>Tracks every deadline across licensing, labour and statutory filings, so nothing lapses quietly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Stop keeping an in-house legal team on standby.</h2>
          <p>Get a free compliance health check and see exactly what Plauma would take off your plate.</p>
          <a href="#support" className="btn btn-primary">Register now</a>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="brand-name" style={{ fontFamily: 'var(--serif)', fontSize: '20px' }}>Plauma</span>
              <p>Compliance, handled.</p>
            </div>
            <div className="footer-cols">
              <div className="footer-col">
                <h4>Services</h4>
                <a href="#pain-points">Routine compliance</a>
                <a href="#pain-points">Licensing</a>
                <a href="#pain-points">Contracts</a>
              </div>
              <div className="footer-col">
                <h4>Company</h4>
                <a href="#process">How it works</a>
                <a href="#team">Who's on it</a>
              </div>
              <div className="footer-col">
                <h4>Contact</h4>
                <a href="mailto:hello@plauma.in">hello@plauma.in</a>
                <a href="#wizard">Book a health check</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Plauma. All rights reserved.</span>
            <span>Kottayam, Kerala, India</span>
          </div>
        </div>
      </footer>
    </>
  )
}
