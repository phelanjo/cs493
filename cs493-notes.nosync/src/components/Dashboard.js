import React, { Component } from 'react'
import firebase from '../config/firebaseConfig'
import { Redirect } from 'react-router-dom'

import SignOutButton from './SignOutButton'

class Dashboard extends Component {
  _isMounted = false // src: https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component

  state = {
    user: null,
    isLoaded: false
  }

  componentDidMount() {
    this._isMounted = true

    firebase.auth().onAuthStateChanged(user => {
      if (this._isMounted) {
        this.setState({
          user,
          isLoaded: true
        })
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  renderDashboard = () => {
    return this.state.user === null ? (
      <Redirect to="/" />
    ) : (
      <div className="container center" id="dash">
        <h1>Hello {this.state.user.email}</h1>
        <div>
          <SignOutButton />
        </div>
      </div>
    )
  }

  render() {
    return <div>{this.state.isLoaded ? this.renderDashboard() : null}</div>
  }
}

export default Dashboard
