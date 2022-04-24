import React, { Component } from "react";
import { Redirect } from "react-router";
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap-buttons';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
import { NavLink, useNavigate } from 'react-router-dom'
import Axios from "axios"
import auth1Service from "../services/auth1Service";
import { capitalize } from "lodash";

const user = auth1Service.getCurrentUser();
let firstName = "";
if(user){
  firstName = user.firstName.slice(0,1).toUpperCase() + user.firstName.slice(1, user.firstName.length);
}  

class Home extends Component {
  
  constructor(props){
    super();
    this.state = {
        shops: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

async handleSubmit(event) {

    event.preventDefault();
    const {shops} = this.state;  

    // try{
    //     await authService.create_shop(shop_name).then(
    //     (response) => {
    //         console.log(response)
    //       if(response === "Success"){
    //       console.log("made it herePOPOP")
    //       console.log(response);
    //       // this.props.navigate('/home');
    //       window.location = "/";
    //       }
    //     else{
    //       console.log(response);
    //     }},
    //     );
    //   } catch (error){
    //     console.log(error);
    //   }

    //   window.location = "/";
      
  };

  render() {

    if(user){
      return(
        <div>
        <div class="container">
            <br />
        <div>
            <h1>Welcome to Etsy, {firstName}</h1>
            <span>Items below</span>
        </div>
        <br></br>
        <br></br>

        </div>
    </div>
      )
    }
    else{
      return ( 
      
        <div>
            <div class="container">
                <br />
            <div>
                <h1>Welcome to Etsy</h1>
                <span>Items below</span>
            </div>
            <br></br>
            <br></br>
    
            </div>
        </div>
      )};
    } 
}

export default Home;
