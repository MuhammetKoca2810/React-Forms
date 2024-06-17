import React, { useState } from "react";
import axios from "axios";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    if (!token) {
      setError("Please sign up first to get a token.");
      return;
    }
    try {
      const response = await axios.get(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = response.data;
      setSuccessMessage(result.message);
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null);
    }
  }

  return (
    <div>
      <h2>Authenticate!</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}
