import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Route, Routes, useNavigate } from 'react-router-dom';
import LoginUser from './components/LoginComponents/LoginUser';
import RegisterUser from './components/LoginComponents/RegisterUser';
import Lugares from './components/MainComponents/Lugares/Lugares';
import Usuario from './components/MainComponents/Usuarios/Usuario';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import Navigator from './components/MainComponents/Navigator';
function App() {
  const [isLogged, setLogged] = useState(false)
  const navigate = useNavigate();
  return (
    <div> 
      <Routes>
        <Route index element={<div><LoginUser isLogged={isLogged} setLogged={setLogged} navigate={navigate}/></div>}/>
        <Route path='/resgistro' element={<div><RegisterUser/></div>}/>
        <Route element={<ProtectedRoutes isLogged={localStorage.getItem('isLogged')}/>}>
          <Route element={<Navigator setLogged={setLogged} navigate={navigate}/>}>
            <Route path='/lugares' element={<div><Lugares/></div>}/> 
            <Route path='/user' element={<div><Usuario/></div>}/> 
          </Route>
        </Route>
      </Routes>
    </div>
  );
}


export default App;
