import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import config from 'config'

class GocengMap extends Component {
    render() {
        return (
            <GoogleMapReact
                bootstrapURLKeys={{key: config.GOOGLE_MAPS_API_KEY}}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
            >
            </GoogleMapReact>
        )
    }
}

GocengMap.defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
}

export default GocengMap