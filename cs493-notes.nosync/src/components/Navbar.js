import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../config/firebaseConfig'

class Navbar extends Component {
  state = {
    user: null,
    isLoaded: false
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user,
        isLoaded: true
      })
    })
  }

  renderNav = () => {
    return this.state.user !== null ? (
      <nav className="nav-wrapper teal dearken-1">
        <div className="container">
          <h5 className="brand-logo">Notes</h5>
          <ul className="right">
            <li>
              <Link to="/crud">CRUD</Link>
            </li>
            <li>
              <Link to="/dashboard">{this.state.user.email.toUpperCase()}</Link>
            </li>
          </ul>
        </div>
      </nav>
    ) : (
      <nav className="nav-wrapper teal dearken-1">
        <div className="container">
          <h5 className="brand-logo">Notes</h5>
        </div>
      </nav>
    )
  }

  render() {
    return <div>{this.state.isLoaded ? this.renderNav() : null}</div>
  }
}

export default Navbar
