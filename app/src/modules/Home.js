import React from 'react'
import GocengMap from './GocengMap'
import SearchBar from './SearchBar'

export default React.createClass({
  render() {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <SearchBar placeholder="Origin"
          style={{
            position: 'absolute',
            left: '50%',
            marginLeft: -125,
            zIndex: 999
          }}/>
        <SearchBar placeholder="Destination"
          style={{
            position: 'absolute',
            left: '50%',
            marginLeft: -125,
            marginTop: 35,
            zIndex: 999
          }}/>
        <GocengMap/>
      </div>
    )
  }
})
