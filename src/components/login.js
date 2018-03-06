import React, { Component } from 'react';
import '../css/login.css';
import {loginAction} from '../actions/LoginSignupAction'
import { connect } from 'react-redux'; 
const headers = {
    'Accept': 'application/json'
};

class login extends Component {

    constructor(props){
        super(props);

        this.state = {
          email : '',
          password : ''
        }
      }

componentWillMount()
  {
    var self = this;

    fetch('http://localhost:4000/checksession', {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    credentials:'include'
    }).then(function (response) {
      console.log(response.status);
       
       if(response.status==200){
          self.props.history.push('/allproject')
       }

    })
    .catch(error => {
      console.log("Error " , error)
       
    })

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

      componentWillReceiveProps(nextProps){
        console.log(this);
        if(nextProps.isLogin==true){
          this.props.history.push('/allproject')
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
                    <input onChange={this.changeEmailState.bind(this)} type="email" placeholder="Email or Username"/>
                  </p>

                  <p>                  
                    <input onChange={this.changePasswordState.bind(this)} type="password" placeholder="Password"/>
                  </p>

                  <button type="submit" className="btn btn-primary" onClick={ () => this.props.loginAction(this.state.email , this.state.password)} >Log In</button>

                </div>

                <div className="bottom-up">
                  <input type="checkbox"/>
                  <label id="remember">Remember me</label>
                  <a href="#" id="password">Forgot Password?</a>
                </div>

                <div className="bottom">
                  <label className="inf">Don't have an account?</label>
                  <a href="/signup" className="btn btn-link">Signup</a>
                
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
        loginAction : (username , password ) => dispatch(loginAction(username , password ))
    };
}

function mapStateToProps(state){
  console.log('mapStateToProps  ::: ') ; 
  return {
    isLogin : state.loginReducer.isLogin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(login) ;

