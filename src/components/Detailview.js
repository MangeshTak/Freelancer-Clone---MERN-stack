import React, { Component } from 'react';
import '../css/detailview.css';
import {signupAction} from '../actions/LoginSignupAction';
import { connect } from 'react-redux';
import Headernew from './Headernew';
import TRComponent from './trcomponent';

var axios = require('axios');


class Detailview extends Component {

constructor(props){
        super(props);

        this.state = {
        	projects: {},
        	bid: []
        }
      }
  
	componentWillMount()
	{
	
	var self = this;

	axios.post('http://localhost:4000/detailviewproject',{ pid : this.props.match.params.id })
    .then(function (response) {      
      console.log("project from API",response.data.result);
      self.setState({
        projects: response.data.result
      });
    })

    axios.post('http://localhost:4000/detailviewbid',{ pid : this.props.match.params.id })
    .then(function (response) {      
      console.log("Bids from API",response.data.result);
      self.setState({
        bid: response.data.result
      });
    })

	}

  render() {
    console.log("State array",this.state.projects);
    return (	
        <div>         
                   
            <div>
                <Headernew {...this.props}/>
            </div>       

            <div className ="row">
                <div className ="col-xs-2"></div>

                <div className ="col-xs-6">

                   <h2 className ="firstH2"> {this.state.projects[0] ? `${this.state.projects[0].PROJECTNAME}` : ' '} </h2>
                      
                    <div className  = "fDiv">
                        <div>
                        <h3>Project Description</h3>
                        <p>{this.state.projects[0] ? `${this.state.projects[0].DESCRIPTION}` : ' '}</p>

                        <h3>Skills</h3>
                        <p>{this.state.projects[0] ? `${this.state.projects[0].SKILLS}` : ' '}</p>

                        <h3>Budget Range</h3>
                        <p>{this.state.projects[0] ? `${this.state.projects[0].BUDGET}` : ' '}</p>

                        <h3>Average Bid</h3>
                        <p>140$</p>

                        </div>
                    </div>

                    <h2 className ="firstH2">Bids on project</h2>     
                      
                      <div className  = "sDiv">
                        <div>
                        
                        <table className="TableAll">
               
                  <tbody>
                    <tr>
                      <th> </th>
                      <th>Freelancer Name</th>
                      <th>Bid Price</th>
                      <th>Period in Days</th>
                      <th>Hire</th>
                    </tr>

                    {
                      this.state.bid.map((project, key) => {

                        return <tr className="innwerTR">
                        <td><img className="BidImage" src={"./image/"+key+".jfif"}  alt="aaa"/></td>
                        <td>{project.USER}</td>
                        <td>{project.BID_PRICE}</td>
                        <td>{project.DAYS}</td>
                     </tr>
          
                      })
                    }

                    </tbody>   
                  </table>

                        </div>
                    </div>

                </div>
            </div>
        }
        </div>
)}

}


export default Detailview ;
