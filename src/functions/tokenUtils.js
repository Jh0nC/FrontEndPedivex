import jwtDecode from 'jwt-decode';

export const getToken = () => localStorage.getItem('token');

export const getTokenData = () => {
  const token = getToken();
  if (token) {
    return jwtDecode(token);
  }
  return null;
};

export const isTokenExpired = (token) => {
  const { exp } = jwtDecode(token);
  return Date.now() >= exp * 1000;
};