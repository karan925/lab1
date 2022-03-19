import React, { Component } from "react";
import { Redirect } from "react-router";

class Register extends Component {
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
        <br/>
        <div class="container">
            {/* <form action="http://127.0.0.1:3000/create" method="post"> */}
            <form onSubmit={this.handleSubmit}>
                <div style={{width: '30%'}} class="form-group">
                    <input  type="text" class="form-control" name="firstName" placeholder="First Name" onChange={this.handleInputChange}/>
                </div>
                <br/>
                <div style={{width: '30%'}} class="form-group">
                        <input  type="text" class="form-control" name="lastName" placeholder="Last Name" onChange={this.handleInputChange}/>
                </div>
                <br/>
                <div style={{width: '30%'}} class="form-group">
                        <input  type="email" class="form-control" name="email" placeholder="Email" onChange={this.handleInputChange}/>
                </div>
                <br/>
                <div style={{width: '30%'}} class="form-group">
                        <input  type="password" class="form-control" name="password" placeholder="Password" onChange={this.handleInputChange}/>
                </div>
                <div style={{width: '30%'}}>
                    <button class="btn btn-success" type="submit">SignUp</button>
                </div> 
            </form>
        </div>
    </div>
      );
    } 
}

export default Register;
