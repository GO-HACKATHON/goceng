import React, {Component} from 'react'
import scriptLoader from 'react-async-script-loader'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import config from '../../config/credentials/secrets'

class MaterialSearchBar extends Component {
  state = { address: "" }
  
  onChange = (address) => this.setState({ address })
  
  render() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props
    console.log(isScriptLoaded)
    if (isScriptLoaded && isScriptLoadSucceed) {
      const options = {
        location: new google.maps.LatLng(-6.244265, 106.802469),
        radius: 1000
      }
            
      return (
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.onChange}
          options={options}
        />
      )
    } else {
      return (
        <div/>
      )
    }
  }
}

export default scriptLoader(
  ['https://maps.googleapis.com/maps/api/js?key=' + config.GOOGLE_MAPS_API_KEY + '&libraries=places']
)(MaterialSearchBar)

 