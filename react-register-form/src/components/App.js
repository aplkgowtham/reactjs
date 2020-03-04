import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import RegisterSuccess from './RegisterSuccess'
import Home from '../home'
export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            mob: '',
            email: '',
            designation: '',
            pass: '',
            save: true,
            home: false,
            login: false
        }
    }
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = async e => {
        e.preventDefault();
        let email = this.state.email
        var mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mailformat)) {
            try {
                let response_Mail = await axios.get(`http://localhost:9001/mail?email=${this.state.email}`)
                if (!response_Mail.data.result[0]) {
                    let response = await axios.post('http://localhost:9001/users', this.state)
                    this.setState({
                        save: false,
                        login: true,
                        id: response.data.result[0].empID
                    })
                }
                else {
                    alert('Email id Exists')
                    this.setState({
                        name: '',
                        mob: '',
                        email: '',
                        designation: '',
                        pass: '',

                    })
                }

            }
            catch (error) {
                alert(error)
            }
        }
        else {
            alert('enter valid email')
        }
    }

    handleHome = () => {
        this.setState({
            home: true,
            save: false,
        })
    }
    render() {
        return (
            <div>
                {this.state.save ? <div>
                    <h1>Registration Form</h1>
                    <div>
                        <form onSubmit={this.submitHandler} >
                            <input type="text" required placeholder="enter the name" value={this.state.name} name="name" onChange={this.changeHandler} /> <br />
                            <input type="number" required placeholder="enter the Mobile number" value={this.state.mob} name="mob" onChange={this.changeHandler} /> <br />
                            <input type="text" required placeholder="enter the mail" value={this.state.email} name="email" onChange={this.changeHandler} /> <br />
                            <input type="text" required placeholder="enter the designation" value={this.state.designation} name="designation" onChange={this.changeHandler} /> <br />
                            <input type="password" required placeholder="enter the password" value={this.state.pass} name="pass" onChange={this.changeHandler} /> <br />
                            <button >Submit</button>
                        </form>
                        <button onClick={this.handleHome}>Home</button>
                    </div>
                </div> : null}
                <div>{this.state.login ? <RegisterSuccess id={this.state.id} name={this.state.name} /> : null}</div>
                <div>{!this.state.home ? null : <div> <Home /></div>}</div>

            </div>
        )
    }
}
