import React, { Component } from 'react';
import '../css/allproject.css';
import {signupAction} from '../actions/LoginSignupAction';
import { connect } from 'react-redux';
import Headernew from './Headernew';
import TRComponent from './trcomponent';

var axios = require('axios');


class DashboardNew extends Component {

constructor(props){
        super(props);

        this.state = {
        	projects: [],
        	bid: []
        }
      }
  
	componentWillMount()
	{
	
	var self = this;

	axios.post('http://localhost:4000/dashboardproject',{ id : self.props.ID })
    .then(function (response) {      
      console.log(response.data.result);
      self.setState({
        projects: response.data.result
      });
    })

    axios.post('http://localhost:4000/dashboardbid',{ id : self.props.ID })
    .then(function (response) {      
      console.log(response.data.result);
      self.setState({
        bid: response.data.result
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
            <h1 className="fh1">Your Projects</h1>

            <div className="allTable">
              <table className="TableAll">
               
              <tbody>
                <tr>
                  <th>Project Name</th>
                  <th>Average Bid</th>
                  <th>Freelancer name</th>
                  <th>Days</th>
                  <th>Status</th>
                </tr>

                {
                  this.state.projects.map((project, key) => {

                    return <tr className="innwerTR">
						        <td>{project.projectname}</td>
		                <td>{project.bid_price}</td>
		                <td>{project.user}</td>
		                <td>{project.days}</td>
		                <td>{project.status}</td> 
	               </tr>
	    
                  })
                }

                </tbody>   
              </table>
            </div>

          </div>

        </div>


    	<div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-9">
            <h1 className="fh1">Your Bids</h1>

            <div className="allTable">
              <table className="TableAll">
               
              <tbody>
                <tr>
                  <th>Project Name</th>
                  <th>Employer</th>
                  <th>Avg. Bid</th>
                  <th>My Bid</th>
                  <th>Status</th>
                </tr>

                {
                  this.state.bid.map((project, key) => {

                    return <tr className="innwerTR">
						        <td>{project.projectname}</td>
		                <td>{project.username}</td>
		                <td>{project.bid_price}</td>
		                <td>{project.yourBid}</td>
		                <td>{project.status}</td> 
	               </tr>
	    
                  })
                }

                </tbody>   
              </table>
            </div>

          </div>

        </div>


      </div>


	)}

}

 function mapStateToProps(state){
  console.log('mapStateToProps  ::: ') ; 
  return {
    ID : state.loginReducer.ID
  }
}

export default connect(mapStateToProps)(DashboardNew) ;
