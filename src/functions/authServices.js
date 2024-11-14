export const login = async (email, password) => {
  try {
    const response = await fetch('http://tu-api.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
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

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};