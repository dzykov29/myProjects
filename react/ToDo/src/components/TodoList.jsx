import React from 'react';
import TodoItem from './TodoItem';
import './styles/TodoList.css';

function TodoList({ tasks, deleteTask, taskDone }) {


  return (
    <ul className='list-reset todo-list'>
      {tasks.map(task => <TodoItem deleteTask={deleteTask} updateTaskDone={taskDone} key={task.id} task={task} />
      )}
    </ul>
  );
}

export default TodoList;
