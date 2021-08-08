import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  state = {
    credentials: { // setting initial credentials as empty
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: { // after submitting login credentials, setting to state
        ...this.state.credentials,
        [e.target.name]: e.target.value // passed in from input on the form below
      }
    });
  };

  login = e => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/login', this.state.credentials) //sends login and password submitted to server to verified then logs server response
    .then(req => {
      console.log(req)
      localStorage.setItem("token", req.data.token); // receives token from server and sets it to localStorage to be read by restricted pages before granting access to restricted data. "data.token" comes from the stucture of the server which may vary.
      this.props.history.push("/protected"); // after setting token, routes user to specified page "protected" in this case
      this.props.setIsLoggedIn(true);
    })
    .catch( err => {
      console.log(err)
    })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;