import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import config from 'config'
import * as L from 'leaflet'

const icon = L.icon({
    iconUrl: '../images/marker-icon.png',
    shadowUrl: '../images/marker-shadow.png',
    iconSize: [25, 41],
    shadowSize: [50, 64],
    iconAnchor: [12.5, 41],
    shadowAnchor: [14, 64],
});

const position = [-6.244265, 106.802469];

const map = (
  <Map center={position} zoom={15}>
    <TileLayer
      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker 
      position={position}
      icon={icon}>
      <Popup>
        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
      </Popup>
    </Marker>
  </Map>
);

class GocengMap extends Component {
  render() {
    return map
  }
}

export default GocengMap