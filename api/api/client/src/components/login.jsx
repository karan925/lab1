import React, { Component } from "react";
import { Redirect } from "react-router";
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap-buttons';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
import { NavLink, useNavigate } from 'react-router-dom'
import Axios from "axios"
import AuthService from "../services/authService";
import Home from '../pages/home';

class Login extends Component {
  
  constructor(props){
    super();
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
    const {email, password } = this.state; 
    try{
      await AuthService.login(email, password).then(
      (response) => {
        if(response.auth){
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
        <div class="container">
            <br />
        <div>
            <h1>Login</h1>
        </div>
        <br/>
            <form onSubmit={this.handleSubmit}>
                <div style={{textAlign:"center"} } class="form-group">
                    <input type="email" class="form-control" name="email" placeholder="Email" value = {this.state.email} onChange={this.handleChange}/>
                </div>
                <br/>
                <div style={{textAlign:"center"}} class="form-group">
                        <input type="password" class="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                </div>
                <br/>
                <div>
                    <button color="primary" type="submit">Sign In</button>
                </div> 
                <br/>
            </form>
            <div>
                <button color="primary" onClick={this.handleReg}>Register</button>
            </div>
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
