import React from 'react'
import GocengMap from './GocengMap'
import MaterialSearchBar from './MaterialSearchBar'
import DetailCard from './DetailCard'
import {Card} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

export default React.createClass({
  render() {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <div style={{
            position: 'absolute',
            width: '96%',
            top: 7,
            left: '50%',
            marginLeft: '-48%',
            zIndex: 999
          }}>
          <Card>
            <MaterialSearchBar floatingLabelText="Your Pickup Location"/>
            <MaterialSearchBar floatingLabelText="Your Destination"/>
          </Card>
        </div>
        <GocengMap/>
        <div style={{
            position: 'absolute',
            width: '96%',
            bottom: 40,
            left: '50%',
            marginLeft: '-48%',
            zIndex: 999
          }}>
          <RaisedButton label="Search" primary={true} fullWidth={true} />
        </div>
      </div>
    )
  }
})
