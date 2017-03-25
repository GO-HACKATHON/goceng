import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import 'bootstrap'

export default React.createClass({
  render() {
    return (
      <div className="main-container">
        <NavBar />

        <div className="container">
          <br/><br/>
          {this.props.children}
          <br/><br/>
        </div>

        <Footer />
      </div>
    )
  }
})
