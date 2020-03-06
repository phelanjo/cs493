import React, { Component } from 'react';
import firebase from '../config/firebaseConfig';

const SLS_ENDPOINT =
  'https://27kj3xgdai.execute-api.us-east-1.amazonaws.com/dev';

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

        const params = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: result.user.uid,
            email: result.user.email,
            display_name: result.user.displayName
          })
        };

        fetch(`${SLS_ENDPOINT}/save-user`, params)
          .then(res => res.json())
          .catch(err => {
            console.log(err);
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
