import React, { Component } from "react";
import { Redirect } from "react-router";
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap-buttons';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';

class Login extends Component {
  state = {
    data: { name: "", username: "", password: "" },
    errors: {},
  };

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
                    <input  type="email" class="form-control" name="email" placeholder="Email" onChange={this.handleInputChange}/>
                </div>
                <br/>
                <div style={{textAlign:"center"}} class="form-group">
                        <input type="password" class="form-control" name="password" placeholder="Password" onChange={this.handleInputChange}/>
                </div>
                <br/>
                <div>
                    <button type="submit">Sign In</button>
                </div> 
            </form>
        </div>
    </div>
      );
    } 
}

export default Login;
