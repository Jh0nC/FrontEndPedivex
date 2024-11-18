import React, { useState } from "react";
import { validateRecoveryToken } from "../../functions/recoveryService";

const ValidateToken = () => {
  const [mail, setMail] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const result = await validateRecoveryToken(mail, token);
      setMessage(result.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Validar Token</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingrese su correo"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ingrese el token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
        <button type="submit">Validar</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ValidateToken;
