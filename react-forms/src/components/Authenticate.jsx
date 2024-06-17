import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (successMessage) {
      fetchUserData();
    }
  }, [successMessage]);

  async function fetchUserData() {
    try {
      const response = await axios.get(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = response.data;
      setUserData(userData);
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleClick() {
    if (!token) {
      setError("Sorry, you are not an authenticated user.");
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
      {successMessage && (
        <div>
          <p>{successMessage}</p>
          {userData && <p>Welcome, {userData.data.username}!</p>}
        </div>
      )}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}
