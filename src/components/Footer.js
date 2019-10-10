import React from "react";
//import "./Footer.css";
export default class FooterSection extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="footer-div">
        <p>Made in Valais, Switzerland ?.</p>
      </div>
    );
  }
}
