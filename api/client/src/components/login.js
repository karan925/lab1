// import React, { Component } from "react";
// import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
// import { NavLink, useNavigate } from 'react-router-dom'
// import Axios from "axios"
// import auth1Service from "../services/auth1Service";
// import Home from '../pages/home';
// import Button from 'react-bootstrap/Button';
// import { Form } from "react-bootstrap";
// import { Navigate } from 'react-router';
// import axios from "axios";
// import jwt_decode from 'jwt-decode';
// import REG from '../mutation/loginUser'
// // import { graphql } from "graphql";
// import { graphql } from 'react-apollo';
// import LOGIN from '../queries/queries';

// class Login extends Component {
  
//   constructor(props){
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//       loginError: "",
//       authFlag: false,
//       token: "",
//       message: ""
//     };


//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(event){
//     this.setState({
//       [event.target.name]: event.target.value
//     })
//   }

//    //Call the Will Mount to set the auth Flag to false
//   componentWillMount() {
//     this.setState({
//         authFlag: false
//     })
// }

//   async handleSubmit(event) {
//     event.preventDefault();
//     console.log("made it here")
//     const {username, password } = this.state;
//     console.log(username)
//     console.log(password)
//     const data = {
//       username: this.state.username,
//       password: this.state.password
//   }
  


//     // await axios.post('http://localhost:5000/graphql/login', data).
//     //   then(response => {
//     //     console.log(response)
//     //     this.setState({
//     //         token: response.data,
//     //         authFlag: true
//     //     });
//     // })
//     // .catch(error => {
//     //   console.log(error.response)
//     //     this.setState({
//     //         message: error.response.data
//     //     })
//     // });
//     //   await auth1Service.login(email, password).then(
//     //   (response) => {
//     //     console.log("this is resposne in handle submit" + response)
//     //     if(response){
//     //     console.log("made it herePOPOP")
//     //     console.log(response);
//     //     // this.props.navigate('/home');
//     //     window.location = "/";
//     //     }
//     //   else{
//     //     console.log(response);
//     //   }},
//     //   );
//   }

//   handleReg(event){
//     event.preventDefault();
//     window.location = "/register";
//   }

//   render() {
//     let redirectVar = null;
//         if (this.state.token.length > 0) {
//             localStorage.setItem("token", this.state.token);

//             var decoded = jwt_decode(this.state.token.split(' ')[1]);
//             console.log(decoded)
//             localStorage.setItem("user_id", decoded._id);
//             localStorage.setItem("username", decoded.username);
//             localStorage.setItem("firstName", decoded.firstName);
//             localStorage.setItem("lastName", decoded.lastName);
            
//             redirectVar = window.location = "/";
//         }

//     return ( 
      
    // <div>
    //     {redirectVar}
    //     <div class="container" style={{width:"40%"}}>
    //         <br />
    //     <div>
    //         <h1>Login</h1>
    //     </div>
    //     <Form onSubmit={this.handleSubmit}>
    //     <Form.Group className="mb-3" controlId="formBasicEmail">
    //       <Form.Label>Email address</Form.Label>
    //       <Form.Control type="email" placeholder="Enter email" name="username" value={this.state.username} onChange={this.handleChange}  />
    //       <Form.Text className="text-muted">
    //         We'll never share your email with anyone else.
    //       </Form.Text>
    //     </Form.Group>

    //     <Form.Group className="mb-3" controlId="formBasicPassword">
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
    //     </Form.Group>
    //     <Button variant="primary" type="submit">
    //       Submit
    //     </Button>
    //   </Form>
    //     <br/>
    //     <Button variant="warning" onClick={this.handleReg}>
    //       Register
    //     </Button>
    //     </div>
    // </div>
//       );
//     } 
// }

// // function WithNavigate(props) {
// //   let navigate = useNavigate();
// //   return <Home {...props} navigate={navigate} />
// // }

// // export default Login;
// export default Login;

import React, { useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router'
import Axios  from 'axios';
import {useQuery, gql,  useLazyQuery} from "@apollo/client";
import {LOGIN} from '../queries/queries';
import { Link } from "react-router-dom";


function Login(){

    let navigate=useNavigate();
    const [username,setUsername] = useState(" ");
    const [password,setPassword] = useState(" ");
    const [loginStatus,setLoginStatus] = useState(" ");
    Axios.defaults.withCredentials=true;
    
    const [getUser,{data,error}]=useLazyQuery(LOGIN);

    const login_api=()=>{
        console.log(username);
        console.log(password);
        getUser({
            variables:{
                username,
                password,
            }
        })
        if(error){
            console.log("here");
            navigate('/login')
        }else if(data){
            console.log("here2");
            console.log(data);

    }
}
    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    return(
        <div>
        <div class="container" style={{width:"40%"}}>
            <br />
        <div>
            <h1>Login</h1>
        </div>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="username" onChange={(e) =>
             { setUsername(e.target.value) }}  />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={(e) =>
             { setPassword(e.target.value) }}/>
        </Form.Group>
        <Button variant="primary" type="submit"  onClick={login_api}>
          Submit
        </Button>
      </Form>
        <br/>
        <Link to="/Register">
                <Button type="submit" variant="warning" className='register_button' >Register</Button>
        </Link>
        </div>
    </div>
        
    )

}

export default Login