var axios = require('axios');


const headers = {
    'Accept': 'application/json'
};

export function loginAction(email, password) {

	return  function(dispatch){
		console.log("Calling some api")

	  fetch('http://localhost:4000/login', {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		credentials:'include',
		body: JSON.stringify({	username : email , 
	  							password : password  })
		}).then(function (response) {
			 response.json().then(res => {
			 	console.log("Polash " , res.result);
			 	var payload = {'islogin':true, 'currentUser': res.result[0].ID} ;
			 	dispatch({type : 'login' , payload });
			 })
		})
		.catch(error => {
			console.log("Error hai bhai " , error)
			 dispatch({type : 'login' , payload : {'islogin':false}})
		})
	}
}

export function signupAction(username,password,email,usertype) {

	return  function(dispatch){
		console.log("Calling signup api")
		 axios.post('http://localhost:4000/signup', {
		  	password : password , 
		  	username : username,
		  	usertype : usertype , 
		  	email : email 
	  })
	  .then(function (response) {
	  	console.log('Response ' , response.status ) ; 
		dispatch({type : 'signup' , payload : true});
	  }).catch((err) => dispatch({type : 'signup' , payload : false}))
	}

}

