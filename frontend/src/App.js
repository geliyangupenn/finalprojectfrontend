import React from 'react';

//history
import history from './history';

//router
import { Router, Route, Switch } from 'react-router-dom';
import UserRegistration from './UserRegistration';
import LoginPage from './userLoginAuth';
import ProfilePage from './views/ProfilePage';

const App = () => {
  return (
    <>
      <Router history = {history}>
        <Switch>
          <Route path = "/profile" component = {ProfilePage} />
          <Route path = "/login" component = {LoginPage} />
          <Route path = "/registration" component = {UserRegistration}/>
        </Switch>
      </Router>
    </>
  )
}

export default App;
