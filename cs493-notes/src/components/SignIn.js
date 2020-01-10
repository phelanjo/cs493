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

  googleLogin = (e) => {
    e.preventDefault()
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
            <button className="btn teal darken-1 left" onClick={this.signIn}>Sign In</button>
          </div>
          <div>
            <button className="btn teal darken-1 right" onClick={this.signUp}>Sign Up</button>
          </div>
          <br/><br/><br/>
          <div className="center">
            <div>
              <button className="btn teal darken-1" onClick={this.googleLogin}>Google Sign In</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn