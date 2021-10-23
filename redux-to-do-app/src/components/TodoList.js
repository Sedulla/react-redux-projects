import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggle, delTodo } from '../redux/todos/todosSlice';

function TodoList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.todos.items);

  const handledelTodo = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(delTodo(id));
    }
  };
  return (
    <ul className="todo-list">
      {items.map((item) => (
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
