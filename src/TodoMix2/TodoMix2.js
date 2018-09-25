import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import '../Todo.css';

import { TodoList } from '../TodoShared/TodoShared'
import { Link } from '../TodoShared/TodoShared'
import { getVisibleTodos } from '../TodoShared/TodoShared'
import { VisibilityFilters } from '../TodoShared/TodoShared'

export const TodoMix2 = () => {
  return(
    <div>
       <ConTodoList />
       <ConNewTodoItem />
       <Footer />
    </div>
    );
}

const mapStateToPropsLink = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter2
});

const mapDispatchToPropsLink = ({ visibilityFilter2: { set } }, ownProps) => ({
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
  todos: getVisibleTodos(state.todos2, state.visibilityFilter2)
});

const mapDispatchToPropsTodoList = ({ todos2: { toggle } }) => ({
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
      this.props.dispatch.todos2.add(newItem);
      input.value = '';
    }
    
  }

const ConNewTodoItem = connect()(NewTodoItem);

