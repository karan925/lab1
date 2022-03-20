import React, { Component } from "react";
import { Redirect } from "react-router";
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap-buttons';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
import { NavLink, useNavigate } from 'react-router-dom'
import Axios from "axios"
import authService from "../services/authService";

class ProfileUpdate extends Component {
  
  constructor(props){
    super();
    this.state = {
      firstName: "",
      lastName: "",
      gender: "",
      profile_pic: "",
      address: "",
      about: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    // this.setState({
    //   [event.target.name]: event.target.value
    // })
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
    });
  }

imageHandler(event){
    const file = event.target.file;
    const formData = new FormData();
    formData.append('image', file);
}


async handleSubmit(event) {
    const {firstName, lastName, gender, profile_pic, address, about} = this.state; 

    // gender, profile_pic, address, about

    event.preventDefault();

    try{
        await authService.update_profile(firstName, lastName).then(
        (response) => {
            console.log(response)
          if(response === "Success"){
          console.log("made it herePOPOP")
          console.log(response);
          // this.props.navigate('/home');
        //   window.location = "/login";
          }
        else{
          console.log(response);
        }},
        );
      } catch (error){
        console.log(error);
      }

    // Axios.post('https://cmpe-lab1-273.herokuapp.com/register', {
    //     email: email,
    //     password: password,
    //     firstName: firstName,
    //     lastName: lastName
    // }).then((response) => {
    //     console.log("THIS IS " + response.data);
    // }).catch(error => {
    //     console.log("login error", error);
    // });

  };

  render() {

    return ( 
      
    <div>
        <div class="container">
            <br />
        <div>
            <h1>Your public profile</h1>
            <span>Everything on this page can be seen by anyone</span>
        </div>
        <br></br>
        <h3>Profile Picture</h3>
        <br></br>
        <input type="file" name = "image" accept="image/*" multiple={false} onChange={this.imageHandler}/>
        <br></br>
        <br></br>
            <form onSubmit={this.handleSubmit}>
                <div style={{textAlign:"center"} } class="form-group">
                    <h3>Your Name: {localStorage.getItem("name")}</h3>
                    <input type="text" class="form-control" name="firstName" placeholder="First Name" value = {this.state.firstName} onChange={this.handleChange}/>
                    <input type="text" class="form-control" name="firstName" placeholder="Last Name" value = {this.state.lastName} onChange={this.handleChange}/>
                </div>
                <br/>
                <div style={{textAlign:"center"} } class="form-group">
                <h3>Gender:</h3>
                    <select onChange={this.handleChange} value={this.state.gender}>
                        <option selected value="">Choose your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="n/a">Prefer not to say</option>
                    </select>
                </div>
                <br/>
                <div style={{textAlign:"center"} } class="form-group">
                    <h3>City</h3>
                    <input type="text" class="form-control" name="address" placeholder="City" value = {this.state.address} onChange={this.handleChange}/>
                </div>
                <br/>
                <div style={{textAlign:"center"}} class="form-group">
                    <h3>Birthday</h3>
                    <select onChange={this.handleChange} value={this.state.gender}>
                        <option selected value="">- month -</option>
                        <option value="January">January</option>
                        <option value="Feburary">Feburary</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                    <select onChange={this.handleChange} value={this.state.gender}>
                            <option selected value="">- day -</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                </div>
                <br/>
                <div style={{textAlign:"center"}} class="form-group">
                    <h3>About</h3>
                        <textarea type="password" class="form-control" name="confirm_password" placeholder="" value={this.state.confirm_password} onChange={this.handleChange}/>
                </div>
                <span>Tell people a little about your self</span>
                <br/>
                <br/>
                <br/>
                <div>
                    <button color="primary" type="submit">Save Changes</button>
                </div> 
                <br/>
            </form>
        </div>
    </div>
      );
    } 
}

export default ProfileUpdate;
