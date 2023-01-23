import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import initialTodos from '../todos.json';
import TodoList from './TodoList';
import Container from './Container';
import TodoEditor from './TodoEditor';
import Filter from './Filter';
import Modal from './Modal';
import IconButton from './IconButton';
import { ReactComponent as AddIcon } from '../icons/add.svg';
class App extends Component {
  state = {
    todos: [],
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    console.log('App componenDidMount');
    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);

    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    if (nextTodos !== prevTodos) {
      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }

    if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
      this.toggleModal();
    }
  }

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

    // this.toggleModal();
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
        <IconButton onClick={this.toggleModal} aria-label="add todo">
          <AddIcon fill="white" />
        </IconButton>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={this.addTodo} />
          </Modal>
        )}
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
