import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom"
import Home from './component/Home';
function App() {
  return (
    <div className="App">
       <Routes>
        <Route exact  path="/" element={<Home/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
