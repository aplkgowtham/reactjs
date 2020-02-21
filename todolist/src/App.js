import React from "react";
import "./App.css";
import TodoList from './TodoList'

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  handleTextChange = (event) => {
    this.setState({ text: event.target.value });
  }

  handleAddItem = (event) => {
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

  markItemCompleted = (itemId) => {
    var updatedItems = this.state.items.map(item => {
      if (itemId === item.id) {
        item.done = !item.done;
      }
      return item;
    });
    this.setState({
      items: updatedItems
    });
  }

  handleDeleteItem = (itemId) => {
    var updatedItems = this.state.items.filter(item => {
      return item.id !== itemId;
    });
    this.setState({
      items: updatedItems
    });
  }

  render() {
    return (<div className="App">
      <h3>To Do List</h3>

      <form id="id">
        <div>
          <input type="text" placeholder="Enter the task " onChange={this.handleTextChange} value={this.state.text} />
          <button onClick={this.handleAddItem} disabled={!this.state.text}> Add </button>
        </div>
      </form>
      <div id="id">
        <TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} onDeleteItem={this.handleDeleteItem} />
      </div>
    </div>);
  }
}

export default TodoApp;
