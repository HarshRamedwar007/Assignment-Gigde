import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import { AuthContext } from './Context/AuthContext';

function App() {
  const { token } = useContext(AuthContext);
  const [page, setPage] = useState(token ? 'dashboard' : 'login');
  const [projectId, setProjectId] = useState(null);

  const renderPage = () => {
    switch (page) {
      case 'signup':
        return <Signup />;
      case 'login':
        return <Login />;
      case 'dashboard':
        return <Dashboard onOpenProject={(id) => {
          setProjectId(id);
          setPage('tasks');
        }} />;
      case 'tasks':
        return <Tasks projectId={projectId} />;
      default:
        return <Login />;
    }
  };

  return (
    <div>
      <nav style={{ padding: '10px', background: '#eee' }}>
        {!token ? (
          <>
            <Link to="#" onClick={() => setPage('login')} style={{ marginRight: '10px' }}>Login</Link>
            <Link to="#" onClick={() => setPage('signup')}>Signup</Link>
          </>
        ) : (
          <>
            <Link to="#" onClick={() => setPage('dashboard')} style={{ marginRight: '10px' }}>Dashboard</Link>
            <Link to="#" onClick={() => {
              localStorage.removeItem('token');
              window.location.reload();
            }}>Logout</Link>
          </>
        )}
      </nav>

      <div style={{ padding: '20px' }}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
