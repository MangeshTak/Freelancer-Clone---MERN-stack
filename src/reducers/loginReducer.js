const initialState = {
	isLogin : false,
	isSignup : false,
	ID : ''
}

export default function  reducer (state=initialState , action )  {
	
	switch(action.type){
		
		case 'login' : {
			
			console.log("reached..")
			return {...state ,  isLogin : action.payload.islogin, ID : action.payload.currentUser }
		
		}

		case 'signup' : {

			return {...state ,  isSignup : action.payload }	

	}
		default :
			return state ; 

	}

}