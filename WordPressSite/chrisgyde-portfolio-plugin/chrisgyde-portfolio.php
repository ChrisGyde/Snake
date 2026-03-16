<?php
/**
 * Plugin Name: ChrisGyde Portfolio
 * Description: Adds a shortcode to display the ChrisGyde portfolio landing section.
 * Version: 1.0.0
 * Author: Chris Gyde
 */

if (!defined('ABSPATH')) {
  exit;
}

function chrisgyde_portfolio_assets() {
  $base = plugin_dir_url(__FILE__);
  wp_register_style(
    'chrisgyde-portfolio',
    $base . 'assets/styles.css',
    array(),
    '1.0.0'
  );
  wp_register_script(
    'chrisgyde-portfolio',
    $base . 'assets/script.js',
    array(),
    '1.0.0',
    true
  );
}
add_action('wp_enqueue_scripts', 'chrisgyde_portfolio_assets');

function chrisgyde_portfolio_shortcode() {
  wp_enqueue_style('chrisgyde-portfolio');
  wp_enqueue_script('chrisgyde-portfolio');

  ob_start();
  ?>
  <div class="cg-portfolio">
    <div class="cg-bg">
      <div class="cg-orb cg-orb-1" aria-hidden="true"></div>
      <div class="cg-orb cg-orb-2" aria-hidden="true"></div>
      <div class="cg-grid" aria-hidden="true"></div>
    </div>

    <header class="cg-header">
      <div class="cg-logo">chrisgyde</div>
      <nav class="cg-nav">
        <a href="#cg-about">About</a>
        <a href="#cg-work">Expertise</a>
        <a href="#cg-contact">Contact</a>
      </nav>
      <a class="cg-cta" href="#cg-contact">Let’s Talk</a>
    </header>

    <main>
      <section class="cg-hero">
        <p class="cg-eyebrow">Digital Marketing Expert</p>
        <h1>Growth systems that turn attention into revenue.</h1>
        <p class="cg-lead">
          I build full‑funnel marketing programs across SEO, paid media, content, and analytics—designed to scale, measure, and improve.
        </p>
        <div class="cg-hero-actions">
          <a class="cg-primary" href="#cg-work">View Expertise</a>
          <a class="cg-secondary" href="#cg-about">About Me</a>
        </div>
        <div class="cg-stats">
          <div>
            <span class="cg-stat-number">+12</span>
            <span class="cg-stat-label">Campaigns launched</span>
          </div>
          <div>
            <span class="cg-stat-number">4x</span>
            <span class="cg-stat-label">Average ROAS lift</span>
          </div>
          <div>
            <span class="cg-stat-number">8</span>
            <span class="cg-stat-label">Growth channels</span>
          </div>
        </div>
      </section>

      <section id="cg-about" class="cg-section cg-about">
        <div class="cg-section-title">
          <p class="cg-eyebrow">About</p>
          <h2>Strategic, measurable, and hands‑on.</h2>
        </div>
        <p>
          I’m Chris Gyde, a digital marketing expert focused on helping brands grow with performance‑driven strategies. I partner with teams to clarify positioning, build acquisition systems, and optimize conversion across the customer journey.
        </p>
        <div class="cg-about-grid">
          <div class="cg-card">
            <h3>Strategy</h3>
            <p>Positioning, go‑to‑market, and channel prioritization built on real customer data.</p>
          </div>
          <div class="cg-card">
            <h3>Execution</h3>
            <p>SEO, content, paid media, and lifecycle programs designed for speed and iteration.</p>
          </div>
          <div class="cg-card">
            <h3>Analytics</h3>
            <p>Tracking, dashboards, and experimentation frameworks that prove what works.</p>
          </div>
        </div>
      </section>

      <section id="cg-work" class="cg-section cg-work">
        <div class="cg-section-title">
          <p class="cg-eyebrow">Expertise</p>
          <h2>Full‑funnel growth, end to end.</h2>
        </div>
        <div class="cg-work-grid">
          <div class="cg-card">
            <h3>SEO & Content Systems</h3>
            <p>Technical audits, editorial strategy, and content pipelines that build compounding traffic.</p>
          </div>
          <div class="cg-card">
            <h3>Paid Acquisition</h3>
            <p>High‑intent campaigns across search and social, tuned for CAC and scale.</p>
          </div>
          <div class="cg-card">
            <h3>Conversion Optimization</h3>
            <p>Landing pages, offers, and A/B tests that turn clicks into customers.</p>
          </div>
          <div class="cg-card">
            <h3>Lifecycle & Retention</h3>
            <p>Email, automation, and personalization that keep customers engaged.</p>
          </div>
        </div>
      </section>

      <section id="cg-contact" class="cg-section cg-contact">
        <div class="cg-section-title">
          <p class="cg-eyebrow">Contact</p>
          <h2>Let’s build your next growth system.</h2>
        </div>
        <div class="cg-contact-grid">
          <div class="cg-card">
            <h3>Get in touch</h3>
            <p>Share your goals and we’ll map a clear path to measurable growth.</p>
            <ul class="cg-contact-list">
              <li><span>Email</span> hello@chrisgyde.com</li>
              <li><span>Phone</span> (415) 555‑0198</li>
              <li><span>Location</span> San Francisco, CA</li>
            </ul>
          </div>
          <form class="cg-contact-form" aria-label="Contact form">
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="you@email.com" />
            </label>
            <label>
              Project details
              <textarea name="message" rows="4" placeholder="Tell me about your project"></textarea>
            </label>
            <button type="button">Send message</button>
            <p class="cg-form-note">This is a demo form — replace with your preferred form provider.</p>
          </form>
        </div>
      </section>
    </main>

    <footer class="cg-footer">
      <p>© <span id="cg-year"></span> chrisgyde. All rights reserved.</p>
    </footer>
  </div>
  <?php
  return ob_get_clean();
}
add_shortcode('chrisgyde_portfolio', 'chrisgyde_portfolio_shortcode');
