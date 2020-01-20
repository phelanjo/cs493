import React, { Component } from 'react'

import SignOutButton from './SignOutButton'

class Dashboard extends Component {
  render() {
    const email = this.props.location.state.email

    return (
      <div className="container center" id="dash">
        <h1>Hello {email}</h1>
        <div>
          <SignOutButton />
        </div>
      </div>
    )
  }
}

export default Dashboard
