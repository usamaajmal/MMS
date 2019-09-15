const mongoose = require('Mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
	userName : {
		type:String,
		required:true
	},
	email : {
		type:String,
		required:true,
		unique:true
	},
	password : {
		type:String,
		required:true
	},
	type : {
		type:String,
		required:true
	}
});

let user = module.exports = mongoose.model('User',userSchema);

/*CRUD OPERATIONS*/
module.exports.addUser = (data,callback) =>{
	bcrypt.hash(data.password, 10, function(err, hash){
		if(err) {
		   return res.status(500).json({
			  error: err
		   });
		}
		else {
		   let add ={
			  email: data.email,
			  password: hash,
			  userName: data.userName,
			  type: data.type    
		   };
		   user.create(add,callback)
		}
	 });
}

module.exports.signin = (data,callback) => {
	console.log("data " +data)

	user.findOne({email: data.email},callback)
    
    
}


module.exports.getUsers = (callback,limit) => {
	user.find(callback).limit(limit);
}

module.exports.getUserById = (id,callback) =>{
	user.findById(id,callback);
}

module.exports.editUser = (id,data,option,callback) =>{
	let query = {_id:id};
	let update = {
		userName : data.userName,
		email : data.email,
		password : data.password,
		type : data.type
		
	}
	user.findOneAndUpdate(query,update,option,callback);
}

module.exports.removeUser = (id,callback) =>{
	let query = {_id:id};
	user.findOneAndRemove(query,callback);
}

module.exports.findByEmail = (email,callback)=>{
	query = {'email':email}
	user.findOne(query,callback);
}