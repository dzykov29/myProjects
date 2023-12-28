import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import Form from './components/Form';

function App() {
  const [todoTasks, setTodoTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTodoTasks((prevTasks) => [...prevTasks, newTask]);
    
  }

  const handleDeleteTask = (id) => {
    setTodoTasks((prevTasks) => prevTasks.filter((prevTask) => prevTask.id !== id));
    console.log(todoTasks);
  }

  const handleUpdateTaskDone = (id, done) => {
    setTodoTasks((prevTasks) => 
      prevTasks.map((prevTask) =>
        prevTask.id === id ? { ...prevTask, done } : prevTask
      )
    );
  };

  // Сортировка по полю 'done'
  const sortedTasks = todoTasks.sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));

  return (
    <div className='container'>
      <Form addNewTask={handleAddTask} />
      { !todoTasks.length ? 
      <div>Список пуст...</div>
        :
        <TodoList deleteTask={handleDeleteTask} taskDone={handleUpdateTaskDone} tasks={sortedTasks} />
      }
      
    </div>
  );
}

export default App;
