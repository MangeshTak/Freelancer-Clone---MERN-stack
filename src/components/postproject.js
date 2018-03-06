import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../css/postproject.css'
import { connect } from 'react-redux';
import {signupAction} from '../actions/LoginSignupAction';
var axios = require('axios');


class postproject extends Component {

constructor(props) {
    super(props);
  this.state = { pname : '', 
                 desc : '',
                 skills: '',
                 budget: '' };

    this.submitproject = this.submitproject.bind(this);
  }

changePnameState = (event) =>{
        
        this.setState({
          pname: event.target.value 
        })
       
      }

changedescState = (event) =>{
        
        this.setState({
          desc: event.target.value 
        })
       
      }

changeSkillsState = (event) =>{
        
        this.setState({
          skills: event.target.value 
        })
       
      }

changebudgetState = (event) =>{
        
        this.setState({
          budget: event.target.value 
        })
       
      }

submitproject = (event) =>{

        var self=this;
        console.log("ID ", this.props.ID);
        axios.post('http://localhost:4000/postproject', {
          id:self.props.ID,
          pname:self.state.pname,
          desc:self.state.desc,
          skills:self.state.skills,
          budget:self.state.budget
        })
        .then(function (response) {
          console.log('Done');             
        })
       
      }


  render() {
    console.log("PROJECT PAGE : " , this.props.ID);
    return (

        <div>

          <div className = "row">

            <div className="col-lg-3">
            </div>

            <div className="first-col col-lg-6">
            <div className="">
              <img className="first-image" src="./image/freelancer.png" />
            </div> 

            <h1 className="firsth1">Tell us what you need done</h1>

            <p className="firstp1"> Get free quotes from skilled freelancers within minutes, view profiles, ratings and portfolios and chat with them. Pay the freelancer only when you are 100% satisfied with their work.</p>

            <h4>Choose a name for your project</h4>

            <input type="text" onChange={this.changePnameState.bind(this)} className="firstinput"/>
             
            <h1 className="firsth1">Tell us more about your project</h1>
            
            <p className="firstp">Great project descriptions include a little bit about yourself, details of what you are trying to achieve, and any decisions that you have already made about your project. If there are things you are unsure of, don't worry, a freelancer will be able to help you fill in the blanks.</p>  

            <textarea onChange={this.changedescState.bind(this)} className="firsttextarea"></textarea>

            <div className="ufiles">
            <input type="file" className="secondbutton"/>
             </div>

            <h1 className="firsth1">What skills are required?</h1>

            <p className="firstp">Enter up to 5 skills that best describe your project. Freelancers will use these skills to find projects they are most interested and experienced in.</p>
            <input type="text" onChange={this.changeSkillsState.bind(this)} className="firstinput"/>

            <h1 className="firsth1">What is your estimated budget?</h1>

            <select className="firstselect">
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
            </select>
            
            <select onChange={this.changebudgetState.bind(this)} className="firstselect1">
              <option value="$2 - 8">Basic($2 - 8 USD)</option>
              <option value="$8 - 15">Moderate($8 - 15 USD)</option>
              <option value="$15 - 25">Standard($15 - 25 USD)</option>
              <option value="$25 - 50">Skilled($25 - 50 USD)</option>
              <option value="$50 +">Expert($50 + USD)</option>
              <option value="Customize Budget">Customize Budget</option>
            </select>

            <div>
              <button onClick={this.submitproject} className="post-button">Post My Project</button>
            </div>

            <p className="firstp2">By clicking 'Post My Project', you agree to the Terms & Conditions and Privacy Policy
               If you decide to award your project we charge a 3% commission (minimum project fees apply).</p>

            <p className="firstp2">Copyright © 2018 Freelancer Technology Pty Limited (ACN 142 189 759) Privacy Policy Terms and Conditions Copyright Infringement Policy Code of Conduct</p>    

            </div>

          </div>

        </div>


    )
  }
}

 function mapStateToProps(state){
  console.log('mapStateToProps  ::: ') ; 
  return {
    ID : state.loginReducer.ID
  }
}

export default connect(mapStateToProps)(postproject) ;
