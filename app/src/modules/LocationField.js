import React from 'react'
import Autocomplete from '../../node_modules/react-autocomplete/dist/react-autocomplete.js'

export default React.createClass({
  getInitialState() {
    return {
      value: "",
      locations: [
        {"name": "AA"},
        {"name": "AB"},
        {"name": "AC" },
        {"name": "AD" },
        {"name": "BA" },
        {"name": "BB" }
      ]
    }
  },
  shouldItemRender(item, value) {
    return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 && value.length > 0
  },
  onChange(event, value) {
    var url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
      value + "&types=establishment&location=-6.244255,106.802416&radius=25000" +
      "&key=AIzaSyDMapuGXBPmDhXR4rb7olVMA44hHaMY9x0"
    
    var options = {
      'url': url,
      'async': true,
      'crossDomain': true,
      'method': 'GET',
      'dataType': 'jsonp',
      'jsonpCallback': 'callback',
      success: function (data) {
        console.log(data);
      }
    }
    
    $.ajax(options);
    
    this.setState({ "value": value})
  },
  onSelect(value, item) {
    this.setState({ "value": item.name})
  },
  render() {
    return (
      <Autocomplete
        value={this.state.value}
        inputProps={{name: "Location", id: "location-autocomplete"}}
        items={this.state.locations}
        onSelect={this.onSelect}
        onChange={this.onChange}
        shouldItemRender={this.shouldItemRender}
        getItemValue={(item) => item.name}
        renderItem={(item, isHighlighted) => (
          <div>{item.name}</div>
        )}
      />
    )
  }
})
