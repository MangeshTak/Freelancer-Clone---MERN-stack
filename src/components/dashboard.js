import React, { Component } from 'react';
import '../css/dashboard.css';
import {signupAction} from '../actions/LoginSignupAction';
import { connect } from 'react-redux';
import Headernew from './Headernew';

var axios = require('axios');


class dashboard extends Component {

constructor(props){
        super(props);

        this.state = {
        	username: '',
          	email : '',
          	userType : '',
          	phone: '',
            about: ''
        }
      }
  
	componentWillMount()
	{
		console.log("aa",this.props.ID);

		var self=this;

		axios.post('http://localhost:4000/data', {
	  	ID : self.props.ID
	  })
	  .then(function (response) {
	  	
	  	let temp = response.data.result ;
	  	console.log(temp[0])

	  	self.setState({
  			username: temp[0].USERNAME,
          	email : temp[0].EMAIL,
          	userType : temp[0].USER_TYPE,
          	phone: temp[0].PHONE,
          	skills: temp[0].SKILLS,
            about: temp[0].ABOUT_ME
  		});
	  
	  })
	}


  render() {
    return (

      <div>
      <Headernew {...this.props}/>

      <div className = "first-div" >    

      	<div className = "second-div row">

      		<div className = "col-lg-1">
      		
      		</div>

			<div className = "col-lg-7">
      			
          <div className = "row" >

            <div className = "col-lg-3">
              <img className="ProImage" src={"./image/"+this.props.ID+".jfif"}  alt="aaa"/>
            </div>
            <div className = "col-lg-9">  
      			<div className = "third-div">
      				<p>
      					<h3>Name: {this.state.username}</h3>
      				</p>

      				<p>
      					<h3>Email: {this.state.email}</h3>
      				</p>
      				
      				<p>
      					<h3>Phone: {this.state.phone}</h3>
      				</p>
      				
              <p>
                <h3>User Type: {this.state.userType}</h3>
              </p>

      				<p>
      					<h3>About_me: {this.state.about}</h3>
      				</p>

      				<p>
      					<h3>Skills: {this.state.skills}</h3>
      				</p>

      			</div>
            </div>
            </div>

      		</div>

          <div className = " col-lg-1">
            <button className="editbutton">Edit Profile</button>
          </div>

      	</div>

      </div>
      </div>
    );
  }
}
  
 function mapStateToProps(state){
  console.log('mapStateToProps  ::: ') ; 
  return {
    ID : state.loginReducer.ID
  }
}

export default connect(mapStateToProps)(dashboard) ;