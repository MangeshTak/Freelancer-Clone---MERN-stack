import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../css/header.css';
import Modal from 'react-modal';
import { connect } from 'react-redux';
var axios = require('axios');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class trcomponent extends Component {

constructor(props) {
   super(props);

   this.state = {
      modalIsOpen: false,
      price: '',
      day:''
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.bidding = this.bidding.bind(this)
    

  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
 
  }

	changeBid = (event) =>{
        
        this.setState({
          price : event.target.value 
        })
       
      }

    changeDays = (event) =>{
        
        this.setState({
          day : event.target.value 
        })
       
      }  

  bidding() {

  	var self = this;
  	console.log(self.props.project.P_id,self.state.price,self.state.day,self.props.ID);

  	axios.post('http://localhost:4000/biddata', {
	
	  pid:self.props.project.P_id,
		price:self.state.price,
		days:self.state.day,
		uid:self.props.ID

	  })
	  .then(function (response) {
	  	
	  	self.setState({
	  		modalIsOpen : false
	  	})
	  })
  }

  render() {
  	
    return (
    	
			<tr className="innwerTR">
				<td onClick={() => this.props.history.push("/products/"+this.props.project.P_id)  } >{this.props.project.projectname}</td>
                <td>{this.props.project.description}</td>
                <td>{this.props.project.skills}</td>
                <td>{this.props.project.username}</td>
                <td>{this.props.project.budget}</td> 
                <td>{this.props.project.Number}</td> 
                <td><a onClick={this.openModal}>Bid</a></td>

                <Modal
		          isOpen={this.state.modalIsOpen}
		          onAfterOpen={this.afterOpenModal}
		         
		          style={customStyles}
		          contentLabel="Example Modal"
		          >

	          <div>
	          
	          	<p><label>Bid ($) : </label><input onChange={this.changeBid.bind(this)} /></p>
	          	<p><label>Days :  </label><input onChange={this.changeDays.bind(this)} /></p>	          	
	          	<button className="btn btn-primary" onClick={this.bidding}>Bid </button>

	          </div>
	          
	        </Modal>
            </tr>
	    
            )}
        }

function mapStateToProps(state){
  console.log('mapStateToProps  ::: ') ; 
  return {
    ID : state.loginReducer.ID
  }
}

export default connect(mapStateToProps)(trcomponent) ;