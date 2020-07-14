import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/img/ImageLinkForm';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
 apiKey:'189b4909cc674eb3865b288890ea59c9'
});


const particles0ptions ={
  particles: {
      number:{
        value:200,
        density: {
          enable: true,
          value_area:947
        }
      }
    }
  }



class App extends Component {
constructor(){
  super()
  this.state={
    input:'',
    imageUrl:'',
    box:{},
    route: 'Signin',
    isSignedIn:false,
     //creating a state object that contains a user profile
    user: {
     id: '',
     name: '',
     email: '',
     entries: 0,
     joined: ''  
     }
    }
  }

  componentDidMount(){ //lifecyle runs before render!
    console.log('dimoiunt');
    fetch('http://localhost:3000/')
    .then(resp=> resp.json())
    .then(console.log)
  }

//return an object, this object 1º needs to figure out the 1º dot, 2º, 3º and 4º dot

/* in the normal way it gives us an error referent to acces-control-allow-origin */
/* so lets install the cors npm pakage, */

loadUser = (data) => { //this function is passed as a prop to the register component
  this.setState({user: {
       id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
  }})
}



calculateFaceLocation = (data) => {
const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
const image = document.getElementById('inputimage');
const width = Number(image.width);
const height = Number(image.height);
return {
  leftCol: clarifaiFace.left_col * width,
  topRow: clarifaiFace.top_row * height,
  rightCol: width - (clarifaiFace.right_col * width),
  bottomRow: height - (clarifaiFace.bottom_row * height)
   }
}



displayFacebox = (box) => {
  console.log(box);
  this.setState({box: box})
}

onInputChange = (event) =>{
  this.setState({input: event.target.value});
}

onButtonSubmit = () =>{
this.setState({imageUrl: this.state.input});
  app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
     this.state.input)
  .then(response=>{
    if (response) //if clarify give us a reponse
      { fetch('http://localhost:3000/image', { //then fetch localhost route image to inclement the users.entries
    method: 'put',  // information about put request
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ // sending the id request body parameter 
      id:this.state.user.id //and giving him a value with the state
    })   //the body will contain what we have in the state, but wemust stringify it first.
 }) 
    .then(response => response.json()) // we will get the return res.json(user.entries); or res.status(404).json('not found!')
    .then(count =>{
      this.setState(Object.assign(this.state.user, { entries : count}))
    })
      }
   this.displayFacebox(this.calculateFaceLocation(response))})
  .catch(err => console.log(err));
}

onRouteChange = (route) => {
  if(route === 'Signout') {
  this.setState({isSignedIn: false})
} else if (route === 'home') {
    this.setState({isSignedIn: true})
}
this.setState({route: route});
}

  render() {
    const { isSignedIn, imageUrl, route, box, user} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
        params={particles0ptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home' 
        ?  <div>
            <Logo />
            <Rank name={user.name}  entries={user.entries}/> {/*the 1º is the name of the proop passed, the second is the coresponding state here*/}
           <ImageLinkForm 
           onInputChange={this.onInputChange} 
           onButtonSubmit={this.onButtonSubmit} />
           <FaceRecognition box={box} imageUrl={imageUrl} />
       </div>
       : (
        route === 'Signin'
        ? <Signin onRouteChange ={this.onRouteChange}/> 
        : <Register loadUser={this.loadUser} onRouteChange ={this.onRouteChange}/> 
        )
     }
      </div>
    );
  }
}

export default App;
