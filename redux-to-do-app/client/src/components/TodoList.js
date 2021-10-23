import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggle,
  delTodo,
  selectFilteredTodos,
  getTodoAsync,
} from '../redux/todos/todosSlice';
import Error from './Error';
import Loading from './Loading';

function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);


  useEffect(() => {
    dispatch(getTodoAsync());
  }, [dispatch]);

  const handledelTodo = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(delTodo(id));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? 'completed' : ''}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => dispatch(toggle({ id: item.id }))}
            />
            <label>{item.title}</label>
            <button
              className="delete"
              onClick={() => handledelTodo(item.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
