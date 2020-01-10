import React, { Component } from 'react'
import firebase from '../config/firebaseConfig'

import GoogleLoginButton from './GoogleLoginButton'

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  signIn = () => {
    console.log(this.state.email)
    console.log(this.state.password)
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        console.log(user)
      })
      .catch(err => {
        console.log(err)
      })
  }

  signUp = () => {
    console.log('go to sign up screen from this button')
  }

  render() {
    return (
      <div>
        <form id="signIn">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn blue left" onClick={this.signIn}>Sign In</button>
          </div>
          <div className="input-field">
            <button className="btn blue right" onClick={this.signUp}>Sign Up</button>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn