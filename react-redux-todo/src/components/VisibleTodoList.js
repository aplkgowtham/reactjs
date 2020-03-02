import { connect } from "react-redux";
import TodoList from '../containers/TodoList'

function mapStateToProps(state) {
    return {
        todos: state
    };
};
function mapDispatchToProps(dispatch) {
    return {
        onTodoClick: id => dispatch({ type: "TOGGLE_TODO", id })
    };
};


const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList
