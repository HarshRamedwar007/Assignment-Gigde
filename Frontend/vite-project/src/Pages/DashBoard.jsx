import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProjects(res.data));
  }, [token]);

  const addProject = async () => {
    const res = await axios.post('http://localhost:5000/api/projects', { name }, { headers: { Authorization: `Bearer ${token}` } });
    setProjects([...projects, res.data]);
  };

  return (
    <div>
      <h2>Your Projects</h2>
      {projects.map(p => <div key={p._id} onClick={() => navigate(`/tasks/${p._id}`)}>{p.name}</div>)}
      <input placeholder="Project Name" onChange={(e) => setName(e.target.value)} />
      <button onClick={addProject}>Add</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

