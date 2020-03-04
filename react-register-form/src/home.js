import React, { Component } from 'react'
import App from './components/App'
import Login from './components/Login'
import './App.css'

export default class TodoList extends Component {
  constructor() {
    super()
    this.state = {
      login: false,
      register: false,
      home: true
    }
  }
  handleRegister = () => {
    this.setState({
      register: true, home: false
    })
  }
  handleLogin = () => {
    this.setState({
      login: true,
      home: false
    })

  }
  render() {
    return (
      <div>
        {this.state.home ?
          <div>
            <button onClick={this.handleRegister}>REGISTER</button> <br></br>
            <button onClick={this.handleLogin}>LOGIN</button>
          </div> : null}
        {this.state.register ? <App /> : null}
        {this.state.login ? <Login /> : null}
      </div>
    )
  }
}
