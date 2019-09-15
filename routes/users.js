const express = require("Express");
const router = express.Router();
const user = require("../models/user")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Register user
router.post('/signup',(req,res)=>{
	let obj = req.body;
	user.addUser(obj,(err,user)=>{
		if(err){
			let message = err;
			if (err.name === 'MongoError' && err.code === 11000) {
				message = "email already exists";
			}
			res.status(500).json({
				error: message
			 });
		}
		else{
			console.log(user);
			res.status(200).json({
			   success: 'New user has been created',
			   data: user
			});
		}
		
	 })
})

//Sign In
router.post('/signin',(req, res) => {
	let obj = req.body;
	user.signin(obj, (err,user) => {
		
		if(err) {
			res.statusMessage = err;
    		res.status(401).end();
		}
		
		else if(!user){
			res.statusMessage = 'email not found';
    		res.status(401).end();
		}

		else {
			bcrypt.compare(obj.password, user.password, (err, result) => {
				if(err) {	
					res.statusMessage = err;
					res.status(401).end();
				}

				else if(!result) {
					console.log("passeord err");
					res.statusMessage = 'incorrect password';
					res.status(401).end();
				}
				else{
					const JWTToken = jwt.sign({
						email: user.email,
						_id: user._id,
						userName:user.userName,
						type: user.type
					},'secret', { expiresIn: '30m'});//Time 30 Minutes for the session
					
					return res.status(200).json({
						success: 'Welcome to MMS',
						token: JWTToken,
						_id: user._id,
						type: user.type,
						userName: user.userName
					});
				}		   
			});
		}
	})
});




// get all users
router.get('/',(req,res)=>{
	user.getUsers((err,users)=>{
		 if (err) {
		 	console.log("Error at \"Get Users\"");
		 	res.statusMessage = err;
			res.status(401).end();
		 }
		 console.log("retrieved all \"Users\"");
		 res.send(users);
	})
})

// get a specific user
router.get('/:id',(req,res)=>{
	let id = req.params.id;
	user.getUserById(id,(err,user)=>{
		 if (err) {
		 	console.log("Error at \"Get User By Id\"");
		 	res.statusMessage = err;
			res.status(401).end();
		 }
		 console.log("retrived the \"specified User\"");
		 res.send(user);
	})
})

//edit a user
router.put('/:id',(req,res) => {
		let id = req.params.id;
		let edit = req.body;
		user.editUser(id,edit,{},(err,user) =>{
			if(err){
				console.log("Error at \"Edit User\"");
				res.statusMessage = err;
				res.status(401).end();
			}
			console.log("\"User\" edited");
			res.send(user);
		})
})

//delete a user
router.delete('/:id',(req,res) =>{
	let id = req.params.id;
	user.removeUser(id,(err,user) =>{
		if(err){
			console.log("Error at \"Delete User\"");
			res.statusMessage = err;
			res.status(401).end();
		}
		console.log("\"User\" deleted");
		res.send(user);
	})
})

module.exports = router;
