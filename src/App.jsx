import { useState } from 'react'
import './App.css'

const DOWNLOAD_URL = 'https://tambolacircle.com/download/tambola-circle-app-v1.0.1.apk'

function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <a href="#home" className="nav-logo" onClick={close}>
            <img src="/img/tambola_circle.png" alt="Tambola Circle" />
            <span>Tambola Circle</span>
          </a>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#how-to-play">How to Play</a></li>
            <li><a href="#download">Download</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="btn-primary nav-cta">Download App</a>
          <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <a href="#home" onClick={close}>Home</a>
        <a href="#about" onClick={close}>About</a>
        <a href="#how-to-play" onClick={close}>How to Play</a>
        <a href="#download" onClick={close}>Download</a>
        <a href="#contact" onClick={close}>Contact</a>
        <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="btn-primary" onClick={close}>Download App</a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">🎱 India's Favourite Online Tambola</div>
            <h1>Play <span>Tambola Circle</span> with your group</h1>
            <p className="hero-desc">
              Watch numbers called live on the ticker, auto-mark your ticket, and claim
              Early 5, Top Line, Middle Line, Bottom Line or Full House — all from your phone.
              Create private rooms or join tournaments and win real prizes.
            </p>
            <div className="hero-actions">
              <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="btn-primary">
                ↓ Download Free
              </a>
              <a href="#how-to-play" className="btn-outline">How to Play</a>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-num">50K<span>+</span></div>
                <div className="stat-label">Players</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">1M<span>+</span></div>
                <div className="stat-label">Games Played</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">4.8<span>★</span></div>
                <div className="stat-label">App Rating</div>
              </div>
            </div>
          </div>
          <div className="hero-img">
            <div className="hero-glow" />
            <img src="/img/tambola_circle.png" alt="Tambola Circle App" className="hero-app-icon" />
            <img src="/img/slider/four_slider_img01.png" alt="Tambola Circle Game" className="hero-screenshot" />
          </div>
        </div>
      </div>
    </section>
  )
}

const features = [
  { img: '/img/mygames.png',    title: 'Live Number Ticker',  desc: 'Watch numbers 1–90 called live on the ticker one by one. Your ticket auto-marks every called number — no manual dabbing needed.' },
  { img: '/img/tournament.png', title: 'Tournaments',          desc: 'Join scheduled tournaments with fixed prize pools. Buy tickets, watch the ticker, and compete with players across India.' },
  { img: '/img/practice.png',   title: 'Practice with Bots',  desc: 'New to Tambola? Play free practice games with bot players. Learn prize patterns before wagering real chips.' },
  { img: '/img/chips.png',      title: 'Chips & Wallet',       desc: 'Buy chips securely, track your wallet balance, and request withdrawals anytime. All transactions recorded in real time.' },
  { img: '/img/money.png',      title: '5 Prize Categories',   desc: 'Win across Early 5, Top Line, Middle Line, Bottom Line, and Full House. Multiple prizes are claimable in every single game.' },
  { img: '/img/profile.png',    title: 'Your Profile',         desc: 'View your full game history, win stats, wallet balance, and manage KYC details for seamless, instant withdrawals.' },
]

function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="features-header">
          <span className="section-label">Why Tambola Circle</span>
          <h2 className="section-title">Everything your Tambola ticket needs,<br />built into one app</h2>
          <p className="section-sub">Live number ticker, auto-mark, instant prize claims, tournaments, and a secure chips wallet — the real Tambola experience for Indian players everywhere.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon-img">
                <img src={f.img} alt={f.title} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  { title: 'Download & Register',       desc: 'Install Tambola Circle free on Android. Register with your mobile number and get welcome chips to kick off your first game.' },
  { title: 'Join a Room or Tournament', desc: 'Browse open game rooms, create a private room for family and friends, or join a scheduled tournament with a fixed prize pool.' },
  { title: 'Buy Your Tickets',          desc: 'Buy 1 to 6 Tambola tickets per game using chips. Each ticket is a unique 3×9 grid with 15 randomly placed numbers.' },
  { title: 'Watch the Live Ticker',     desc: 'Numbers 1–90 are announced one by one on the live ticker. Your ticket is auto-marked as each number is called — no tapping needed.' },
  { title: 'Claim Your Prize!',         desc: 'Complete Early 5, Top Line, Middle Line, Bottom Line, or Full House and tap Claim instantly. Winnings are credited to your wallet right away.' },
]

function HowToPlay() {
  return (
    <section className="how-to-play" id="how-to-play">
      <div className="container">
        <div className="htp-inner">
          <div className="htp-img">
            <img src="/img/images/third_about_img.png" alt="Tambola Circle gameplay" />
          </div>
          <div className="htp-content">
            <span className="section-label">Simple & Fun</span>
            <h2 className="section-title">How to Play<br />Tambola Circle</h2>
            <p className="section-sub">Get started in minutes — live ticker, auto-mark, and one-tap prize claims make it feel exactly like the Tambola you've always loved.</p>
            <div className="steps">
              {steps.map((s, i) => (
                <div className="step" key={i}>
                  <div className="step-num">{i + 1}</div>
                  <div className="step-text">
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Download() {
  return (
    <section className="download" id="download">
      <div className="container">
        <div className="download-inner">
          <div className="download-content">
            <span className="section-label">Get the App</span>
            <h2 className="section-title">Download Tambola Circle for Free</h2>
            <p className="section-sub">Available free on Android. Install in seconds, get welcome chips on sign-up, and jump into a live game with the ticker calling numbers right away.</p>
            <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="btn-primary download-btn">
              ↓ &nbsp;Download Tambola Circle
            </a>
            <p className="download-note">Free · Android · No subscription required</p>
          </div>
          <div className="download-img">
            <img src="/img/tambola_circle.png" alt="Tambola Circle" />
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-inner">
          <div className="about-content">
            <span className="section-label">About Us</span>
            <h2 className="section-title">Tambola Circle — the game of probability, reimagined</h2>
            <p className="section-sub">
              Tambola Circle brings the beloved Indian party game to your smartphone. Live ticker calling,
              auto-marked tickets, and instant prize claims — play with family, friends, or strangers in
              open rooms and tournaments, anytime from anywhere.
            </p>
            <ul className="about-points">
              <li>Live ticker — numbers 1–90 called one by one, auto-marked on your ticket</li>
              <li>Buy 1 to 6 tickets per game for more chances to win</li>
              <li>5 prize categories: Early 5, Top Line, Middle Line, Bottom Line, Full House</li>
              <li>Private rooms for family &amp; friends, or join open public rooms</li>
              <li>Secure chips wallet with instant prize credits &amp; withdrawals</li>
              <li>Practice mode with bots &amp; scheduled tournaments with prize pools</li>
            </ul>
          </div>
          <div className="about-img">
            <img src="/img/images/inner_about_img02.png" alt="About Tambola Circle" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { name, email, message } = form
    const mailto = `mailto:shaliniex1983@gmail.com?subject=Enquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
    window.location.href = mailto
    setSent(true)
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-inner">
          <div>
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title">We'd love to hear from you</h2>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-item-text">
                  <strong>Our Location</strong>
                  <span>E204, Rishi Nagar, Rani Bagh, Delhi - 110034</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-item-text">
                  <strong>Phone</strong>
                  <span><a href="tel:+918595194005">+91 85951 94005</a></span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div className="contact-item-text">
                  <strong>Email</strong>
                  <span><a href="mailto:shaliniex1983@gmail.com">shaliniex1983@gmail.com</a></span>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <h3>Send us a message</h3>
            {sent ? (
              <div className="form-success show">✓ Thanks! Your message has been sent.</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="How can we help you?" required />
                </div>
                <button type="submit" className="btn-primary form-submit">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="nav-logo">
              <img src="/img/tambola_circle.png" alt="Tambola Circle" />
              <span>Tambola Circle</span>
            </a>
            <p>India's favourite online Tambola game. Play with family and friends anytime, anywhere.</p>
            <div className="footer-socials">
              <a href="#" className="social-link" aria-label="Twitter">𝕏</a>
              <a href="#" className="social-link" aria-label="Facebook">f</a>
              <a href="#" className="social-link" aria-label="YouTube">▶</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#how-to-play">How to Play</a></li>
              <li><a href="#download">Download</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/refund">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Tambola Circle. All rights reserved.</span>
          <span>Made with ❤️ in India</span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowToPlay />
      <Download />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
