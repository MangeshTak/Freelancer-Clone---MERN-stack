import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../css/header.css';
const headers = {
    'Accept': 'application/json'
};

class Headernew extends Component {

constructor(props) {
   super(props);
   console.log(this);
   this.postproject = this.postproject.bind(this);
   this.logout = this.logout.bind(this);
   this.dashboard = this.dashboard.bind(this);
   this.profile = this.profile.bind(this);
  }

  postproject = (event) =>{
       console.log(event);
       this.props.history.push('/postproject') 
      }

  dashboard = (event) =>{
       console.log(event);
       this.props.history.push('/DashboardNew') 
      }

  profile = (event) =>{
       console.log(event);
       this.props.history.push('/dashboard') 
      }      

  logout = (event) =>{
       var self = this;
    fetch('http://localhost:4000/logout', {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    credentials:'include'
    }).then(function (response) {
       
        self.props.history.push('/') 
    })
    .catch(error => {
      console.log("Error " , error)
       
    })

       
      }

  render() {
    return (

    <div>  

      <div className="first_new_new navbar navbar-default">
      
        <div>
        <img className="imageNew_new" src="./image/freelancer.png"  alt="aaa"/>
          <div className="imageP_new"><p className="imageP_newP">Hire Freelancer</p></div>
          <div className="imageP_new"><p className="imageP_newP">Work</p></div>
          <div className="imageP_new"><p className="imageP_newP">My Projects</p></div>
          <div className="imageP_new"><p className="imageP_newP">Help</p></div>

          <input className="inputsearch" type="text" placeholder="Search" />

          <i className="fa fa-commenting all-font"></i>
          <i className="fa fa-bell all-font"></i>
          <i onClick={ () => this.profile()} className="fa fa-rss all-font"></i>
          <a onClick={ () => this.logout()} className="fa fa-th all-font"></a>

        </div>

       </div>


       <div className="second_new_new">

          <ul className="secondUL nav navbar-nav">
            <li><a href="/#">My Projects</a></li>
            <li><a onClick={ () => this.dashboard()}>Dashboard</a></li>
            <li><button onClick={this.postproject} className="btn btn-small postbutton">Post a Project</button></li>
          </ul>

       </div> 
       
      </div>
     
      )
    } 
}

export default Headernew;
