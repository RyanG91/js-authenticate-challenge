import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const api = 'http://localhost:3000'

const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
  )
}

const LoginForm = (props) => {
  return (
    <Fragment>
      <h2>Login</h2>
      <form onSubmit={props.submitLogin}>
        <label htmlFor="email">Email: </label>
        <input id="email" onChange={props.emailChanged}/>
        <label htmlFor="pass">Password: </label>
        <input id="password" onChange={props.passwordChanged}/>
        <button type="submit">Login</button>
      </form>
    </Fragment>
  )
}

const LogoutForm = (props) => {
  return (
    <Fragment>
      <form onSubmit={props.submitLogout}>
        <button type="submit">Logout</button>
      </form>
    </Fragment>
  )
}

const RegisterForm = (props) => {
  return (
    <Fragment>
      <form onSubmit={props.submitRegister}>
        <h2>Register!!</h2>
        <label htmlFor="email">Email: </label>
        <input id="email"></input>
        <label htmlFor="pass">Password:</label>
        <input id="pass"></input>
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  )
}

class App extends Component {
  state = {
    user: '',
    password: '',
    loggedIn: false,
    register: false
  }

  emailChanged = (e) => {
    this.setState({ user: e.target.value })
  }

  passwordChanged = (e) => {
    this.setState({ password: e.target.value })
  }

  login = (e) => {
    e.preventDefault()
    console.log('Login')
    // const user = document.querySelector('user').value
    axios.post("http://localhost:3000/login", {
       email: this.state.user,
       password: this.state.password
     }).then((res) => {
       console.log(res)
       if (res.status === 200) {
         this.setState({ loggedIn: true })
       } else {
         console.log('Test')
         // Do some error handling
       }
     })
  }

  logout = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3000/logout").then((res) => {
         console.log('log out')
         this.setState({ loggedIn: false })
     })
  }

  register = (e) => {
    // axios.post("http://localhost:3000/register").then((res) => {
         console.log('register')
         this.setState({ register: true })
     // })
  }

  

  render() {
    if (this.state.loggedIn) {
    return (
      <div className="App">
        <Header />
        <h2> You are logged in!!</h2>
        <LogoutForm submitLogout={this.logout}/>
      </div>
    )
  } else if (this.state.register) {
    return(
      <div className="App">
        <Header />
        <RegisterForm />
      </div>
    )
  } else {
      return (
        <div className="App">
          <Header />
          <LoginForm submitLogin={this.login} emailChanged={this.emailChanged} passwordChanged={this.passwordChanged} />
          <button onClick={this.register}>Register</button>
        </div>
      )
    }
  }
}
export default App;
