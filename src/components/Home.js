import React, { useState } from "react";
import "../App.css";
import request from "../utils/request";
import requestPOI from "../utils/requestPOI";
import { useAuth0 } from "../react-auth0-spa";

function App() {
  let [pois, setPois] = useState([]);
  let { loginWithRedirect, getTokenSilently } = useAuth0();
  console.log(requestPOI.getAllPOI(getTokenSilently, loginWithRedirect));
  let data = {
    name: "ABC",
    description: "Description of ABC",
    lat: 46.1234567,
    lng: 7.1234567,
    group: 0
  };
  /*setPois([
    ...pois,
    requestPOI.setPOI(data, getTokenSilently, loginWithRedirect)
  ]);*/
  console.log(requestPOI.setPOI(data, getTokenSilently, loginWithRedirect));

  return <Home />;
}

export class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="page-div">
        <p>Home Page</p>
      </div>
    );
  }
}
export default App;
