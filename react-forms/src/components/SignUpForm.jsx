import { useState } from "react";
import axios from "axios";

export default function SignUpForm({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  function validateInputs() {
    if (username.length < 3) {
      return "Username must be at least 3 characters long.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationMessage = validateInputs();
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }
    setValidationError(null);

    try {
      const response = await axios.post(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          username,
          password,
        }
      );
      const result = response.data;
      setToken(result.token);
      console.log(result);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      {validationError && <p>{validationError}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}
