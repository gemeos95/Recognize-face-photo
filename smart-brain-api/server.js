const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

/*
that was passed to params ended up in the URL query string. This is what it’s for.
So now you know: params for query string, data for request body. Simple.
*/
app.use(bodyParser.json());//because it´s amidlewear
app.use(cors());
const database ={
	users:[
	{
		id:'123',
		name:'john',
		email:'john@gmail.com',
		password:'cookies',
		entries: 0,
		joined: new Date()
	},
	{
		id:'124',
		name:'Sally',
		email:'sally@gmail.com',
		password:'bananas',
		entries: 0,
		joined: new Date()
	}
	]
}

app.get('/', (req,res) =>{
	res.send(database.users);
})
app.post('/signin', (req,res)=>{
	 //with this method we receive the json string this way!
	if (req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password){
		res.json('success');
		console.log('success');
	} else{
		res.status(404).json('error loging in');
	}
})

app.post('/register',(req,res)=>{
//we wanna grab the request.body and enter the information intot the database!
	const { email, name, password } = req.body;
	database.users.push({
		id:'125',
		name:name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})
app.get('/profile/:id', (req, res)=> { //we wanna get the user for their home page! {grabing the parameter id}
	//in get method we dont have a body to get, we just have params that may be passed via URL!!
	const { id } = req.params;
	let found = false;
	//look to our database and find the matching id if it mathes then, foreach is a lop that runs the same to all these array indexes!
	database.users.forEach(user =>{
		if(user.id === id){
			found = true;
			return res.json(user);
		} })

		if(!found){
		res.status(404).json('not found!')

	}

})

app.put('/image', (req,res) =>{ //we need to grab the user Id to then update their rank
	//finding the id of the user again to update the entries!
const { id } = req.body;
	let found = false;
	//look to our database and find the matching id if it mathes then, foreach is a lop that runs the same to all these array indexes!
	database.users.forEach(user =>{
		if(user.id === id){
			found = true;
			user.entries++
			return res.json(user.entries);
		} })

		if(!found){
		res.status(404).json('not found!')
	}

})

app.listen(3000, ()=> {
	console.log('app is running on port 3000');
})

/*what to do?
root route --> / --> this is working
/signin  --> POST = success/fail --> log in // we want to pass it inside of the body
/register --> POST = user  -->getting the user
(home sreeen having the ability to acess the profile of user)
/profile/:userId --> GET = return user information
(counting how many photos they have submited)
/image --> PUT (update on the user profile)
*/