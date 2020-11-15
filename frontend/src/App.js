import React from 'react';

//history
import history from './history';

//router
import { Router, Route, Switch } from 'react-router-dom';
import UserRegistration from './components/registration/UserRegistration';
import LoginPage from './LoginPage';
import ProfilePage from './components/profile/ProfilePage';
import StatusFeed from './components/status-feed/StatusFeed';

const App = () => {
  return (
    <>
      <Router history = {history}>
        <Switch>
          <Route path = "/profile" component = {ProfilePage} />
          <Route path = "/login" component = {LoginPage} />
          <Route path = "/registration" component = {UserRegistration}/>
          <Route path = "/status-feed" component = {StatusFeed}/>
        </Switch>
      </Router>
    </>
  )
}

export default App;
