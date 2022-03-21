import React, { Component } from "react";
import { Redirect } from "react-router";
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap-buttons';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
import { NavLink, useNavigate } from 'react-router-dom'
import Axios from "axios"
import authService from "../services/authService";

class CreateShop extends Component {
  
  constructor(props){
    super();
    this.state = {
        shop_name: "",
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

    try{
        await authService.create_shop(shop_name).then(
        (response) => {
            console.log(response)
          if(response === "Success"){
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

    //   window.location = "/";
      
  };

  render() {

    return ( 
      
    <div>
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
        </div>
    </div>
      );
    } 
}

export default CreateShop;
