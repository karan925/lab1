// const loggedIn = true;
// const user = true;
// const admin = true;

// export { loggedIn, user, admin };

import http from "./httpService";
import jwtDecode from "jwt-decode";
import apiUrl from "../config.json";
import apiUrl1 from  "../config.json";
import axios from "axios";

const apiEndpoint = apiUrl.apiUrl + "/auth";

const apiEndpoint1 = apiUrl1.apiUrl1 + "/auth";

const tokenKey = "token";


http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint1, { email, password });
  if(jwt){
    localStorage.setItem(tokenKey, jwt);
    return {response: true}
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  //actual code
  try {
    const jwt = localStorage.getItem(tokenKey);
    console.log("JWT: ", jwtDecode(jwt));
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const auth1Service = {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt
  };
  
  export default auth1Service;
