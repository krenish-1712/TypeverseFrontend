import './App.css';
import { Routes, Route } from 'react-router-dom';
// import {Header} from './Components/Header.jsx'
import {Home} from './Pages/Home' 
import Test from './Pages/Test';
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import About from './Pages/About'
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <div className="App">
        
        <Routes>
          <Route path="/">
            <Route index element={<Login/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/test' element={<Test/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
          </Route>
      </Routes >

       
      
    </div>
  );
}

export default App;
