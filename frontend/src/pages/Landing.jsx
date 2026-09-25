import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing-page">

      {/* ================= NAVBAR ================= */}
      <nav className="landing-navbar">

        <div className="landing-logo">
          <div className="landing-logo-icon">L</div>

          <div>
            <h2>LeadFlow</h2>
            <span>Smart Lead Management</span>
          </div>
        </div>

        <div className="landing-nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About</a>
          <a href="#founder">Founder</a>
        </div>

        <div className="landing-nav-buttons">
          <Link to="/login" className="nav-login">
            Login
          </Link>

          <Link to="/register" className="nav-register">
            Get Started
          </Link>
        </div>

      </nav>


      {/* ================= HERO ================= */}
      <section className="hero-section" id="home">

        <div className="hero-content">

          <div className="hero-badge">
            🚀 Smart CRM for Growing Businesses
          </div>

          <h1>
            Turn Every Lead Into
            <span> a Customer</span>
          </h1>

          <p>
            LeadFlow helps businesses capture, organize, track,
            and follow up with leads from multiple sources —
            all from one simple dashboard.
          </p>

          <div className="hero-buttons">

            <Link to="/register" className="hero-primary-button">
              Start Managing Leads →
            </Link>

            <a href="#features" className="hero-secondary-button">
              Explore Features
            </a>

          </div>

          <div className="hero-trust">
            <span>✓ Lead Management</span>
            <span>✓ Follow-up Tracking</span>
            <span>✓ Business Dashboard</span>
          </div>

        </div>


        {/* DASHBOARD PREVIEW */}
        <div className="hero-dashboard-preview">

          <div className="preview-header">

            <div>
              <span>LeadFlow Dashboard</span>
              <small>Overview</small>
            </div>

            <div className="preview-user">
              VK
            </div>

          </div>

          <div className="preview-stats">

            <div className="preview-card">
              <small>Total Leads</small>
              <strong>248</strong>
              <span>↑ 18.5%</span>
            </div>

            <div className="preview-card">
              <small>New Leads</small>
              <strong>64</strong>
              <span>↑ 12.2%</span>
            </div>

            <div className="preview-card">
              <small>Converted</small>
              <strong>42</strong>
              <span>↑ 8.4%</span>
            </div>

          </div>

          <div className="preview-table">

            <div className="preview-table-title">
              Recent Leads
            </div>

            <div className="preview-lead">
              <div className="lead-avatar">RS</div>

              <div>
                <strong>Rahul Sharma</strong>
                <small>Website</small>
              </div>

              <span className="lead-status new">
                New
              </span>
            </div>

            <div className="preview-lead">
              <div className="lead-avatar">AP</div>

              <div>
                <strong>Akash Patil</strong>
                <small>Instagram</small>
              </div>

              <span className="lead-status contacted">
                Contacted
              </span>
            </div>

            <div className="preview-lead">
              <div className="lead-avatar">NS</div>

              <div>
                <strong>Neha Sharma</strong>
                <small>Facebook</small>
              </div>

              <span className="lead-status converted">
                Converted
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section className="features-section" id="features">

        <div className="section-heading">

          <span>POWERFUL FEATURES</span>

          <h2>
            Everything You Need to
            <br />
            Manage Your Leads
          </h2>

          <p>
            LeadFlow brings your lead management process
            into one organized workspace.
          </p>

        </div>


        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon">
              📥
            </div>

            <h3>Lead Capture</h3>

            <p>
              Store leads with important details such as
              name, phone, email, source and message.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🔎
            </div>

            <h3>Search & Filter</h3>

            <p>
              Quickly find leads using search, status,
              priority and other filters.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📅
            </div>

            <h3>Follow-up Tracking</h3>

            <p>
              Never miss an important customer follow-up.
              Track today's, upcoming and overdue tasks.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>Business Dashboard</h3>

            <p>
              Understand your leads using simple statistics
              and a centralized dashboard.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🔄
            </div>

            <h3>Lead Status</h3>

            <p>
              Move leads through New, Contacted,
              Qualified, Converted and Lost stages.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🌐
            </div>

            <h3>Multiple Sources</h3>

            <p>
              Organize leads coming from Website,
              WhatsApp, Instagram, Facebook and more.
            </p>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="how-section" id="how-it-works">

        <div className="section-heading">

          <span>HOW IT WORKS</span>

          <h2>
            From Inquiry to Customer
          </h2>

          <p>
            A simple workflow for managing your complete
            lead journey.
          </p>

        </div>


        <div className="steps-container">

          <div className="step-card">

            <div className="step-number">
              01
            </div>

            <h3>Capture</h3>

            <p>
              Collect customer inquiries and create
              a lead in LeadFlow.
            </p>

          </div>


          <div className="step-line"></div>


          <div className="step-card">

            <div className="step-number">
              02
            </div>

            <h3>Organize</h3>

            <p>
              Add status, priority, notes and assign
              the lead to the right person.
            </p>

          </div>


          <div className="step-line"></div>


          <div className="step-card">

            <div className="step-number">
              03
            </div>

            <h3>Follow Up</h3>

            <p>
              Schedule follow-ups so potential customers
              don't get forgotten.
            </p>

          </div>


          <div className="step-line"></div>


          <div className="step-card">

            <div className="step-number">
              04
            </div>

            <h3>Convert</h3>

            <p>
              Track successful conversions and understand
              your business pipeline.
            </p>

          </div>

        </div>

      </section>


      {/* ================= ABOUT LEADFLOW ================= */}
      <section className="about-section" id="about">

        <div className="about-content">

          <div className="about-label">
            ABOUT LEADFLOW
          </div>

          <h2>
            Solving a Real Business Problem
          </h2>

          <p>
            Many small businesses receive customer inquiries
            from different channels such as websites, social
            media and messaging platforms.
          </p>

          <p>
            When these inquiries are managed manually through
            spreadsheets, WhatsApp messages or notebooks,
            important leads can easily be missed.
          </p>

          <p>
            LeadFlow was designed to bring these leads into
            one centralized system where businesses can
            organize, track and follow up with customers.
          </p>

          <div className="about-points">

            <div>
              ✓ Centralized lead information
            </div>

            <div>
              ✓ Organized sales pipeline
            </div>

            <div>
              ✓ Follow-up visibility
            </div>

            <div>
              ✓ Simple business analytics
            </div>

          </div>

        </div>

        <div className="about-visual">

          <div className="about-box">

            <div className="about-box-icon">
              💡
            </div>

            <h3>
              The Problem
            </h3>

            <p>
              Leads are scattered across different
              platforms and follow-ups are difficult
              to track.
            </p>

          </div>

          <div className="about-arrow">
            ↓
          </div>

          <div className="about-box solution">

            <div className="about-box-icon">
              🚀
            </div>

            <h3>
              The Solution
            </h3>

            <p>
              LeadFlow provides one organized workspace
              for the complete lead lifecycle.
            </p>

          </div>

        </div>

      </section>


      {/* ================= FOUNDER ================= */}
      <section className="founder-section" id="founder">

        <div className="founder-card">

          <div className="founder-avatar">
            VC
          </div>

          <div className="founder-content">

            <span className="founder-label">
              MEET THE FOUNDER
            </span>

            <h2>
              Built by Vaibhavi Chavan
            </h2>

            <h3>
              Full-Stack Developer & Creator of LeadFlow
            </h3>

            <p>
              I built LeadFlow as a practical full-stack
              project focused on solving a real business
              problem — managing customer leads efficiently.
            </p>

            <p>
              The project combines a React frontend,
              Node.js and Express backend, MongoDB database,
              REST APIs and cloud deployment to create
              a complete end-to-end application.
            </p>

            <div className="tech-stack">

              <span>React.js</span>
              <span>Node.js</span>
              <span>Express.js</span>
              <span>MongoDB</span>
              <span>REST API</span>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="cta-section">

        <h2>
          Ready to Take Control of Your Leads?
        </h2>

        <p>
          Start organizing your customer inquiries
          with LeadFlow today.
        </p>

        <Link
          to="/register"
          className="cta-button"
        >
          Create Your Free Account →
        </Link>

      </section>


      {/* ================= CONTACT ================= */}
      <section className="contact-section" id="contact">

        <h2>
          Let's Connect
        </h2>

        <p>
          Interested in LeadFlow or want to discuss
          the project?
        </p>

        <a
          href="mailto:vaibhavic330@gmail.com"
          className="contact-email"
        >
          vaibhavic330@gmail.com
        </a>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="landing-footer">

        <div>
          <strong>LeadFlow</strong>
          <span>
            Smart Lead Management System
          </span>
        </div>

        <p>
          © 2026 LeadFlow. Built by Vaibhavi Chavan.
        </p>

      </footer>

    </div>
  );
}

export default Landing;