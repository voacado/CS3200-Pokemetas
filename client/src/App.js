import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SingleTeamEval from './pages/SingleTeamEval';
import NotFound from './pages/NotFound';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import './index.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Login />
        <Routes>
          <Route exact path="/home" element={<Home />} /> 
          <Route exact path="/single-team-eval" element={<SingleTeamEval />}/>
          <Route element={<NotFound />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
