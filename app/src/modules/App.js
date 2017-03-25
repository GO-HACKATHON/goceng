import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import 'bootstrap'

export default React.createClass({
  render() {
    return (
      <div className="main-container">
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
})
