import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Layout from './components/layout/';
import Home from './components/home'



export default (
   <Router history={browserHistory}>
    <Route component={Layout}>  
      <Route path="/">
        <IndexRoute component={Home} />
      </Route>  
    </Route>
  </Router>  
)
