import React from 'react'
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import * as L from 'leaflet'
import * as RoutingService from './RoutingService'

const icon = L.icon({
    iconUrl: '/public/images/marker-icon.png',
    shadowUrl: '/public/images/marker-shadow.png',
    iconSize: [25, 41],
    shadowSize: [50, 64],
    iconAnchor: [12.5, 41],
    shadowAnchor: [14, 64],
});

export default React.createClass({
  getInitialState() {
    return {
      tileLayerUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      tileLayerAttribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      polylines: []
    }
  },
  calcColor(meter) {
    meter = 1 - meter
    var r = 255
    var g = 255
    
    if (meter < 0.5) {
      g = meter * 2 * 255
      g = Math.round(g)
    } else {
      r = 255 - (meter - 0.5) * 255 * 2
      r = Math.round(r)
    }
    return 'rgb(' + r + ', ' + g + ', 0)'
  },
  pointsToString(points){
    var string = "";
    points.forEach(function(point){
      string += point[1] + ',' + point[0] + ';' 
    })
    return string.slice(0,-1)
  },
  componentDidMount(){
    var self = this
    
    RoutingService.getRouting().then((result)=>{
      const route = result[1].routes[0]
      const steps = route.legs[0].steps
      
      const start_location = steps[0].start_location
      const start_point = [start_location.lat, start_location.lng]
      self.setState({mapCenter: start_point})
      self.setState({markerPosition: start_point})
      
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
      
      const end_location = steps[steps.length - 1].end_location
      const end_point = [end_location.lat, end_location.lng]
      self.setState({endMarkerPosition: end_point})
    });
  },
  render() {
    var self = this
    var polylines = [];
    var key = 0;
    this.state.polylines.forEach(function(polyline){
      polylines.push(
        <Polyline 
          positions={polyline.points}
          color={self.calcColor(polyline.jam_meter)}
          weight={10}
          key={key++}
        >
        </Polyline>
      )
    })
    
    var destinationMarker = ""
    if (this.props.destinationPosition) {
      destinationMarker = (
        <Marker 
          position={this.props.destinationPosition}
          icon={icon}>
        </Marker>
      )
    }
    
    return (
      <Map center={this.props.originPosition} zoom={15}>
        <TileLayer url={this.state.tileLayerUrl} attribution={this.state.tileLayerAttribution}/>
        <Marker 
          position={this.props.originPosition}
          icon={icon}>
        </Marker>
        {destinationMarker}
        {polylines}
      </Map>
    )
  }
})