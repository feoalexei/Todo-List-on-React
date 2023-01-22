import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import initialTodos from '../todos.json';
import TodoList from './TodoList';
import Container from './Container';
import TodoEditor from './TodoEditor';
import Filter from './Filter';
import Modal from './Modal';

class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  addTodo = text => {
    console.log(text);

    const todo = {
      id: nanoid(),
      text,
      completed: false,
    };

    this.setState(prevState => ({
      todos: [todo, ...prevState.todos],
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    console.log(todoId);

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFiler = filter.toLowerCase();
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFiler)
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;
    return todos.reduce((acc, todo) => (todo.completed ? acc + 1 : acc), 0);
  };

  render() {
    const { todos, filter, showModal } = this.state;

    const totalTodosCount = todos.length;
    const completedTodosCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        <button type="button" onClick={this.toggleModal}>
          Open Modal
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <h2>This is a Modal content as children</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore consequuntur dolor quidem aliquam ex non ratione, alias
              id omnis aliquid provident, deserunt voluptates. Optio placeat,
              deserunt facilis beatae dolores assumenda rerum, voluptates quia
              nostrum, nobis cumque inventore et minima necessitatibus?
            </p>
            <button type="button" onClick={this.toggleModal}>
              Close Modal
            </button>
          </Modal>
        )}
        <TodoEditor onSubmit={this.addTodo} />
        <Filter value={filter} onChange={this.changeFilter} />
        <div>
          <p>Total todos: {totalTodosCount}</p>
          <br></br>
          <p>Completed todos: {completedTodosCount}</p>
        </div>
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;
