import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import Home from '../home'

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            pass: '',
            empId: null,
            empName: '',
            empDesignation: '',
            empMob: '',
            empMail: '',
            home: false,
            display: false,
            login: false
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = async e => {
        e.preventDefault();
        try {
            let response = await axios.get(`http://localhost:9001/login?email=${this.state.name}&pass=${this.state.pass}`)
            if (!response.data.err) {
                let temp = response.data.result[0]
                this.setState({
                    empId: temp.empID,
                    empName: temp.empName,
                    empDesignation: temp.empDesignation,
                    empMob: temp.empMob,
                    empMail: temp.empMail,
                    display: true,
                    login: true
                })
            }
            else {
                alert("Incorrect UserName or Password")
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    handleHome = () => {
        this.setState({
            home: true,
            display: false,
            login: true
        })
    }
    render() {
        return (
            <div>
                {!this.state.login ?
                    <div>
                        <h1>LOGIN</h1>
                        <form onSubmit={this.submitHandler}>
                            <input type="text" placeholder="enter the username" name="name" value={this.state.name} onChange={this.changeHandler} /> <br />
                            <input type="password" placeholder="enter the password" name="pass" value={this.state.pass} onChange={this.changeHandler} /> <br />
                            <button>Submit</button>
                        </form>
                        <button onClick={this.handleHome}>Home</button>
                    </div> : null}
                <div>{this.state.display ? <div>
                    EMPID : {this.state.empId} <br />
                    EMP NAME : {this.state.empName} <br />
                    EMP MOB{this.state.empMob} <br />
                    EMP DESIGNATION{this.state.empDesignation} <br />
                    EMP MAIL : {this.state.empMail}
                </div> : null}</div>
                <div>{!this.state.home ? null : <div> <Home /></div>}</div>


            </div>
        )
    }
}
