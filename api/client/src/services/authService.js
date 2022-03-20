import Axios from "axios";

// const API_URL = "/auth";
const API_URL = "https://cmpe-lab1-273.herokuapp.com"

const signup = (email, password, firstName, lastName) => {
  return Axios
    .post(API_URL + "/register", {
      email,
      password,
      firstName,
      lastName
    })
    .then((response) => {
        console.log("THIS IS " + response.data);
        return response.data;
      }
    ).catch(error => {
        // console.log("login error", error);
        return error;
    });
}

 // Axios.post('https://cmpe-lab1-273.herokuapp.com/register', {
    //     email: email,
    //     password: password,
    //     firstName: firstName,
    //     lastName: lastName
    // }).then((response) => {
    //     console.log("THIS IS " + response.data);
    // }).catch(error => {
    //     console.log("login error", error);
    // });

const login = (email, password) => {
    // console.log("made it here");
  return Axios
    .post(API_URL + "/login", {
      email,
      password,
    })
    .then((response) => {
        console.log("THIS IS " + response.data.auth);
        console.log(response.data)
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("name", response.data.result[0].firstName + " " + response.data.result[0].lastName);
        // localStorage.setItem("token", response.data.token);
        return response.data;
    }).catch(error => {
        // console.log("login error", error);
        return error;
    });
};


  //   Axios.post('https://cmpe-lab1-273.herokuapp.com/login', {
  //     email: email,
  //     password: password
  // }).then((response) => {
  //     console.log("THIS IS " + response.data.auth);
  //     localStorage.setItem("token", response.data.token);
  // }).catch(error => {
  //     console.log("login error", error);
  // });

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("name");

  return window.location = "/";
};

const getCurrentUser = () => {
    console.log("made it here 09090")
  return localStorage.getItem("user");
};

const update_profile = (firstName, lastName) => {
    return Axios
    .post(API_URL + "/update_profile", {
        firstName,
        lastName,
    })
    .then((response) => {
        console.log("THIS IS " + response.data.auth);
        console.log(response.data)
        // localStorage.setItem("user", JSON.stringify(response.data));
        // localStorage.setItem("name", response.data.result[0].firstName + " " + response.data.result[0].lastName);
        // localStorage.setItem("token", response.data.token);
        // return response.data;
    }).catch(error => {
        // console.log("login error", error);
        return error;
    });

}

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  update_profile,
};

export default authService;