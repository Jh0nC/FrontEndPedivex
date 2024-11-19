import React, { useState } from "react";
import { requestRecovery } from "../../functions/recoveryService";

const RequestRecovery = () => {
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const result = await requestRecovery(mail);
      setMessage(result.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Solicitar Recuperación</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingrese su correo"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RequestRecovery;
