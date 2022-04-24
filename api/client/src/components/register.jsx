import React, { Component } from "react";
import { Redirect } from "react-router";
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
import { NavLink, useNavigate } from 'react-router-dom'
import Axios from "axios"
import authService from "../services/authService";
import auth1Service from "../services/auth1Service";
import { register } from "../services/userService";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

class Register extends Component {
  
  constructor(props){
    super();
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirm_password: "",
      loginError: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  


 async handleSubmit(event){

    event.preventDefault();

    console.log("MADE IT HERE :)")
    const {firstName, lastName, username, password, confirm_password} = this.state; 

    const user = {firstName: firstName, lastName: lastName, username: username, password: password}

    // event.preventDefault();
    try {
        console.log(user)
        const response = await register(user);
        console.log(response);
        console.log("this is reposne")
        // auth1Service.loginWithJwt(response.headers["x-auth-token"]);
        window.location = "/login";
      } catch (ex) {
        if (ex.response && ex.response.status === 500) {
            console.log(ex.response.data);
            // let error = ex.response.data;

        }
      }
  };

  render() {

    return ( 
      
    <div>
        <div class="container" style={{width:"40%"}}>
            <br />
        <div>
            <h1>Register</h1>
        </div>
        <br/>
            <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" name="firstName" value={this.state.firstName} onChange={this.handleChange}  />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" name="lastName" value={this.state.lastName} onChange={this.handleChange}  />
            </Form.Group>
            <br/>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="username" value={this.state.username} onChange={this.handleChange}  />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <br/>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
            </Form.Group>
            <br/>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" name="confirm_password" value={this.state.confirm_password} onChange={this.handleChange}/>
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
    </div>
      );
    } 
}

export default Register;
