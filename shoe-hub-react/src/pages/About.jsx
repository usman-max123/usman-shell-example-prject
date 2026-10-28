export default function About() {
  return (
    <>
      <div className="page-banner">
        <h1>ABOUT US</h1>
        <p>The story behind Shoe Hub.</p>
      </div>
      <section className="about-section">
        <div className="about-grid">
          <div className="about-text">
            <h2>WHO WE ARE</h2>
            <p>Shoe Hub is Pakistan's premier destination for premium footwear. We bring you the finest collection of shoes that blend style, comfort, and performance.</p>
            <p>Founded in 2024, our mission is to provide every customer with footwear that matches their lifestyle — whether you're hitting the track, the streets, or the office.</p>
            <h2>OUR MISSION</h2>
            <p>To deliver world-class footwear at affordable prices, with the highest standards of quality and customer service.</p>
          </div>
          <div className="about-img">
            <img src="/images/background image.jpg" alt="About Shoe Hub" />
          </div>
        </div>
        <div className="about-stats">
          <div className="stat-box"><h3>500+</h3><p>Products</p></div>
          <div className="stat-box"><h3>10K+</h3><p>Happy Customers</p></div>
          <div className="stat-box"><h3>5★</h3><p>Rated Service</p></div>
          <div className="stat-box"><h3>2+</h3><p>Years Experience</p></div>
        </div>
      </section>
    </>
  )
}
