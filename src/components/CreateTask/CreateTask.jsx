import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../slices/todosSlice';
import './CreateTask.scss';

function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('normal');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        dispatch(addTodo({
            id: Date.now(),
            title,
            description,
            priority,
            createdAt: new Date().toISOString(),
            completed: false
        }));

        setTitle('');
        setDescription('');
        setPriority('normal');

        navigate('/tasks');
    };

    return (
        <div className="create-task">
            <h2>Создать новую задачу</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Название задачи*</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Введите название задачи"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Добавьте описание задачи (опционально)"
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Приоритет</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="low">Низкий</option>
                        <option value="normal">Средний</option>
                        <option value="high">Высокий</option>
                    </select>
                </div>

                <button type="submit" className="btn-create">Создать задачу</button>
            </form>
        </div>
    );
}

export default CreateTask;