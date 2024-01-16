import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import PremiumContent from './PremiumContent';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import { getUser, getToken, setUserSession, resetUserSession } from './service/AuthService';
import axios from 'axios';

const verifyTokenAPIURL = "https://gd76i1th6e.execute-api.us-east-2.amazonaws.com/prod/verify";

function App() {

  const [isAuthenticating, setAuthenticating] = useState(true);
 
  useEffect (() => {
    const token = getToken();
    if (token === 'undefined' || token === undefined || token === null || !token) {
      return;  
    }

    const requestConfig = {
      headers : {
        'x-api-key': "YRATMDQVJ25PoWtqkcoFK4ypM2DlbX2a7eKoE8DO"
      }
    }

    const requestBody = {
      user: getUser(),
      token: token
    }

    axios.post(verifyTokenAPIURL, requestBody, requestConfig).then(response => {
      setUserSession(response.data.user, response.data.token);
      setAuthenticating(false);
  }).catch(error => {
      resetUserSession();
      setAuthenticating(false);
  })
}, []);

const token = getToken();

if (isAuthenticating && token) {
  return <div className="content">Authenticating... </div>
}


  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
          <NavLink activeClassName="active" to="/register">
            Register
          </NavLink>
          <NavLink activeClassName="active" to="/login">
            Login
          </NavLink>
          <NavLink activeClassName="active" to="/premium-content">
            PremiumContent
          </NavLink>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/premium-content" element={<PremiumContent />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
