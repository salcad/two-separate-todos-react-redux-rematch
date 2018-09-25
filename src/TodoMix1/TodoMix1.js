import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import '../Todo.css';

import { TodoList } from '../TodoShared/TodoShared'
import { Link } from '../TodoShared/TodoShared'
import { getVisibleTodos } from '../TodoShared/TodoShared'
import { VisibilityFilters } from '../TodoShared/TodoShared'

export const TodoMix1 = () => {
  return(
    <div>
       <ConTodoList />
       <ConNewTodoItem />
       <Footer />
    </div>
    );
}

const mapStateToPropsLink = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter1
});

const mapDispatchToPropsLink = ({ visibilityFilter1: { set } }, ownProps) => ({
  onClick: () => set(ownProps.filter)
});

const ConLink = connect(mapStateToPropsLink, mapDispatchToPropsLink)(Link);

const Footer = () => (
  <div>
    <span>Show: </span>
    <ConLink filter={VisibilityFilters.SHOW_ALL}>
      All
    </ConLink>
    <ConLink filter={VisibilityFilters.SHOW_ACTIVE}>
      Active
    </ConLink>
    <ConLink filter={VisibilityFilters.SHOW_COMPLETED}>
      Completed
    </ConLink>
  </div>
)

const mapStateToPropsTodoList = state => ({
  todos: getVisibleTodos(state.todos1, state.visibilityFilter1)
});

const mapDispatchToPropsTodoList = ({ todos1: { toggle } }) => ({
  toggleTodo: id => toggle(id)
});

const ConTodoList = connect(mapStateToPropsTodoList, 
  mapDispatchToPropsTodoList)(TodoList);

class NewTodoItem extends React.Component {

    constructor(props){
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
    }
  
    componentDidMount(){
      ReactDOM.findDOMNode(this.refs.itemName).focus();
    }
  
    render(){
      return (
      <form onSubmit={this.onSubmit}>
        <input ref="itemName" type="text" />
        <input type="submit" value="Submit" />
      </form>);
    }
  
    onSubmit(event){
      event.preventDefault();
      var input = ReactDOM.findDOMNode(this.refs.itemName)
      var newItem = input.value;
      this.props.dispatch.todos1.add(newItem);
      input.value = '';
    }
    
  }

const ConNewTodoItem = connect()(NewTodoItem);

