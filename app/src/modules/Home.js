import React from 'react'
import GocengMap from './GocengMap'
import MaterialSearchBar from './MaterialSearchBar'
import DetailCard from './DetailCard'
import {Card} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import * as RoutingService from './RoutingService'

export default React.createClass({
  getInitialState() {
    return {
      originAddress: '',
      originPosition: [-6.244265, 106.802469],
      destinationAddress: '',
      destinationPosition: null,
      polylines: [],
      sugestions: []
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
  parsePolylinesFromRoute(route){
    const steps = route.legs[0].steps
    
    var polylines = []
    steps.forEach(function(step){
      var points = []
      step.intersections.forEach(function(intersection){
        points.push([intersection.lat, intersection.lng])
      })
      const polyline = {
        'points': points,
        'jam_meter': step.jam_meter
      }
      polylines.push(polyline)
    })
    return polylines
  },
  doQuery() {
    const origin = this.state.originAddress
    const destination = this.state.destinationAddress
    
    var self = this
    
    RoutingService.getRouting(origin, destination).then((result)=>{
      console.log(result)
      self.setState({sugestions: result})
      const route = result[1].routes[0]
      const polylines = self.parsePolylinesFromRoute(route)
      self.setState({polylines: polylines})
    });
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
          polylines={this.state.polylines}
        />
        <div style={{
            position: 'absolute',
            width: '96%',
            bottom: 40,
            left: '50%',
            marginLeft: '-48%',
            zIndex: 999
          }}>
          <RaisedButton label="Search" primary={true} fullWidth={true} 
            onClick={this.doQuery}/>
        </div>
      </div>
    )
  }
})
