import React from 'react'
import GocengMap from './GocengMap'
import MaterialSearchBar from './MaterialSearchBar'
import DetailCard from './DetailCard'
import {Card} from 'material-ui/Card'

export default React.createClass({
  render() {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Card style={{
            background:'white',
            position: 'absolute',
            width: '100%',
            zIndex: 9999
          }}>
          <MaterialSearchBar floatingLabelText="Origin"
            hintText="Pickup location"/>
          <MaterialSearchBar floatingLabelText="Destination"
            hintText="Where to go"/>
        </Card>
        <GocengMap/>
        <DetailCard style={{
          position: 'absolute',
          width: '100%',
          bottom: 0
        }}/>
      </div>
    )
  }
})
