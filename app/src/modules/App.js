import React from 'react'
import {Match} from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Home from './Home'
import GocengMap from './GocengMap'
import DetailPage from './DetailPage'

export default React.createClass({
  render() {
    return (
      <MuiThemeProvider>
          <div className="container">
            <Match exactly pattern='/' component={Home} />
            <Match exactly pattern='/maps' component={GocengMap} />
            <Match exactly pattern='/details' component={DetailPage} />
          </div>
      </MuiThemeProvider>
    )
  }
})
