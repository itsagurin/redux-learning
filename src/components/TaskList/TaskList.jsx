import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete, deleteTodo } from '../../slices/todosSlice';
import './TaskList.scss';

function TaskList() {
    const [filter, setFilter] = useState('all');
    const dispatch = useDispatch();

    const tasks = useSelector((state) => state.todos);

    const getFilteredTasks = () => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.completed);
            case 'completed':
                return tasks.filter(task => task.completed);
            default:
                return tasks;
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'low': return 'priority-low';
            case 'high': return 'priority-high';
            default: return 'priority-normal';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleToggleComplete = (id) => {
        dispatch(toggleComplete(id));
    };

    const handleDeleteTask = (id) => {
        dispatch(deleteTodo(id));
    };

    const filteredTasks = getFilteredTasks();

    return (
        <div className="task-list">
            <div className="task-list-header">
                <h2>Список задач</h2>
                <div className="task-filters">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        Все
                    </button>
                    <button
                        className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                        onClick={() => setFilter('active')}
                    >
                        Активные
                    </button>
                    <button
                        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                        onClick={() => setFilter('completed')}
                    >
                        Выполненные
                    </button>
                </div>
            </div>

            {filteredTasks.length > 0 ? (
                <ul className="tasks">
                    {filteredTasks.map(task => (
                        <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                            <div className="task-content">
                                <div className="task-header">
                                    <h3>{task.title}</h3>
                                    <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                    {task.priority === 'low' ? 'Низкий' : task.priority === 'high' ? 'Высокий' : 'Средний'}
                  </span>
                                </div>
                                {task.description && <p className="task-description">{task.description}</p>}
                                <span className="task-date">Создано: {formatDate(task.createdAt)}</span>
                            </div>
                            <div className="task-actions">
                                <button
                                    className={`btn-toggle ${task.completed ? 'completed' : ''}`}
                                    onClick={() => handleToggleComplete(task.id)}
                                >
                                    {task.completed ? 'Отменить' : 'Выполнить'}
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDeleteTask(task.id)}
                                >
                                    Удалить
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty-list">
                    <p>Нет задач для отображения</p>
                    {tasks.length > 0 && <span>Попробуйте изменить фильтр</span>}
                </div>
            )}
        </div>
    );
}

export default TaskList;