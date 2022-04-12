import React, { Component } from "react";
import { Redirect } from "react-router";
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
import { NavLink, useNavigate } from 'react-router-dom'
import Axios from "axios"
import auth1Service from "../services/auth1Service";
import Home from '../pages/home';
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";

class Login extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
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

  async handleSubmit(event) {
    event.preventDefault();
    console.log("made it here")
    const {email, password } = this.state;
    console.log(email)
    console.log(password)

    try{
      await auth1Service.login(email, password).then(
      (response) => {
        console.log("this is resposne in handle submit" + response)
        if(response){
        console.log("made it herePOPOP")
        console.log(response);
        // this.props.navigate('/home');
        window.location = "/";
        }
      else{
        console.log(response);
      }},
      );
    } catch (error){
      console.log(error);
    }
  }

  handleReg(event){
    event.preventDefault();
    window.location = "/register";
  }

  render() {

    return ( 
      
    <div>
        <div class="container" style={{width:"40%"}}>
            <br />
        <div>
            <h1>Login</h1>
        </div>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange}  />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
        <br/>
        <Button variant="warning" onClick={this.handleReg}>
          Register
        </Button>
        </div>
    </div>
      );
    } 
}

// function WithNavigate(props) {
//   let navigate = useNavigate();
//   return <Home {...props} navigate={navigate} />
// }

export default Login;
