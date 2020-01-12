import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="nav-wrapper teal dearken-1">
      <div className="container">
        <h5 className="brand-logo">Notes</h5>
        <ul className="right">
          <li><Link to="/crud">CRUD</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar