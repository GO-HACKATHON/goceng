import React from 'react'
import GocengMap from './GocengMap'
import MaterialSearchBar from './MaterialSearchBar'
import {Card} from 'material-ui/Card'

export default React.createClass({
  render() {
    return (
      <Card style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <div style={{
            background:'white',
            position: 'absolute',
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 0,
            paddingTop: 10,
            width: '100%',
            zIndex: 9999
          }}>
          <MaterialSearchBar floatingLabelText="Origin"
            hintText="Pickup location"/>
          <MaterialSearchBar floatingLabelText="Destination"
            hintText="Where to go"/>
          </div>
        <GocengMap/>
      </Card>
    )
  }
})
