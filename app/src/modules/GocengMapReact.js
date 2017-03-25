import React from 'react'
import { GoogleApiWrapper, Map } from 'google-maps-react'
import config from 'config'
global.google;

export class Container extends React.Component {
    render() {
        var drawingManager = new google.maps.drawing.DrawingManager()
        
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <div id="map"></div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: config.GOOGLE_MAPS_API_KEY
})(Container)