import './App.css';
import Navbar from './components/common/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/common/ProtectedRoute';

import "primereact/resources/themes/lara-light-indigo/theme.css";        
import "primereact/resources/primereact.min.css"; 
       
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route element={<Home/>} path='/' />
        </Route>
        <Route element={<Login/>} path='/login' />
        <Route element={<Register/>} path='/register' />

      </Routes>
    </>
  );
}

export default App;
