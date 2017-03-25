import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import Home from './modules/Home'
import GocengMap from './modules/GocengMap'
import '../node_modules/font-awesome/css/font-awesome.css'
import '../node_modules/react-bootstrap-typeahead/css/Token.css'
import '../node_modules/react-bootstrap-typeahead/css/Typeahead.css'
import '../node_modules/leaflet/dist/leaflet.css'
import './style.css'

render((
  <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/maps" component={GocengMap}/>
      </Route>
  </Router>
), document.getElementById('app'))
