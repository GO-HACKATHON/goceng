import React from 'react'
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import config from 'config'
import * as L from 'leaflet'
import * as RoutingService from './RoutingService'

const icon = L.icon({
    iconUrl: '../images/marker-icon.png',
    shadowUrl: '../images/marker-shadow.png',
    iconSize: [25, 41],
    shadowSize: [50, 64],
    iconAnchor: [12.5, 41],
    shadowAnchor: [14, 64],
});

const point_1 = [-6.8916026, 107.5813959]
const point_2 = [-6.898187099999999, 107.5934486]

const way_point_1 = [-6.891607, 107.581441]
const way_point_2 = [-6.898188 , 107.593448]

export default React.createClass({
  getInitialState() {
    return {
      tileLayerUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      tileLayerAttribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      // mapCenter: [-6.244265, 106.802469],
      mapCenter: point_1,
      markerPosition: [-6.244265, 106.802469],
      polylinePositions: [point_1, way_point_1, way_point_2, point_2]
    }
  },
  pointsToString(points){
    var string = "";
    points.forEach(function(point){
      console.log(point)
      string += point[1] + ',' + point[0] + ';' 
    })
    return string.slice(0,-1)
  },
  componentDidMount(){
    // RoutingService.getRouting().then((result)=>{
    //   console.log(result)
    // });
    // $.getJSON('sample_data.json', function(result){
    //   console.log(result)
    //   const steps = result.routes[0].legs[0].steps
    //   const start_location = steps[0].start_location
    //   const start_point = [start_location.lat, start_location.lng]
    //   self.setState({mapCenter: start_point})
    //   self.setState({markerPosition: start_point})
    //   var points = []
    //   steps.forEach(function(step){
    //     points.push([step.start_location.lat, step.start_location.lng])
    //   })
    //   const end_location = steps[steps.length - 1].end_location
    //   points.push([end_location.lat, end_location.lng])
    //   const pointsString = self.pointsToString(points)
    //   console.log(pointsString)
    //   self.setState({polylinePositions: points})
    // })
    
  },
  render() {
    return (
      <Map center={this.state.mapCenter} zoom={15}>
        <TileLayer url={this.state.tileLayerUrl} attribution={this.state.tileLayerAttribution}/>
        <Marker 
          position={this.state.markerPosition}
          icon={icon}>
          <Popup>
            <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
          </Popup>
        </Marker>
        <Polyline positions={this.state.polylinePositions}></Polyline>
      </Map>
    )
  }
})