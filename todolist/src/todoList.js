import React from 'react'

class TodoApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            array: [],
            text: ""
        }
        this.handleAdd = this.handleAdd.bind(this)
    }
    handleAdd(id) {
        this.setState({
            text: id.target.value,
        })
        console.log(this.state.text)
    }


    render() {
        return (
            <div>
                <form >
                    <input type="text" onChange={this.handleAdd} />
                    <button value="submit">Add</button>
                </form>
            </div>
        )
    }

}









export default TodoApp