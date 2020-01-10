import React, { Component } from 'react'
import firebase from '../config/firebaseConfig'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    user: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  googleLogin = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(googleProvider).then((result) => {
      this.setState({
        user: result.user,
        email: result.user.email
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  signIn = (e) => {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.setState({
          user
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  signUp = () => {
    this.props.history.push('/signup')
  }

  render() {
    if (this.state.user) return <Redirect to={{pathname: '/dashboard', state: { email: this.state.email }}} />
    return (
      <div className="container">
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
          </form>
          <div>
            <button className="btn blue right" onClick={this.signUp}>Sign Up</button>
          </div>
        </div>
        <br/><br/><br/>
        <div className="center">
          <div>
            <button className="btn red" onClick={this.googleLogin}>Google Sign In</button>
          </div>
        </div>
      </div>
    )
  }
}

export default SignIn