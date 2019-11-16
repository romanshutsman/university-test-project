import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase';

import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import SignIn  from './SignIn'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Input from '@material-ui/core/Input';


const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  state = {
    email: '',
    password: '',
    error: null,
  };
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
 handleSubmit = (event) => {
   event.preventDefault();
   console.log(this.state)
    const { email, password } = this.state;

 firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user)
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error)
        this.setState({ error: error });
      });
  };
  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;
    return (
      <div className="App">
              <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
        {
            user
              ? <p>Hello, {user.displayName}</p>
              : <p>Please sign in.</p>
          }
          </Typography>
          {
            user
              ? <Button variant="contained" color="primary" onClick={signOut}>Sign out</Button>
              : <Button variant="contained" color="primary" onClick={signInWithGoogle}>Sign in with Google</Button>
          }
        </Toolbar>
      </AppBar>
        {/* <SignIn /> */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.state.error && <p>{this.state.error.message}</p>}
          <form onSubmit={this.handleSubmit}>
             <Input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} />
             <Input
               type="password"
               name="password"
               placeholder="Password"
               value={this.state.password}
               onChange={this.handleInputChange}
             />
             <Button type='submit' children="Log In" />
           </form>

        </header>
      </div>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);