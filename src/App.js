import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import login from './components/login.js'
import signup from './components/signup.js'
import home from './components/home.js'
import dashboard from './components/dashboard.js'
import postproject from './components/postproject.js'
import Headernew from './components/Headernew.js'
import allproject from './components/allproject.js'
import DashboardNew from './components/DashboardNew.js'
import Detailview from './components/Detailview.js'

class App extends Component {

  render() {

    return (

      <div>
      
      <Router>

        <Switch>
          <Route exact path='/' component={home} />
          <Route exact path='/login' component={login} />
          <Route exact path='/signup' component={signup} />
          <Route exact path='/dashboard' component={dashboard} />
          <Route exact path='/postproject' component={postproject} />
          <Route exact path='/header' component={Headernew} />
          <Route exact path='/allproject' component={allproject} />
          <Route exact path='/DashboardNew' component={DashboardNew} />
          <Route exact path='/products/:id' component={Detailview} />
        </Switch>

        </Router>


      </div>
    );
  }
}

export default App;
