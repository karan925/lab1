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
      email: "",
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
    const {firstName, lastName, email, password, confirm_password} = this.state; 

    const user = {firstName: firstName, lastName: lastName, email: email, password: password}

    // event.preventDefault();
    try {
        console.log(user)
        const response = await register(user);
        console.log(response);
        auth1Service.loginWithJwt(response.headers["x-auth-token"]);
        window.location = "/";
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
        //   loginError = this.state.errors;
        //    = ex.response.data;
        //   this.setState({ errors });
            console.log(ex.response);
        }
      }
    // try{
    //     await authService.signup(email, password, firstName, lastName).then(
    //     (response) => {
    //         console.log(response)
    //       if(response === "Success"){
    //       console.log("made it herePOPOP")
    //       console.log(response);
    //       // this.props.navigate('/home');
    //       window.location = "/login";
    //       }
    //     else{
    //       console.log(response);
    //     }},
    //     );
    //   } catch (error){
    //     console.log(error);
    //   }
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
              <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange}  />
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
            {/* <form onSubmit={this.handleSubmit}>
                <div style={{textAlign:"center"} } class="form-group">
                    <input type="text" class="form-control" name="firstName" placeholder="First Name" value = {this.state.firstName} onChange={this.handleChange}/>
                </div>
                <br/>
                <div style={{textAlign:"center"} } class="form-group">
                    <input type="text" class="form-control" name="lastName" placeholder="Last Name" value = {this.state.lastName} onChange={this.handleChange}/>
                </div>
                <br/>
                <div style={{textAlign:"center"} } class="form-group">
                    <input type="email" class="form-control" name="email" placeholder="Email" value = {this.state.email} onChange={this.handleChange}/>
                </div>
                <br/>
                <div style={{textAlign:"center"}} class="form-group">
                        <input type="password" class="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                </div>
                <br/>
                <div style={{textAlign:"center"}} class="form-group">
                        <input type="password" class="form-control" name="confirm_password" placeholder="Password" value={this.state.confirm_password} onChange={this.handleChange}/>
                </div>
                <br/>
                <div>
                    <button color="primary" type="submit">Sign In</button>
                </div> 
                <br/>
            </form> */}
        </div>
    </div>
      );
    } 
}

export default Register;
