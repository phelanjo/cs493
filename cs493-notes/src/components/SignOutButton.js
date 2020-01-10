import React, { Component } from 'react'
import firebase from 'firebase/app'

class SignOutButton extends Component {

  logout = () => {
    firebase.auth().signOut()
      .then(() => {

      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <button className="btn red" onClick={this.logout}>Sign Out</button>
      </div>
    )
  }
}

export default SignOutButton