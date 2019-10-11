import React from "react";
import "../App.css";
export default class Logout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="page-div">
        <p>Logged out</p>
      </div>
    );
  }
}
