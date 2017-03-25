import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default React.createClass({
  render() {
    return (
      <MuiThemeProvider>
        <div className="main-container">
          <div className="container">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
})
