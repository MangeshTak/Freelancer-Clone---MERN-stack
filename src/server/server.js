
var bodyparser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql');
var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');

app.use(bodyparser.json());

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader( 'Access-Control-Allow-Credentials' ,true);
    next();
});

app.use(session({
    secret: "jagjhdkjacs",
		  resave: false,
		  saveUninitialized: false,
		  duration: 600000000000 * 60 * 1000,
		  activeDuration: 6 * 60 * 60 * 1000,
		   cookie : {
		        maxAge: 1000* 60 * 60 *24 * 365,
		        expires : 3600000 * 24 * 60
		    }  }));

var pool = mysql.createPool({
	connectionLimit : 100,
	host : 'localhost',
	user : 'root',
	password : '2411',
	database : 'freelancer'
	
});

pool.getConnection(function(error,con){
	if(!!error){
		console.log('Error');
		con.release();
	}
	else {
		console.log('Connection Successful!!');
		con.release();
	}
	
});

app.post('/login' , function(req , res){

	var sql = "SELECT * FROM USER WHERE USERNAME='"+req.body.username+"'";
		console.log("Called");

		pool.getConnection(function(error,con){

		  con.query(sql, function (err, result) {
		  	var result = JSON.parse(JSON.stringify(result));
		  	console.log("hii",result[0].password);

		  	bcrypt.compare(req.body.password, result[0].password).then((ans) => {
			    
			    console.log(ans);	
			    if(ans==true){
			  		req.session.user = "mangesh" ;
                    console.log("Mangesh sesssion " , req.session.user)
			    	res.status(200).json({result:result})
			    }
			    else{			    	
			    	res.send(result)
			    } 
			});
		})
	})
});
		
app.get('/checksession' , function(req , res){
console.log("Mangesh Checksession: ", req.session.user);
	
	if(req.session.user){
		console.log("yesss");
		res.status(200).json({result:req.session.user})
	}
	else{
		res.status(401).json({result:"NoUser"});	
	}
})

app.post('/logout' , function(req , res){

	console.log("Before Destroying",req.session);

	if(req.session.user){
		console.log("yesss");
		req.session.destroy();
		console.log("After destroying",req.session);
		res.send("destroyed");
	}
	else{
		res.send("Not destroyed");	
	}
})

app.post('/signup' , (req,res) => {
		
			  var salt = bcrypt.genSaltSync(10);
			  var hash = bcrypt.hashSync(req.body.password, salt);
			  console.log(hash);
			  var sql = "INSERT INTO USER(USERNAME, EMAIL, PASSWORD, USER_TYPE) VALUES ('"+req.body.username+"','" +req.body.email+"','" +hash+"','" + req.body.userType+"')";

		pool.getConnection(function(error,con){

			  con.query(sql, function (err, result) {
			    res.send(result)
			  
		});
	});		  
});

app.post('/postproject' , (req,res) => {
		
			  var sql = "INSERT INTO PROJECTS(ID,USERNAME,PROJECTNAME,DESCRIPTION,SKILLS,BUDGET) VALUES ('"+req.body.id+"', (SELECT USERNAME FROM USER WHERE ID="+req.body.id+") ,'"+req.body.pname+"','"+req.body.desc+"','"+req.body.skills+"','"+req.body.budget+"')" ;
			  console.log(sql);
	  		pool.getConnection(function(error,con){

			  con.query(sql, function (err, result) {
			  res.send(result);			  
		});
	});
});

app.get('/allproject',(req,res) => {

	var sql = "select p.P_id, p.projectname, p.description, p.skills, p.username, p.budget, (select count(*) from bid b where p.P_id=b.p_id) Number from projects p";
pool.getConnection(function(error,con){

	con.query(sql, function (err, result) {
				console.log(result);
			    res.json({result:JSON.parse(JSON.stringify(result))})
			});
});
});

app.post('/data' , (req,res) => {
		
		var sql = "SELECT USERNAME, EMAIL, USER_TYPE, PHONE, ABOUT_ME, SKILLS FROM USER WHERE ID="+req.body.ID;
		  
		pool.getConnection(function(error,con){
		  con.query(sql, function (err, result) {
		    res.json({result:JSON.parse(JSON.stringify(result))})
		  });	
		});
});

app.post('/biddata' , (req,res) => {

		var sql = "insert into bid values ('"+req.body.pid+"','"+req.body.price+"','"+req.body.days+"',"+"(select username from user where ID="+req.body.uid+"),'open')";
		console.log(sql);
	pool.getConnection(function(error,con){
		  con.query(sql, function (err, result) {
		    res.send(result)
		  });	
	});	  
});

app.post('/dashboardproject',(req,res) => {

	var sql = "select p.projectname, b.bid_price, b.user, b.days, b.status from projects p, bid b where p.id="+req.body.id+" and p.P_id=b.P_id;";
	pool.getConnection(function(error,con){	
	con.query(sql, function (err, result) {
				console.log("Dashboard Project",result);
			    res.json({result:JSON.parse(JSON.stringify(result))})
			});
	});
});

app.post('/dashboardbid',(req,res) => {

	var sql = "select p.projectname, p.username, b.bid_price, b.bid_price-30 as yourBid, b.status from bid b, user u, projects p where u.id="+req.body.id+" and u.username = b.user and p.P_id=b.P_id;";
	
	pool.getConnection(function(error,con){
	con.query(sql, function (err, result) {
				console.log(result);
			    res.json({result:JSON.parse(JSON.stringify(result))})
			});
	});
});


app.post('/detailviewproject',(req,res) => {

	var sql = "SELECT P.PROJECTNAME, P.DESCRIPTION, P.SKILLS, BUDGET FROM PROJECTS P WHERE P.P_id="+req.body.pid+";";
	pool.getConnection(function(error,con){
	con.query(sql, function (err, result) {
				console.log(result);
			    res.json({result:JSON.parse(JSON.stringify(result))})
			});
	});
});

app.post('/detailviewbid',(req,res) => {

	var sql = "SELECT B.USER, B.BID_PRICE, B.DAYS FROM BID B WHERE B.p_id="+req.body.pid+";";
	pool.getConnection(function(error,con){
	con.query(sql, function (err, result) {
				console.log(result);
			    res.json({result:JSON.parse(JSON.stringify(result))})
			});
	});
});

app.listen(4000, () => {
	console.log('Started on port 4000');
});
