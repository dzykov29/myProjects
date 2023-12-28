import React, { useState } from 'react';
import './styles/Form.css';

const Form = ({ addNewTask }) => {
    const [input, setInput] = useState('');
    const [visible, setVisible] = useState(false);

    const handleBtn = (e) => {
        e.preventDefault();
        if (input.length) {
            const task = {
                id: Date.now(),
                descr: input,
                done: false,
            };
            addNewTask(task);
            setInput('');
            setVisible(false); // Скрываем сообщение об ошибке
        } else {
            setVisible(true); // Показываем сообщение об ошибке
        }
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
            {visible && <label className='error visible'>Поле пустое</label>}
            <button onClick={handleBtn} className='btn-reset btn' type='submit'>Добавить дело</button>
        </form>
    );
};

export default Form;
