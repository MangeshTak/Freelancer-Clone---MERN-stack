import React, { Component } from 'react';
import '../css/signup.css';
import {signupAction} from '../actions/LoginSignupAction';
import { connect } from 'react-redux';

class signup extends Component {

    constructor(props){
        super(props);

        this.state = {
        	username: '',
          	email : '',
          	password : '',
          	userType : ''
        }
      }

      changePasswordState = (event) =>{
        
        this.setState({
          password: event.target.value 
        })
       
      }

      changeEmailState = (event) =>{
        
        this.setState({
          email : event.target.value 
        })
       
      }

      changeUsernameState = (event) =>{
        
        this.setState({
          username : event.target.value 
        })
       
      }

      changeradio = (event) =>{
        
        this.setState({
          userType : event.value 
        })
       
      }

	componentWillReceiveProps(nextProps){

        if(nextProps.isSignup==true){
          this.props.history.push('/')
        }
      }

  render() {
    return (
      <div>

            <div className="row">

            <div className="col-lg-4">
            </div>

            <div className="col-lg-3">
        
              
              
              <div className="main">

              <div>
                <img src="image/freelancer.png" />
              </div>
                
                <div className="first">
                  
                  <p>
                    <input onChange={this.changeEmailState.bind(this)} type="email" placeholder="Email Address"/>
                  </p>

                  <p>                  
                    <input onChange={this.changeUsernameState.bind(this)} type="text" placeholder="Username"/>
                  </p>

                  <p>                  
                    <input onChange={this.changePasswordState.bind(this)} type="password" placeholder="Password"/>
                  </p>

                  <p>                  
                    <input onChange={this.changePasswordState.bind(this)} type="file" placeholder="Profile image"/>
                  </p>  
                    
                  <li className="form-step lookingfor-step">
                                    <div className="signup-objective button-group">
                                        <label className="btn signup-objective-label">
                                            <input onClick={this.changeradio.bind(this)} type="radio" name="looking_for" id="looking_to_hire" value="Employer"/>Hire
                                        </label><label className="btn signup-objective-label">
                                            <input onClick={this.changeradio.bind(this)} type="radio" name="looking_for" id="looking_for_work" value="Worker"/>Work
                                        </label>
                                    </div>
                                
                                <div className="form-error lookingfor-error"></div>
                                <input type="hidden" name="signup_skip_captcha" id="signup_skip_captcha" value="false"/>
                            

                            </li>
                  <div classNameName="choice">
                  	<label className="belowchoice">

                  	</label>
                  </div>

                  

                  <button type="submit" className="btn btn-primary" onClick={ () => this.props.signupAction( this.state.username , this.state.password, this.state.email , this.state.userType)}>Create Account</button>

                </div>

                <div className="bottom-up">
                  
                  <label id="remember">By registering you confirm that you accept the Terms and Conditions and Privacy Policy</label>
                  
                </div>

                <div className="bottom">
                  <label className="inf">Already a Freelancer.com member?</label>
                  <a href="/login" className="btn btn-link">Log In</a>
                </div>

               </div> 
            
            </div>
            </div>
        
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
    return {
        signupAction : (username , password, email, userType ) => dispatch(signupAction(username , password, email, userType ))
    };
}

function mapStateToProps(state){
  console.log('mapStateToProps  ::: ') ; 
  return {
    isSignup : state.loginReducer.isSignup
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(signup) ;
