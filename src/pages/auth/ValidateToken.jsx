import React, { useState } from "react";

const ValidateToken = () => {
  const [mail, setMail] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulación del servicio de validación
  const mockValidateToken = (email, token) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.includes("@") && token.length > 5) {
          resolve({ message: "Token validado correctamente. Puedes proceder a cambiar tu contraseña." });
        } else {
          reject({ message: "Token inválido o expirado. Por favor solicita uno nuevo." });
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
      const result = await mockValidateToken(mail, token);
      setMessage(result.message);
      // Limpiar campos después de éxito
      setMail("");
      setToken("");
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
                  <i className="fas fa-shield-alt fa-2x text-warning"></i>
                </div>
                <h2 className="fs-2 fw-bold mb-2">Validar Código</h2>
                <p className="text-muted">
                  Ingresa tu correo y el código de verificación recibido
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit}>
                {/* Campo de Email */}
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

                {/* Campo de Token */}
                <div className="mb-4">
                  <label htmlFor="token" className="form-label fw-medium">
                    Código de Verificación
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fas fa-key"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="token"
                      placeholder="Ingresa el código recibido por correo"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-text">
                    El código fue enviado a tu dirección de correo electrónico
                  </div>
                </div>

                {/* Botón de Submit */}
                <button
                  type="submit"
                  className="btn btn-warning btn-lg w-100 mb-4"
                  style={{ backgroundColor: "#fcb900", borderColor: "#fcb900" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Validando...
                    </>
                  ) : (
                    "Validar Código"
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

                {/* Link para solicitar nuevo código */}
                {error && (
                  <div className="text-center mt-3">
                    <button 
                      type="button" 
                      className="btn btn-link text-warning text-decoration-none"
                      onClick={() => {
                        // Aquí iría la lógica para solicitar nuevo código
                        alert("Función para solicitar nuevo código");
                      }}
                    >
                      <i className="fas fa-redo-alt me-2"></i>
                      Solicitar nuevo código
                    </button>
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

export default ValidateToken;