import React, { Component } from "react";
import { Navigate } from "react-router";
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap-buttons';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios"
import authService from "../services/authService";
import FlashMessage from "react-flash-message";

class MyShop extends Component {
  
  constructor(props){
    super();
    this.state = {
        shop_name: "",
        success: false,
        message: ""
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
    const {shop_name} = this.state;
    console.log(shop_name)
    var data = {shop_name: shop_name};

    //   window.location = "/";

    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/shop/create_shop', data).then(response => {
      console.log(response)
      this.setState({
          success: true
      });
  })
  .catch(error => {
    console.log(error.response)
      this.setState({
          message: error.response.data,
          success: false
      })
  });
      
  };

  render() {

    let redirectVar = null;
    if(!localStorage.getItem('token')) {
        redirectVar = <Navigate to= "/login"/>
    }
    if(this.state.success){
        redirectVar = <Navigate to= "/"/>
    }

    return ( 
      
    <div>
      {redirectVar}
        <div class="container">
            <br />
        <div>
            <h1>Name your shop</h1>
            <span>Choose a memorable name that reflects your style</span>
        </div>
        <br></br>
        <form onSubmit={this.handleSubmit}>
                <div style={{textAlign:"center"} } class="form-group">
                    <input type="text" class="form-control" name="shop_name" placeholder="Shop Name" value = {this.state.shop_name} onChange={this.handleChange}/>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <h4>Choose Shop Image</h4>
                <br></br>
                <input type="file" name = "image" accept="image/*" multiple={false} onChange={this.imageHandler}/>
                <br></br>
                <br></br>

                <button color="primary" type="submit">Submit</button>
        </form>
        {!this.state.success && (
        <FlashMessage duration={10000}>
          <strong>{this.state.message}</strong>
        </FlashMessage>
      )}
        </div>
    </div>
      );
    } 
}

export default MyShop;
