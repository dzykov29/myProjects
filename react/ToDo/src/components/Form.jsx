import React, { useState } from 'react';
import './Form.css'

const Form = ({ addNewTask }) => {
    const [input, setInput] = useState('');

    const handleBtn = (e) => {
        e.preventDefault();
        const task = {
            id: Date.now(),
            descr: input,
            done: false,
        };
        addNewTask(task);
        setInput('');
    }

    return (
        <form className='form'>
            <label className='form__label'>Что нужно сделать</label>
            <input 
            className='form__input' 
            type='text' 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleBtn} className='btn-reset btn' type='submit'>Добавить дело</button>
        </form>
    );
};

export default Form;