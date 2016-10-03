import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Layout from './components/layout/';
import Homie from './components/homie'



export default (
   <Router history={browserHistory}>
    <Route component={Layout}>  
      <Route path="/">
          <IndexRoute component={Homie} />
      </Route>  
    </Route>
  </Router>  
)
