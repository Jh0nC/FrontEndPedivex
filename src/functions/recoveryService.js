const API_BASE = "http://localhost:3000";

export const requestRecovery = async (mail) => {
  const response = await fetch(`${API_BASE}/requestRecovery`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mail }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al solicitar recuperación");
  }

  return await response.json();
};

export const validateRecoveryToken = async (mail, token) => {
  const response = await fetch(`${API_BASE}/validateToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mail, token }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Token inválido o expirado");
  }

  return await response.json();
};

export const resetPassword = async (mail, token, newPassword) => {
  const response = await fetch(`${API_BASE}/resetPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mail, token, newPassword }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al restablecer contraseña");
  }

  return await response.json();
};
