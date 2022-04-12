import http from "./httpService";
// import * as apiUrl from "../config.json";
import apiUrl1 from  "../config.json";
import apiUrl from "../config.json";
import axios from "axios";

const apiEndpoint = apiUrl1.apiUrl1 + "/user";

const apiEndpoint1 = apiUrl.apiUrl + "/user";

export function register(user) {
    console.log(apiUrl1.apiUrl1)
    console.log(apiEndpoint);
    console.log(user.email)
  return http.post(apiEndpoint + "/register", {
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName
  });
}



