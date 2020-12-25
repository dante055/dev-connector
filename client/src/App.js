import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './comonents/routing/PrivateRoute';
import {
  Landing,
  Login,
  Register,
  Dashboard,
  CreateEditProfile,
  AddExperience,
  AddEducation,
  Profiles,
  Profile,
  Posts,
  Post,
} from './comonents/pages';
import { Navbar, Alert } from './comonents/utilityComponents';
// Redux
import { Provider } from 'react-redux';
import store from './stateManager/store';
import { loadUser } from './stateManager/actions/authAction';
import NotFound from './comonents/utilityComponents/NotFound';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Register} />
          <Route path='/profiles' exact component={Profiles} />
          <Route path='/profile/:userId' exact component={Profile} />
          <PrivateRoute path='/dashboard' exact component={Dashboard} />
          <PrivateRoute
            path={['/dashboard/create-profile', '/dashboard/edit-profile']}
            exact
            component={CreateEditProfile}
          />
          <PrivateRoute
            path='/dashboard/add-experience'
            exact
            component={AddExperience}
          />
          <PrivateRoute
            path='/dashboard/add-education'
            exact
            component={AddEducation}
          />
          <PrivateRoute path='/posts' exact component={Posts} />
          <PrivateRoute path='/post/:postId' exact component={Post} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
