import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SingleTeamEval from './pages/SingleTeamEval';
import NotFound from './pages/NotFound';
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Home />} /> 
          <Route exact path="/single-team-eval" element={<SingleTeamEval />}/>
          <Route element={<NotFound />}/>
        </Routes>
      </Router>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
