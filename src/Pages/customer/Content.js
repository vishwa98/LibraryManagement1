import React from "react";
import Footer from "../../Component/Navigation/Footer";

const Content = (props) => (
  <div>
    <div>{props.children}</div>

    <Footer/>
  </div>
);

export default Content;
