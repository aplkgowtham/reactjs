import React, { Component } from 'react'
import '../App.css'
import * as ApiService from '../APIService'
import { connect } from 'react-redux'

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedId: null,
            editing: true
        }
    }
    handleCompleted = async (props) => {
        console.log(props)
        let id = props[0]
        let isCompleted = props[1]
        let user_id = props[2]
        let values = []
        values.push(id, isCompleted, user_id, this.props.dispatch)
        await ApiService.isCompleted(values)
    }

    handleEdit = async (props) => {
        console.log('handledit', props[0])
        this.setState({
            selectedId: props[0],
            textChange: props[1]
        })
    }

    handleDone = async (props) => {
        console.log(props)
        let id = props[0]
        let message = props[2]
        let user_id = props[1]
        let values = []
        values.push(id, user_id, message, this.props.dispatch)
        await ApiService.messageChange(values)
        this.setState({
            selectedId: null
        })
    }

    handleDelete = async (props) => {
        console.log(props)
        let values = []
        values.push(props[0], props[1], this.props.dispatch)
        await ApiService.deleteMessage(values)
    }
    handleChange = async (e) => {
        let textChange = e.target.value
        this.setState({
            textChange: textChange
        })
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.todos.map(
                        todo => {
                            if (this.state.selectedId !== todo.id)
                                return (
                                    <li key={todo.id}>
                                        <input type="checkbox" onClick={() => { this.handleCompleted([todo.id, todo.isCompleted, todo.user_id]) }} />
                                        <label style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>

                                            {todo.message}
                                        </label>
                                        <button onClick={() => { this.handleEdit([todo.id, todo.message]) }} >Edit</button>
                                        <button onClick={() => { this.handleDelete([todo.id, todo.user_id]) }} >Delete</button> <br /><br />
                                    </li>)
                            else return (
                                <div key={todo.id}>
                                    <input type="text" value={this.state.textChange} onChange={this.handleChange} />
                                    <button onClick={() => { this.handleDone([todo.id, todo.user_id, this.state.textChange,]) }}>Done</button>
                                </div>
                            )
                        }
                    )}
                </ul>
            </div>
        )
    }
}


export default connect()(TodoList)
