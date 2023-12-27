import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ tasks, deleteTask }) {


  return (
    <ul className='list-reset todo-list'>
      {tasks.map(task => <TodoItem deleteTask={deleteTask} key={task.id} task={task} />
      )}
    </ul>
  );
}

export default TodoList;
