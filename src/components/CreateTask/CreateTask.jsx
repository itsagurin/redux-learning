import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateTaskMutation } from '../../api/apiSlice';
import './CreateTask.scss';

function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('normal');
    const navigate = useNavigate();

    const [createTask, { isLoading }] = useCreateTaskMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            await createTask({
                title,
                description,
                priority,
                createdAt: new Date().toISOString(),
                completed: false
            }).unwrap();

            setTitle('');
            setDescription('');
            setPriority('normal');

            navigate('/tasks');
        } catch (err) {
            console.error('Failed to create the task:', err);
        }
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Приоритет</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        disabled={isLoading}
                    >
                        <option value="low">Низкий</option>
                        <option value="normal">Средний</option>
                        <option value="high">Высокий</option>
                    </select>
                </div>

                <button type="submit" className="btn-create" disabled={isLoading}>
                    {isLoading ? 'Создание...' : 'Создать задачу'}
                </button>
            </form>
        </div>
    );
}

export default CreateTask;