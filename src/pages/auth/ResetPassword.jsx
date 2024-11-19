import React, { useState } from "react";

const ResetPassword = () => {
  const [mail, setMail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Simulación del servicio de reseteo
  const mockResetPassword = (mail, token, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mail.includes("@") && token.length > 5 && password.length >= 6) {
          resolve({ message: "Tu contraseña ha sido restablecida exitosamente" });
        } else {
          reject({ message: "Los datos ingresados no son válidos. Por favor verifica la información" });
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
      const result = await mockResetPassword(mail, token, newPassword);
      setMessage(result.message);
      // Limpiar campos después de éxito
      setMail("");
      setToken("");
      setNewPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                  <i className="fas fa-key fa-2x text-warning"></i>
                </div>
                <h2 className="fs-2 fw-bold mb-2">Restablecer Contraseña</h2>
                <p className="text-muted">
                  Ingresa los datos solicitados para restablecer tu contraseña
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit}>
                {/* Campo de mail */}
                <div className="mb-4">
                  <label htmlFor="mail" className="form-label fw-medium">
                    Correo Electrónico
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fas fa-at"></i>
                    </span>
                    <input
                      type="mail"
                      className="form-control form-control-lg"
                      id="mail"
                      placeholder="nombre@ejemplo.com"
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                      required
                      autoComplete="mail"
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
                      <i className="fas fa-shield-alt"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="token"
                      placeholder="Ingresa el código recibido"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Campo de Nueva Contraseña */}
                <div className="mb-4">
                  <label htmlFor="newPassword" className="form-label fw-medium">
                    Nueva Contraseña
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-lg"
                      id="newPassword"
                      placeholder="Ingresa tu nueva contraseña"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength="6"
                    />
                    <button
                      type="button"
                      className="input-group-text bg-light"
                      onClick={togglePasswordVisibility}
                    >
                      <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                    </button>
                  </div>
                  <div className="form-text">
                    La contraseña debe tener al menos 6 caracteres
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
                      Procesando...
                    </>
                  ) : (
                    "Restablecer Contraseña"
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

export default ResetPassword;