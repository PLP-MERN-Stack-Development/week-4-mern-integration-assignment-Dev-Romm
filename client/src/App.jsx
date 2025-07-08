import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostView from './pages/PostView';
import PostEdit from './pages/PostEdit';
import AppProvider from './context/AppContext';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<PostView />} />
            <Route path="/edit/:id" element={<PostEdit />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;