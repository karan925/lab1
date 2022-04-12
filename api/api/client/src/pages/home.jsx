import React, { Component } from "react";
import { Redirect } from "react-router";
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap-buttons';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
import { NavLink, useNavigate } from 'react-router-dom'
import Axios from "axios"
import authService from "../services/authService";

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

    return ( 
      
    <div>
        <div class="container">
            <br />
        <div>
            <h1>Home</h1>
            <span>Items below</span>
        </div>
        <br></br>
        <br></br>

        </div>
    </div>
      );
    } 
}

export default Home;
