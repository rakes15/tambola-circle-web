import { useState } from 'react'
import './App.css'

const DOWNLOAD_URL = 'https://tambolacircle.com/download/tambola-circle-app-v1.0.0.apk'

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
              The classic game of numbers — no maths required, just quick fingers!
              Create private rooms, invite friends, and experience real Tambola joy on your phone.
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
  { img: '/img/mygames.png',    title: 'My Games',       desc: 'See all your active and completed games in one place. Track wins and progress easily.' },
  { img: '/img/tournament.png', title: 'Tournaments',     desc: 'Join scheduled tournaments with exciting prizes. Compete with players from across India.' },
  { img: '/img/practice.png',   title: 'Practice Mode',   desc: 'New to Tambola? Practice for free with bots before playing with real stakes.' },
  { img: '/img/chips.png',      title: 'Chips & Balance', desc: 'Buy chips, manage your wallet, and add money securely to play and win.' },
  { img: '/img/money.png',      title: 'Win Real Prizes',  desc: 'Play with chips or real money. Multiple prize categories — First Row, Second Row, Full House.' },
  { img: '/img/profile.png',    title: 'Your Profile',     desc: 'Manage your profile, view stats, and track your winning history.' },
]

function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="features-header">
          <span className="section-label">Why Tambola Circle</span>
          <h2 className="section-title">Everything you love about Tambola,<br />now in your pocket</h2>
          <p className="section-sub">Built for Indian families and friend groups who want the real Tambola experience — anytime, anywhere.</p>
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
  { title: 'Download Tambola Circle', desc: 'Get Tambola Circle free on your Android device — tap the download button and install in seconds.' },
  { title: 'Create or Join a Room',   desc: 'Start a private game with friends or join a public tournament with one tap.' },
  { title: 'Buy Your Tickets',        desc: 'Purchase Tambola tickets using in-app chips. Each ticket is unique and auto-generated.' },
  { title: 'Numbers Are Called',      desc: 'Sit back while numbers are called automatically. The app marks your ticket for you.' },
  { title: 'Claim & Win!',            desc: 'Tap Claim when you complete a row, two rows, or full house. Prizes credited instantly.' },
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
            <p className="section-sub">Get started in minutes — Tambola Circle is designed to feel exactly like the game you've always loved.</p>
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
            <p className="section-sub">Available on Android. Install in seconds and start playing with your group right away — no registration hassle.</p>
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
              Tambola Circle brings the beloved Indian party game to your smartphone. Whether it's Diwali, a family reunion,
              or just a lazy Sunday — gather your group and play Tambola just like the old days, from anywhere.
            </p>
            <ul className="about-points">
              <li>Fully online — play from anywhere in India</li>
              <li>Private rooms for family &amp; friends</li>
              <li>Fair, transparent number calling</li>
              <li>Secure payments &amp; instant prize credits</li>
              <li>24/7 customer support</li>
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
    const mailto = `mailto:support@tambolacircle.com?subject=Enquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
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
                  <span><a href="mailto:support@tambolacircle.com">support@tambolacircle.com</a></span>
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
