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
      address: "",
      city: "",
      state: "",
      country: "",
      month:"",
      day: "",
      date_of_birth: "",
      about: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
//     const value =
//       event.target.type === "select" ? event.target.select : event.target.value;
//     this.setState({
//       ...this.state,
//       [event.target.name]: value
//     });
  }

  handleChange1(event){
    this.setState({gender : event.target.value});
  }

  handleChange4(event){
    this.setState({country : event.target.value});
  }

  handleChange2(event){
    this.setState({month : event.target.value});
  }
  handleChange3(event){
    this.setState({day : event.target.value});
  }

imageHandler(event){
    const file = event.target.file;
    const formData = new FormData();
    formData.append('image', file);
}


async handleSubmit(event) {

    event.preventDefault();
    const {firstName, lastName, gender, month, day, city, about, address, state, country } = this.state; 

    // gender, profile_pic, address, about

    const date_of_birth = month + day;

    console.log("1 it")
    console.log(month)
    console.log(day)
    console.log("3 it")
    console.log(this.state.month)


    console.log("4 it");
    console.log(firstName);
    console.log(lastName);




    console.log("made it")

    console.log(date_of_birth);

    try{
        await authService.update_profile(gender, date_of_birth, city, about, address, state, country).then(
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

    try{
        console.log("trying")
        await authService.update_login(firstName, lastName).then(
        (response) => {
            console.log(response + "This is response")
          if(response){
          console.log("made it herePOPOP123123")
          console.log(response);
          // this.props.navigate('/home');
        //   window.location = "/login";
          }
        else{
          console.log(response + "RESPONSE 1");
        }},
        );
      } catch (error){
        console.log(error + "ERROR");
      }

    //   window.location = "/";
      

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

//   async handleSubmit2(event) {
//     const {firstName, lastName} = this.state; 

//     try{
//         console.log("trying")
//         await authService.update_login(firstName, lastName).then(
//         (response) => {
//             console.log(response)
//           if(response === "Success"){
//           console.log("made it herePOPOP")
//           console.log(response);
//           // this.props.navigate('/home');
//         //   window.location = "/login";
//           }
//         else{
//           console.log(response + "RESPONSE 1");
//         }},
//         );
//       } catch (error){
//         console.log(error + "ERROR");
//       }

//   };

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
                    <div>
                        <input type="text" class="form-control" name="lastName" placeholder="Last Name" value = {this.state.lastName} onChange={this.handleChange}/></div>
                </div>
                <br/>
                <div style={{textAlign:"center"} } class="form-group">
                <h3>Gender:</h3>
                    <select onChange={this.handleChange1.bind(this)} value={this.state.gender}>
                        <option selected value="">Choose your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="n/a">Prefer not to say</option>
                    </select>
                </div>
                <br/>
                <div style={{textAlign:"center"} } class="form-group">
                    <h3>Address</h3>
                    <input type="text" class="form-control" name="address" placeholder="Address" value = {this.state.address} onChange={this.handleChange}/>
                </div>
                <div style={{textAlign:"center"} } class="form-group">
                    <h3>State</h3>
                    <input type="text" class="form-control" name="state" placeholder="State" value = {this.state.state} onChange={this.handleChange}/>
                </div>
                <div style={{textAlign:"center"} } class="form-group">
                    <h3>City</h3>
                    <input type="text" class="form-control" name="city" placeholder="City" value = {this.state.city} onChange={this.handleChange}/>
                </div>
                <br/>
                <div style={{textAlign:"center"} } class="form-group">
                <h3>Country:</h3>
                    <select onChange={this.handleChange4.bind(this)} value={this.state.country}>
                        <option selected value="">Choose your country</option>
                        <option value="USA">United States</option>
                        <option value="Italy">Italy</option>
                        <option value="France">France</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Portgual">Portgual</option>
                        <option value="Canada">Canada</option>
                        <option value="Mexico">Mexico</option>
                        <option value="India">India</option>
                        <option value="China">China</option>
                        <option value="Norway">Norway</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Japan">Japan</option>
                        <option value="Iceland">Iceland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Russia">Russia</option>
                    </select>
                </div>
                <br/>
                <div style={{textAlign:"center"}} class="form-group">
                    <h3>Birthday</h3>
                    <select onChange={this.handleChange2.bind(this)} value={this.state.month}>
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
                    <select onChange={this.handleChange3.bind(this)} value={this.state.day}>
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
                        <textarea type="password" class="form-control" name="about" placeholder="" value={this.state.about} onChange={this.handleChange}/>
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
