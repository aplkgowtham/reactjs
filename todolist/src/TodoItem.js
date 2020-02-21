import React from 'react'
// import Button from './button.js'

class TodoItem extends React.Component {
    constructor(props) {
        super();
        this.state = { editing: false }
    }

    componentDidMount = () => {
        this.setState({ textChange: this.props.text })
    }

    markCompleted = () => {
        this.props.onItemCompleted(this.props.id);
    }

    deleteItem = () => {
        this.props.onDeleteItem(this.props.id);
    }

    handleEditing = () => {
        this.setState({ editing: true });
    }

    handleEdit = (e) => {
        var textChange = e.target.value;
        this.setState({ textChange: textChange });
    }

    handleKey = () => {
        this.setState({ editing: false });
    }

    handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            this.setState({ editing: false });
        }
    }

    render() {
        var itemClass = "form-check todoitem " + (this.props.completed ? "done" : "undone");

        var view = {};
        var edit = {};

        if (this.state.editing) {
            view.display = 'none';
        } else {
            edit.display = 'none';
        }

        return (
            <li className={itemClass}>
                <div style={view}>
                    <label>
                        <input type="checkbox" onChange={this.markCompleted} />
                        {
                            this.state.textChange
                        }
                    </label>
                    <button type="button" onClick={this.deleteItem}> X </button>
                    <button type="button" onClick={this.handleEditing}> Edit </button>
                </div>
                <div style={edit}>
                    <input type="text" onChange={this.handleEdit} onKeyDown={this.handleKeyPress} className="text" value={this.state.textChange} />
                    <button type="button" onClick={this.handleKey}> Done </button>
                </div>
            </li>
        );
    }
}

export default TodoItem
