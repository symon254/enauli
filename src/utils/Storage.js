export const setStorageData = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getStorageData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
