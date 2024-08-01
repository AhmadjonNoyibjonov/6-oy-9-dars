import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Product from './pages/Product';
import { useState, useEffect } from 'react';

function App() {
  const [token, setToken] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function ProtectedRoute({ isAuthenticated, children }) {
    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null;
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!isAuth && location.pathname !== '/register') {
      navigate('/login');
    }
  }, [isAuth, location.pathname, navigate]);

  useEffect(() => {
    setIsAuth(!!token);
  }, [token]);

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/'
          element={
            <ProtectedRoute isAuthenticated={isAuth}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path='/product/:id' element={<Product />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;