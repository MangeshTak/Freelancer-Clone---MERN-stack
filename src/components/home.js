import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../css/home.css'

class home extends Component {

constructor(props) {
    super(props);
  this.state = {isLogin : false, isSignup : false};
  }

  render() {
    return (

    <div>  

      <div className="first_new navbar navbar-default">
      
        <div>
        <img className="imageNew" src="./image/freelancer.png"  alt="aaa"/>
          <ul className="second_new nav navbar-nav">
            <li><a href="/login">Log In</a></li>
            <li><a href="/signup">Sign Up</a></li>
            <li><button><a className="Newa" href="/login">Post a Project</a></button></li>
          </ul>
        </div>
        
      </div>

      <div>
          <img className="image1" src="./image/one.png"  alt="aaa"/>
      </div>  

      <div>
          <img className="image1" src="./image/Capture2.png"  alt="aaa"/>
      </div>

      <div>
          <img className="image1" src="./image/Capture3.png"  alt="aaa"/>
      </div>

      <div>
          <img className="image1" src="./image/Capture4.png"  alt="aaa"/>
      </div>

      <div>
          <img className="image1" src="./image/Capture5.png"  alt="aaa"/>
      </div>

    </div>
    );
  }
}

export default home;
