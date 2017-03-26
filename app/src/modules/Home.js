import React from 'react'
import GocengMap from './GocengMap'
import MaterialSearchBar from './MaterialSearchBar'
import DetailCard from './DetailCard'
import {Card} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import * as RoutingService from './RoutingService'
import LoadingPage from './LoadingPage'

export default React.createClass({
  getInitialState() {
    return {
      originAddress: '',
      originPosition: [-6.244265, 106.802469],
      destinationAddress: '',
      destinationPosition: null,
      polylines: [],
      loading: false
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
  doQuery() {
    this.setState({loading: true})

    const origin = this.state.originAddress
    const destination = this.state.destinationAddress
    
    var self = this
    
    RoutingService.getRouting(origin, destination).then((result)=>{
      const route = result[1].routes[0]
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
      self.setState({polylines: polylines})
    })
    .catch(error => {
      this.setState({loading: false})
    })
    .then(result => {
      this.setState({loading: false})
    })
  },
  render() {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <LoadingPage visible={this.state.loading} />
        <div style={{
            position: 'absolute',
            width: '96%',
            top: 7,
            left: '50%',
            marginLeft: '-48%',
            zIndex: 999
          }}>
          <div style={{fontFamily: 'Roboto, sans-serif'}}>
            <MaterialSearchBar placeholder="Your Origin"
              onChange={this.changeOrigin}/>
            <MaterialSearchBar placeholder="Your Destination"
              onChange={this.changeDestination}/>
          </div>
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
