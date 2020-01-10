import React, { Component } from 'react'
import firebase from '../config/firebaseConfig'

class SignUp extends Component {
  state = {
    signUpEmail: '',
    signUpPassword: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  clearForm = () => {
    document.getElementById('signUp').reset()
    this.setState({
      signUpEmail: '',
      signUpPassword: ''
    })
  }

  signUp = (e) => {
    e.preventDefault()
    this.clearForm()
    firebase.auth().createUserWithEmailAndPassword(this.state.signUpEmail, this.state.signUpPassword)
    .then(user => {
      console.log(user)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <form id="signUp" onSubmit={this.signUp}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="signUpEmail" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="signUpPassword" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn green" id="signUpButton">Sign Up</button>
          </div>
        </form>
      </div>
    )
  }
}

export default SignUp