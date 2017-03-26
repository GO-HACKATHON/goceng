import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router'
import App from './modules/App'
import '../node_modules/font-awesome/css/font-awesome.css'
import '../node_modules/react-bootstrap-typeahead/css/Token.css'
import '../node_modules/react-bootstrap-typeahead/css/Typeahead.css'
import '../node_modules/leaflet/dist/leaflet.css'
import './style.css'

render((
  <Router><App/></Router>
), document.getElementById('app'))
