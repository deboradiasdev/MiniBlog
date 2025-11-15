
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
// hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication.jsx';
// context
import { AuthProvider } from './context/AuthContext.jsx';
// pages
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import CreatePost from './pages/CreatePost/CreatePost.jsx';

function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/login" 
                element={ !user ? <Login /> : <Navigate to="/" /> }
              />
              <Route
                path="/register" 
                element={ !user ? <Register /> : <Navigate to="/" /> }
              />
              <Route 
                path="/dashboard" 
                element={ user ? <Dashboard /> : <Navigate to="/login" /> }
              />
              <Route 
                path="/post/create" 
                element={ user ? <CreatePost /> : <Navigate to="/login" /> }
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </AuthProvider>
    </div>
  );
}

export default App;
