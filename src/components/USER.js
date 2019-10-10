import React from "react";
import "./POI.css";

export default function USER(props) {
  const { name, picture, email } = props;

  return (
    <div className="user">
      <h2>{name}</h2>
      <span>{email}</span>
      {picture && <img className="user-image" alt={name} src={picture} />}
    </div>
  );
}
