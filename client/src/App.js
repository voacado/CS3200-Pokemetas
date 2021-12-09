import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import SingleTeamEval from './pages/SingleTeamEval';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register'
import MyTeams from './pages/MyTeams';
import About from './pages/About';
import Logout from './pages/Logout';

import Navbar from './components/navbar/Navbar';
import useToken from './hooks/useToken'

function App() {
  const {token, setToken} = useToken();

  return (
    <div className='App'>
      <Router>
        <Navbar token={token}/>
        <Routes>
          <Route exact path="/" element={<Home />} /> 
          <Route exact path="/home" element={<Home />} /> 
          <Route exact path="/about" element={<About />} />
          <Route exact path="/single-team-eval" element={<SingleTeamEval />}/>
          <Route exact path="/login" element={<Login token={token} setToken={setToken}/>}/>
          <Route exact path="/register" element={<Register token={token} setToken={setToken}/>}/>
          <Route exact path="/my-teams" element={<MyTeams />}/>
          <Route exact path="/logout" element={<Logout token={token} setToken={setToken}/>}/>

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
