import React, { useState, useEffect } from 'react';
// React router
import { Route, Redirect, useHistory, Switch } from 'react-router-dom';
// utils
import setAuthorization from './utils/setAuthorization';
// components
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import Login from './components/Login';
import Jokes from './components/Jokes';

function App() {
  const { push } = useHistory();
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');

  useEffect(() => {
    setAuthorization(token);
  }, [token]);

  const handleLogin = token => {
    setToken(token);
    push('/jokes');
  }

  
  return (
    <>
      <Switch>
        <Route exact path='/login'>
          <Login handleLogin={handleLogin} />
        </Route>
        <Route exact path='/register'>
          <Register handleLogin={handleLogin} />
        </Route>
        <ProtectedRoute exact path='/jokes' component={Jokes} />
      </Switch>
    </>
  );
}

export default App;
