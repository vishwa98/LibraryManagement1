import React from "react";




const Footer= () => {



    return (

        <section className="footer-section">
  <div className="container">
    <div className="footer-logo text-center">

    </div>
    <div className="row">
      <div className="col-lg-3 col-sm-6">
        <div className="footer-widget about-widget">
          <h2>About</h2>
          <p>Colombo Library </p>
          <img src="img/cards.png" alt="" />
        </div>
      </div>

      <div className="col-lg-3 col-sm-6">
        <div className="footer-widget about-widget">
          <h2>Our Mission</h2>
          <p>To be the best library in Sri lanka</p>

        </div>
      </div>

      <div className="col-lg-3 col-sm-6">
        <div className="footer-widget about-widget">
          <h2>Our Vision</h2>
          <p>Colombo Library</p>

        </div>
      </div>




      <div className="col-lg-3 col-sm-6">
        <div className="footer-widget contact-widget">
          <h2>Our Company</h2>
          <div className="con-info">
            <span>About.</span>
            <p>Colombo Library </p>
          </div>
          <div className="con-info">
            <span>Location.</span>
            <p>Colombo, Sri lanka</p>
          </div>
          <div className="con-info">
            <span>Tel.</span>
            <p>+94 77 12 34 677 </p>
          </div>
          <div className="con-info">
            <span>Email.</span>
            <p>colombolibrary@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="social-links-warp">
    <div className="container">
      <div className="social-links">
        <a className="instagram"><i className="fa fa-instagram" /><span>instagram</span></a>
        <a className="google-plus"><i className="fa fa-google-plus" /><span>g+plus</span></a>
        <a className="pinterest"><i className="fa fa-pinterest" /><span>pinterest</span></a>
        <a className="facebook"><i className="fa fa-facebook" /><span>facebook</span></a>
        <a className="twitter"><i className="fa fa-twitter" /><span>twitter</span></a>
        <a className="youtube"><i className="fa fa-youtube" /><span>youtube</span></a>
        <a className="tumblr"><i className="fa fa-tumblr-square" /><span>tumblr</span></a>
      </div>

      <p className="text-white text-center mt-5">Fashion is the life</p>

    </div>
  </div>
</section>

    );
};

export default Footer;