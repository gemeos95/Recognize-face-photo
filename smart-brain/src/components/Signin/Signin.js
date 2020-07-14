import React from 'react';

class Signin extends React.Component {
  constructor(props){
    super(props);
    this.state={
      signInEmail:'',
      signInPassword:''
    }
  }

  onEmailChange = (event) =>{
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) =>{
    this.setState({signInPassword: event.target.value})
  }
/*
  onSubmitSignIn = () =>{ //sending the information to the server
 fetch('http://localhost:3000/signin', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email:this.state.signInEmail,
      password: this.state.signInPassword
    })   //the body will contain what we have in the state, but wemust stringify it first.
 }) 
 .then(response => response.json())
 .then(data => {
  if (data === 'success') {
this.props.onRouteChange('home');
  }
 })
  }
  */

   onSubmitSignIn = () =>{
    //console.log(this.state);//we get the array of the information name and password signIN!
    //now we have to send this information to the node server, to the body.req.parameters
     //in the server can be relative paths altough in the frontend must be the complete one!
    fetch('http://localhost:3000/signin',{//Fetch have 2 paramters the second describes wich request is
    method: 'post',
    headers :{'Content-Type': 'application/json'},
    body: JSON.stringify({ //we have to define and stringify the info on the body!
      email: this.state.signInEmail,  //remember to check the reqest name in node and state names in react
      password: this.state.signInPassword
    })
    }).then(response => response.json()) //we receive a response with is or "success" or "error login in"
      .then(data=>{
        if(data=== 'success'){this.props.onRouteChange('home');}
        if(data=== 'error loging in'){}
      }) //we receive what we define in res.send()

    } //dont forget it must be equal!!!
    
  

	render() {
    const { onRouteChange } = this.props;
     return(
    <article className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
<main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input onChange={this.onEmailChange} 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onChange={this.onPasswordChange} 
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
      </div>
    </fieldset>
    <div className="">
      <input 
      onClick={this.onSubmitSignIn} // just a funtion to get called to define the onRoute function
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      type="submit" 
      value="Sign in"/>
    </div>
    <div className="lh-copy mt3">
      <p onClick={() => onRouteChange('Register')} className="f6 link dim black db pointer">Register</p>
    </div>
  </div>
</main>
</article>
 );
  }
}

export default Signin;