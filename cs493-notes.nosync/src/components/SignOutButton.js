import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from '../config/firebaseConfig'

class SignOutButton extends Component {
  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <button className="btn teal darken-1" onClick={this.logout}>
          Sign Out
        </button>
      </div>
    )
  }
}

export default withRouter(SignOutButton)
