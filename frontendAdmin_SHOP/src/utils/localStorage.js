// Token LocalStorage
export const saveToken = (token) => {
  if (token) {
    localStorage.setItem("access_token", token);
  }
};

export const removeToken = () => {
  localStorage.removeItem("access_token");
};

export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("access_token");
  return token;
};

// Refresh token LocalStorage
export const saveRefreshToken = (refresh_token) => {
  if (refresh_token) {
    localStorage.setItem("refresh_token", refresh_token);
  }
};

export const removeRefreshToken = () => {
  localStorage.removeItem("refresh_token");
};

export const getRefreshTokenFromLocalStorage = () => {
  const refresh_token = localStorage.getItem("refresh_token");
  return refresh_token ? refresh_token : "";
};

// Current User LocalStorage
export const saveUser = (data_user) => {
  localStorage.setItem("data_user", JSON.stringify(data_user));
};

export const removeUser = () => {
  localStorage.removeItem("data_user");
};

export const getUserFromLocalStorage = () => {
  let data = {};
  if (localStorage.getItem("data_user")) {
    try {
      const userLocal = localStorage.getItem("data_user");
      data = JSON.parse(userLocal ? userLocal : "");
    } catch (e) {
      data = {};
    }
  }
  return data;
};

// IndexedObject
export const saveObjectLS = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
};

export const removeObjectLS = (key) => {
  localStorage.removeItem(key);
};

export const getObjectFromLS = (key) => {
  let data = {};
  if (localStorage.getItem(key)) {
    try {
      const objectLocal = localStorage.getItem(key);
      data = JSON.parse(objectLocal ? objectLocal : "");
    } catch (e) {
      data = {};
    }
  }
  return data;
};

export const getArrayFromLS = (key) => {
  let data = [];
  if (localStorage.getItem(key)) {
    try {
      const arrayLocal = localStorage.getItem(key);
      data = JSON.parse(arrayLocal ? arrayLocal : "");
    } catch (e) {
      data = [];
    }
  }
  return data;
};

// save variables to LC
export const saveVariablesLC = (variables, value) => {
  localStorage.setItem(variables, value);
};

export const getVariablesLC = (variables) => {
  const value = localStorage.getItem(variables);
  return value;
};

export const removeVariablesLC = (variables) => {
  localStorage.removeItem(variables);
};
