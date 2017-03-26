import React from 'react'
import GocengMap from './GocengMap'
import MaterialSearchBar from './MaterialSearchBar'
import DetailCard from './DetailCard'
import {Card} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

export default React.createClass({
  getInitialState() {
    return {
      originAddress: '',
      originPosition: [-6.244265, 106.802469],
      destinationAddress: '',
      destinationPosition: null
    }
  },
  changeOrigin(address, position) {
    this.setState({originAddress: address})
    this.setState({originPosition: position})
  },
  changeDestination(address, position) {
    this.setState({destinationAddress: address})
    this.setState({destinationPosition: position})
  },
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
            <MaterialSearchBar floatingLabelText="Your Origin"
              onChange={this.changeOrigin}/>
            <MaterialSearchBar floatingLabelText="Your Destination"
              onChange={this.changeDestination}/>
          </Card>
        </div>
        <GocengMap 
          originPosition={this.state.originPosition}
          destinationPosition={this.state.destinationPosition}
        />
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
