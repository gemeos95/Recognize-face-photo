import React from 'react';

class Register extends React.Component {
 
  constructor(props){
    super(props);
    this.state={ //creating the states
      email:'',
      password:'',
      name:'',
      user:{
        id:'',
        name:'',
        email:'',
        password:'',
        entries: 0,
        joined: ''
      }
    }
  }

  emailFunction = (event) =>{
    this.setState({email: event.target.value}) //changing the states acording to what is putted on site
  }

  passwordFunction = (event) =>{
    this.setState({password: event.target.value})
  }

nameFunction = (event) =>{
    this.setState({name: event.target.value})
  }

/*
 onSubmitRegister = () =>{ //sending the information to the server
 fetch('http://localhost:3000/register', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email:this.state.email,
      password: this.state.password,
      name: this.state.name
    })   //the body will contain what we have in the state, but wemust stringify it first.
 }) 
 .then(response => response.json())  //if we get the user pack we will route change to home, 
 //to save the new data and comunicate with the server
 .then(user => { 
  //remember our register returns the data that corresponds to the last user formed
  if (user) { //so this data will be the user
  this.props.loadUser(user) //create a funtion and pass the user object to this
  //this function is the one that will change the states of user in the app.js
  this.props.onRouteChange('home'); //changing the state of route
  }
 })
  }
*/
onSubmitRegister = () =>{
  
    fetch('http://localhost:3000/register',{//Fetch have 2 paramters the second describes wich request is
    method: 'post',
    headers :{'Content-Type': 'application/json'},
    body: JSON.stringify({ //we have to define and stringify the info on the body!
      email: this.state.email,  //remember to check the reqest name in node and state names in react
      password: this.state.password,
      name: this.state.name,
    })
    }).then(response => response.json()) 
      .then(user=>{ //this data in res.send will be the user
        if(user){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })

    } //dont forget it must be equal!!!

render() { //returning the register box JXS
   //the fuction that change the state to home
	return(
		<article className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
<main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Register</legend>
    <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
        <input onChange={this.nameFunction} //run the function onNameChange
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="name"  id="name"/>
    </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input onChange={this.emailFunction} //run the function 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onChange={this.passwordFunction} //run the function onNameChange
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
      </div>
    </fieldset>
    <div className="">
      <input 
      onClick={this.onSubmitRegister} // just a funtion to get called to define the onRoute function
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      type="submit" 
      value="Register"/>
    </div>
  </div>
</main>
</article>
 );
}
}

export default Register;