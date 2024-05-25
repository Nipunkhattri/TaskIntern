import logo from './logo.svg';
import './App.css';
import {Route,Routes} from 'react-router-dom';
import Task from './components/Task.js'

function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Task/>}/>
    </Routes>
    </>
  );
}

export default App;