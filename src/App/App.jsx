import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateTask from '../components/CreateTask/CreateTask.jsx';
import TaskList from '../components/TaskList/TaskList.jsx';
import './App.scss';

function App() {
  return (
      <Router>
        <div className="app-container">
          <header className="app-header">
            <h1>Todo List</h1>
            <nav>
              <Link to="/" className="nav-link">Создать задачу</Link>
              <Link to="/tasks" className="nav-link">Мои задачи</Link>
            </nav>
          </header>

          <main className="app-content">
            <Routes>
              <Route path="/" element={<CreateTask />} />
              <Route path="/tasks" element={<TaskList />} />
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;