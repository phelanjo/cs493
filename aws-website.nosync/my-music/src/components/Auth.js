import React, { Component } from 'react';
import firebase from '../config/firebaseConfig';

class Auth extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    firebase.auth().onAuthStateChanged(user => {
      if (this._isMounted) {
        this.setState({
          user,
          isLoaded: true
        });

        this.state.user !== null
          ? this.setState({ isLoggedIn: true })
          : this.setState({ isLoggedIn: false });

        this.sendAuthData();
      }
    });

    this.state = {
      isLoggedIn: false,
      isLoaded: false,
      user: null
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  sendAuthData = () => {
    this.props.getAuthData({
      user: this.state.user,
      isLoggedIn: this.state.isLoggedIn
    });
  };

  googleLogin = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(result => {
        this.setState({
          user: result.user,
          isLoggedIn: true
        });
        this.sendAuthData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          user: null,
          isLoggedIn: false
        });
        this.sendAuthData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderLogIn() {
    return (
      <button className="btn-small teal darken-3" onClick={this.googleLogin}>
        Login with Google
      </button>
    );
  }

  renderLogOut() {
    return (
      <button className="btn-small teal darken-3" onClick={this.logout}>
        Log Out
      </button>
    );
  }

  render() {
    const { isLoggedIn, isLoaded } = this.state;

    return isLoaded ? (
      <div>{isLoggedIn ? this.renderLogOut() : this.renderLogIn()}</div>
    ) : null;
  }
}

export default Auth;
