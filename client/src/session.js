export const set = token => window.localStorage.setItem("jwt", token);
export const get = () => window.localStorage.getItem("jwt");
