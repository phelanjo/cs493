import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../config/firebaseConfig'

class GoogleLoginButton extends Component {
  state = {
    user: null
  }

  googleLogin = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(googleProvider).then((result) => {
      this.setState({
        user: result.user
      })
      console.log(this.state.user.email)
    }).catch((err) => {
      console.log(err)
    })
  }


  render() {
    if (this.state.user) return <Redirect to='/' />
    
    return (
      <div>
        <button className="btn red" onClick={this.googleLogin}>Google Sign In</button>
      </div>
    )
  }
}

export default GoogleLoginButton