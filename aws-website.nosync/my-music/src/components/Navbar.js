import React, { Component } from 'react';

class Navbar extends Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    this.setState({
      isLoaded: true
    });
  }

  renderNav = () => {
    return (
      <nav className="nav-wrapper teal darken-3">
        <div className="container">
          <h5 className="brand-logo">Spootify</h5>
        </div>
      </nav>
    );
  };

  render() {
    return <div>{this.state.isLoaded ? this.renderNav() : null}</div>;
  }
}

export default Navbar;
