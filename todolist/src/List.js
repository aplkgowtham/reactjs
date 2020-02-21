import React from "react";
import "./App.css";

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
            ],
            text: ""
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.markItemCompleted = this.markItemCompleted.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    handleTextChange(event) {
        this.setState({ text: event.target.value });
    }

    handleAddItem(event) {
        event.preventDefault();
        var newItem = {
            id: Date.now(),
            text: this.state.text,
            done: false
        };
        console.log(newItem.id);
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: ""
        }));
    }

    markItemCompleted(itemId) {
        var updatedItems = this.state.items.map(item => {
            if (itemId === item.id) {
                item.done = !item.done;
            }
            return item;
        });
        this.setState({
            items: [].concat(updatedItems)
        });
    }

    handleDeleteItem(itemId) {
        var updatedItems = this.state.items.filter(item => {
            return item.id !== itemId;
        });
        this.setState({
            items: [].concat(updatedItems)
        });
    }

    render() {
        return (<div className="App">
            <h3>To Do List</h3>

            <form id="id">
                <div>
                    <input type="text" placeholder="Enter new to-do task...." onChange={this.handleTextChange} value={this.state.text} />
                    <button onClick={this.handleAddItem} disabled={!this.state.text}> + </button>
                </div>
            </form>
            <div id="id">
                <TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} onDeleteItem={this.handleDeleteItem} />
            </div>
        </div>);
    }
}

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.markCompleted = this.markCompleted.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditing = this.handleEditing.bind(this);

        this.state = { editing: false }
    }

    componentDidMount() {
        this.setState({ textChange: this.props.text })
    }

    markCompleted() {
        this.props.onItemCompleted(this.props.id);
    }

    deleteItem() {
        this.props.onDeleteItem(this.props.id);
    }

    handleEditing() {
        this.setState({ editing: true, textChange: this.state.text });
    }

    handleEdit(e) {
        var textChange = e.target.value;
        this.setState({ textChange: textChange });
    }

    handleKey(e) {
        this.setState({ editing: false });
    }

    render() {
        var itemClass = "form-check todoitem " + (this.props.completed ? "done" : "undone"); // conditional rendering

        var view = {};
        var edit = {};

        if (this.state.editing) {
            view.display = 'none';
        } else {
            edit.display = 'none';
        }

        return (
            <li className={itemClass} ref={li => (this._listItem = li)}>
                <div style={view}>
                    <label className="form-check-label">
                        <input type="checkbox" onChange={this.markCompleted} />
                        {
                            this.state.textChange
                        }
                    </label>
                    <button type="button" onClick={this.deleteItem}> - </button>
                    <button type="button" onClick={this.handleEditing}> Edit </button>
                </div>
                <div style={edit}>
                    <input type="text" onChange={this.handleEdit} className="text" value={this.state.textChange} />
                    <button type="button" onClick={this.handleKey}> Done </button>
                </div>
            </li>
        );
    }
}

class TodoList extends React.Component {
    render() {
        return (
            <ul> {
                this.props.items.map(item => (
                    <TodoItem key={item.id} id={item.id} text={item.text} completed={item.done} onItemCompleted={this.props.onItemCompleted} onDeleteItem={this.props.onDeleteItem} onchangeItem={this.props.onchangeItem} onedit={this.props.onedit} />
                ))
            }
            </ul>);
    }
}

export default TodoApp;
