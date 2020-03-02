import React from "react";
import ReactDOM from "react-dom"
import { Provider } from "react-redux";
import { createStore } from "redux";
import todos from './reducer/reducer'
import './App.css'
import AddTodo from './components/AddTodo'
import VisibleTodoList from './components/VisibleTodoList'

ReactDOM.render(
    (
        <Provider store={createStore(todos)}>
            <div>
                <AddTodo />
                <VisibleTodoList />
            </div>
        </Provider>
    ),
    document.getElementById("root")
);

export default ReactDOM.render
