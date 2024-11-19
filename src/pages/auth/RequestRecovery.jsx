import React, { useState } from "react";

const RequestRecovery = () => {
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mockRequestRecovery = (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.includes("@")) {
          resolve({ message: "Se han enviado las instrucciones a tu correo electrónico" });
        } else {
          reject({ message: "Por favor, ingresa un correo electrónico válido" });
        }
      }, 1000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      const result = await mockRequestRecovery(mail);
      setMessage(result.message);
      setMail("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-4 p-md-5">
              {/* Header con ícono */}
              <div className="text-center mb-4">
                <div className="bg-warning bg-opacity-25 rounded-circle d-inline-flex p-3 mb-3">
                  <i className="fas fa-envelope fa-2x text-warning"></i>
                </div>
                <h2 className="fs-2 fw-bold mb-2">Recuperar Contraseña</h2>
                <p className="text-muted">
                  Ingresa tu correo electrónico y te enviaremos las instrucciones
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-medium">
                    Correo Electrónico
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fas fa-at"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      placeholder="nombre@ejemplo.com"
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                      required
                      autoComplete="email"
                      autoFocus
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning btn-lg w-100 mb-4"
                  style={{ backgroundColor: "#fcb900", borderColor: "#fcb900" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Enviando...
                    </>
                  ) : (
                    "Enviar instrucciones"
                  )}
                </button>

                {/* Mensajes de estado */}
                {message && (
                  <div className="alert alert-success d-flex align-items-center" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    <div>{message}</div>
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    <div>{error}</div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestRecovery;