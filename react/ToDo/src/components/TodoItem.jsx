import React, { useState, useEffect } from 'react';
import './styles/TodoItem.css';

function TodoItem({ task, deleteTask, updateTaskDone }) {

  const [done, setDone] = useState(false);

  const handleDeleteItem = (e) => {
    e.preventDefault();
    deleteTask(task.id);
  }

  const handleDone = () => {
    setDone(!done)
    updateTaskDone(task.id, !done);
  }

  useEffect(() => {
    setDone(task.done); // Обновляем состояние, когда task.done изменяется извне
  }, [task.done]);

  return (
    <li className='todo-list__item item'>
      <div className='item__wrapper'>
          <input className='item__input' type='checkbox' onChange={handleDone} checked={done} />
        {done ? 
          <p className='item__descr'><s>{task.descr}</s></p>
          :
          <p className='item__descr'>{task.descr}</p>
        }
      </div>
      <button className='btn item__btn btn-reset' type='button' onClick={handleDeleteItem}>Удалить дело</button>
    </li>
  );
}

export default TodoItem;
