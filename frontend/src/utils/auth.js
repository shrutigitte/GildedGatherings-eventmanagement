export const saveToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const logout = () => {
  localStorage.removeItem("authToken");
};

export const isLoggedIn = () => {
  return !!getToken();
};
