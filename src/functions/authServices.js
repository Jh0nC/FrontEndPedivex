const login = async (mail, password) => {
  try {
    const response = await fetch('https://pedivexapi.onrender.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail, password }),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        return { success: true };
      }
      return { success: false, message: 'Credenciales incorrectas' };
    } else {
      throw new Error('Error en el servidor');
    }
  } catch (error) {
    return { success: false, message: error.message || 'Error en el servidor' };
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export default {
  isAuthenticated
}