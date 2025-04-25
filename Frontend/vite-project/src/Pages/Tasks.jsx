import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Tasks() {
  const { projectId } = useParams();
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({ title: '', description: '' });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tasks/${projectId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setTasks(res.data));
  }, [projectId, token]);

  const createTask = async () => {
    const res = await axios.post('http://localhost:5000/api/tasks', { ...taskForm, projectId }, { headers: { Authorization: `Bearer ${token}` } });
    setTasks([...tasks, res.data]);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map(t => (
        <div key={t._id}>
          <h4>{t.title}</h4>
          <p>{t.description}</p>
          <p>Status: {t.status}</p>
          <button onClick={() => deleteTask(t._id)}>Delete</button>
        </div>
      ))}
      <input placeholder="Title" onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} />
      <input placeholder="Description" onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })} />
      <button onClick={createTask}>Add Task</button>
    </div>
  );
}
