import "./About.css";
import logo from "../assets/logo2.png";

function About() {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero text-center">
        <div className="container">
          <img
            src={logo}
            alt="Planora logo"
            className="about-logo mb-3"
          />

          <h1 className="about-title">Plan real trips. Built by real travelers.</h1>

          <p className="about-subtitle">
            Discover and share authentic travel experiences created by real people,
            not generic recommendations.
          </p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <a href="/" className="btn btn-primary px-4">
              Explore plans
            </a>

            <a
              href="https://github.com/avalenciacs/ab-project2-planora"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-secondary px-4"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="container">
        <h2 className="section-title">Why Planora?</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card why-card">
              <p className="fw-semibold">Real experiences</p>
              <p className="text-muted mb-0">
                Travel plans based on authentic experiences shared by travelers.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card why-card">
              <p className="fw-semibold">Clean UX</p>
              <p className="text-muted mb-0">
                Simple and intuitive interface focused on clarity and usability.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card why-card">
              <p className="fw-semibold">Scalable architecture</p>
              <p className="text-muted mb-0">
                Flexible data model designed to grow with new features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container">
        <h2 className="section-title">Main Features</h2>

        <div className="row g-4">
          {[
            "Search plans by city and country (accent-insensitive)",
            "Browse most voted travel plans",
            "Create, edit and delete plans",
            "Activities grouped by category",
            "Voting system to highlight popular plans",
            "Responsive and mobile-friendly interface",
          ].map((feature, i) => (
            <div className="col-md-4" key={i}>
              <div className="card feature-card text-center">
                <p className="fw-semibold mb-0">{feature}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section className="container text-center">
        <h2 className="section-title">Tech Stack</h2>

        <p className="text-muted mb-4">
          Modern frontend architecture with reusable components,
          API-driven data flow and scalable backend design.
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-2">
          {["React", "React Router", "Firebase RTDB", "Axios", "Bootstrap", "Vite"].map(
            (tech) => (
              <span key={tech} className="badge tech-badge">
                {tech}
              </span>
            )
          )}
        </div>
      </section>

      {/* TEAM */}
      <section className="container">
        <h2 className="section-title">Team</h2>

        <div className="row justify-content-center g-4">
          <div className="col-md-4">
            <div className="card team-card text-center">
              <h5>Anderson Valencia</h5>
              <p className="text-muted">
                Frontend Developer — React, UI architecture, UX
              </p>
              <div className="d-flex justify-content-center gap-3">
                <a href="https://github.com/avalenciacs" target="_blank">GitHub</a>
                <a href="https://www.linkedin.com/in/anderson-valencia-885ba1143/" target="_blank">LinkedIn</a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card team-card text-center">
              <h5>Francisco Sorkin</h5>
              <p className="text-muted">
                Fronted Developer React , Python
              </p>
              <div className="d-flex justify-content-center gap-3">
                <a href="https://github.com/fransorkin" target="_blank">GitHub</a>
                <a href="https://www.linkedin.com/in/francisco-sorkin/" target="_blank">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="container text-center text-muted mb-5">
        <p>
          Developed as part of a Full Stack Web Development bootcamp,
          showcasing real-world frontend and backend collaboration.
        </p>
      </section>

    </div>
  );
}

export default About;
