import React, { Component } from 'react'
import Login from './Login'
export default class RegisterSuccess extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: false
        }
    }

    handleLogin = () => {
        this.setState({
            login: true
        })
    }

    render() {
        return (
            <div> {
                !this.state.login ? <div>
                    <h3>Registered Successfully and EmployeeID is {this.props.id} </h3>
                    <h4>Employee Name : {this.props.name}</h4>
                    <button onClick={this.handleLogin}>LOGIN</button>
                </div> :
                    <div>
                        <Login />
                    </div>
            }

            </div>
        )
    }
}
