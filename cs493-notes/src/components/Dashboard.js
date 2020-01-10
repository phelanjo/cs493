import React, { Component } from 'react'
import firebase from '../config/firebaseConfig'

import SignOutButton from './SignOutButton'

class Dashboard extends Component {
  render() {
    return (
      <SignOutButton />
    )
  }
}