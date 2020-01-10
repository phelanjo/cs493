import React, { Component } from 'react'

import SignOutButton from './SignOutButton'

class Dashboard extends Component {
  render() {
    return (
      <div className="center">
        <SignOutButton />
      </div>
    )
  }
}

export default Dashboard