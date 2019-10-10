import React, { useState } from "react";
import "./App.css";
import { useAuth0 } from "./react-auth0-spa";
import request from "./utils/request";
import Loading from "./components/Loading";
import POI from "./components/POI";
import USER from "./components/USER";

export function FormInput({ type, name, placeholder, value, onChange }) {
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
      />
      <br />
    </>
  );
}

export class POIForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Empty newBook object for holding form input values
      newPOI: {
        name: "",
        description: "",
        lat: "",
        lng: "",
        image: "",
        url: ""
      }
    };
  }

  // Update newBook object on form input change
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // Merge changed form field into existing newBook object
    this.setState(prevState => ({
      // Spread existing newBook object and overwrite
      // dynamic [name] property with the new value
      newPOI: { ...prevState.newPOI, [name]: value }
    }));
  };

  // Add new book
  handlePOIAdd = event => {
    // Avoid reloading the page on form submission
    event.preventDefault();

    // Add book in the list of books
    this.props.onPOIAdd(this.state.newPOI);

    // Reset fields of the newBook object
    this.setState({
      newBook: {
        name: "",
        description: "",
        lat: "",
        lng: "",
        image: "",
        url: ""
      }
    });
  };

  render() {
    return (
      //Render a form for adding a new book
      <div>
        <h2>Add a new POI</h2>
        <form onSubmit={this.handlePOIAdd}>
          <FormInput
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.newPOI.name}
            onChange={this.handleInputChange}
          />
          <FormInput
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.newPOI.description}
            onChange={this.handleInputChange}
          />
          <FormInput
            type="number"
            name="lat"
            placeholder="Lat"
            value={this.state.newPOI.lat}
            onChange={this.handleInputChange}
          />
          <FormInput
            type="number"
            name="lng"
            placeholder="Lng"
            value={this.state.newPOI.lng}
            onChange={this.handleInputChange}
          />
          <FormInput
            type="text"
            name="image"
            placeholder="Image"
            value={this.state.newPOI.image}
            onChange={this.handleInputChange}
          />
          <FormInput
            type="text"
            name="url"
            placeholder="Cover URL"
            value={this.state.newPOI.url}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add POI</button>
          <br />
          <br />
        </form>
      </div>
    );
  }
}

function App() {
  let [pois, setPois] = useState([]);
  //let [user, setUser] = useState([]);
  let { user, loading, loginWithRedirect, getTokenSilently } = useAuth0();

  let handleAddPOIClick = async newPOI => {
    // Create book on server
    let createPOIResponse = await fetch(
      "https://backend.mapathon.ehealth.hevs.ch/POI",
      {
        method: "POST",
        body: JSON.stringify(newPOI),
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getTokenSilently}`
        }
      }
    );
    setPois([...pois, await createPOIResponse.json()]);
  };

  let handlePOIsClick = async e => {
    e.preventDefault();
    let pois = await request(
      "GET",
      `${process.env.REACT_APP_SERVER_URL}/poi`,
      getTokenSilently,
      loginWithRedirect
    );

    let user = await request(
      "GET",
      `${process.env.REACT_APP_SERVER_URL}/user`,
      getTokenSilently,
      loginWithRedirect
    );

    if (pois && pois.length > 0) {
      console.log(pois);
      console.log(user);
      setPois(pois);
    }

    if (user && user.length > 0) {
      console.log(user);
      //setUser(user);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mapathon</h1>
        <br />
        <a className="App-link" href="#" onClick={handlePOIsClick}>
          Get POIs
        </a>
        {pois && pois.length > 0 && (
          <ul className="POI-List">
            {pois.map(poi => (
              <li key={poi.id}>
                <POI {...poi} />
              </li>
            ))}
          </ul>
        )}

        <POIForm onPOIAdd={handleAddPOIClick} />
      </header>
    </div>
  );
}

export default App;
