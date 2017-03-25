import React from 'react'
import { Link } from 'react-router'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <span className="navbar-brand">GoHackathon</span>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
            <li><NavLink to="/maps">Maps</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  }
})
