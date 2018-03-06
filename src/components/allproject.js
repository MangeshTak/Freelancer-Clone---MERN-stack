import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../css/allproject.css'
import Headernew from './Headernew';
import TRComponent from './trcomponent';
var axios = require('axios');
const headers = {
    'Accept': 'application/json'
};

class allproject extends Component {

constructor(props){
        super(props);

        this.state = {
          projects: []
        }
      }  

componentWillMount()
  {
    var self = this;
    console.log("API call to get all product");

    fetch('http://localhost:4000/checksession', {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    credentials:'include'
    }).then(function (response) {
      console.log(response.status);
       
       if(response.status==401){
          self.props.history.push('/login')
       }
    })
    .catch(error => {
      console.log("Error " , error) 
    })

    axios.get('http://localhost:4000/allproject')
    .then(function (response) {      
      console.log(response.data.result);
      self.setState({
        projects: response.data.result
      });
    })
  }

  render() {
   return (
      <div>
        
        <div>
          <Headernew {...this.props}/>
        </div>
        
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-9">
            <h1 className="fh1">Projects and Contests</h1>

            <div className="allTable">
              <table className="TableAll">
               
              <tbody>
                <tr>
                  <th>Project Name</th>
                  <th>Description</th>
                  <th>Skills Required</th>
                  <th>Employer</th>
                  <th>Budget Range</th>
                  <th>Number of bid yet</th>
                  <th>Bid Now</th>
                </tr>

                {
                  this.state.projects.map((project, key) => {
                    return  <TRComponent {...this.props} key={key} project={project} />
                  })
                }

                </tbody>   
              </table>
            </div>

          </div>

        </div>

      </div>

    );
  }
}

export default allproject;
