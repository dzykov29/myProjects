import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import Form from './components/Form';

function App() {
  const [todoTasks, setTodoTasks] = useState([
    {
      id: 1,
      descr: 'Новое дело',
      done: false,
    },
    {
      id: 2,
      descr: 'Новое дело1',
      done: false,
    },
    {
      id: 3,
      descr: 'Новое дело2',
      done: false,
    },
  ]);

  const handleAddTask = (newTask) => {
    setTodoTasks((prevTasks) => [...prevTasks, newTask]);
    
  }

  const handleDeleteTask = (id) => {
    setTodoTasks((prevTasks) => prevTasks.filter((prevTask) => prevTask.id !== id));
    console.log(todoTasks);
  }

  return (
    <div className='container'>
      <Form addNewTask={handleAddTask} />
      <TodoList deleteTask={handleDeleteTask} tasks={todoTasks} />
    </div>
  );
}

export default App;
