import React, { Component } from "react";
import { Redirect } from "react-router";
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap-buttons';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios"

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

  handleSubmit(event) {
    const {email, password } = this.state; 

    event.preventDefault();
  }

//   schema = {
//     name: Joi.string().required().min(5).max(15).label("Name"),
//     username: Joi.string().required().min(5).max(50).email().label("Username"),
//     password: Joi.string().required().min(8).max(20).label("Password"),
//   };
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
        </div>
    </div>
      );
    } 
}

export default Login;
