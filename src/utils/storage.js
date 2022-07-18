const STORAGE_KEY = 'LOGIN';
export const storage = {
  get() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  },
  set(data) {
    return localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
};
