import React, { Component } from 'react'
import { connect } from "react-redux";
import * as ApiService from '../APIService'
import AddMessage from './AddMessage'

export default class AddTodo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            edit: true
        }
    }
    handleUser = async (e) => {
        let id = e.target.elements.id.value;
        let name = e.target.elements.name.value;
        e.preventDefault();
        let values = [id, name, this.props.dispatch]
        console.log(values)
        let response = await ApiService.apiPostUser(values)
        console.log('new', response)
        this.setState({
            id: id,
            edit: false
        })
    }

    render() {
        let view = {};
        let hide = {};

        if (this.state.edit) {
            view.display = 'none';
        } else {
            hide.display = 'none';
        }
        return (
            <div>
                <div style={hide}>
                    <form onSubmit={this.handleUser}>
                        <input type="number" required placeholder="enter id" name="id" /> <br /><br />
                        <input type="text" required placeholder="enter the name" name="name" /> <br /> <br />
                        <button>Submit</button> <br />
                    </form>
                </div>
                <div style={view}>
                    <AddMessage id={this.state.id} />
                </div>

            </div >
        )
    }
}


AddTodo = connect()(AddTodo)
