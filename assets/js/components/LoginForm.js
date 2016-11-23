'use strict';

import { h, render, Component } from 'preact';

class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setState({
      email: '',
      password: '',
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('/api/session', {
      method: "POST",
      data: {
        email: this.state.email,
        password: this.state.password,
      },
      credentials: 'include'
    }).then((r) => {
      if( r.status == 200 ) {
        this.props.onAuth();
        console.log("Authenticated!");
      }

      // TODO: Handle errors
    });
  }

  render() {
    return (
      <div class="block">
        <h2>Login</h2>
        <p>Please enter your credentials to access your Ana dashboard.</p>
        <form method="POST" onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label>Email address</label>
            <input type="email" name="email" onChange={this.linkState('email')} required="required" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" onChange={this.linkState('password')} required="required" />
          </div>
          <div class="form-group">
            <input type="submit" value="Sign in" />
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm
