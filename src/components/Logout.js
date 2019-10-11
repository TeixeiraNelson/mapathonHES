import React from "react";
import "../App.css";
import { useAuth0 } from "../react-auth0-spa";
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
        <LogUsrOut />
      </div>
    );
  }
}

function LogUsrOut() {
  let usr = useAuth0();

  if (usr.isAuthenticated) {
    usr.logout();
  }
}
