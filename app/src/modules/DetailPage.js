import React, {Component} from 'react'
import LazyLoad from 'react-lazyload'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import DetailItem from './DetailItem'

function calcColor(meter) {
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
}

class DetailPage extends Component {
    static defaultProps = {
        style: {},
        visible: false
    }
    
    render() {
        if (!this.props.visible)
            return <div/>
        
        let items = []
        var key = 1
        this.props.sugestions.forEach(function(sugestion){
          var obj = sugestion.routes[0];
          console.log(obj)
          items.push(
              <LazyLoad height={200} key={key++}>
                  <DetailItem
                    time={obj.timestamp}
                    density={obj.jam_meter}
                    color={calcColor(obj.jam_meter)}
                  />
              </LazyLoad>
          )
        })
        const styles = {
            title: {
                cursor: 'pointer'
            }
        }
        return (
            <div style={Object.assign({}, {
                marginTop: 64
            }, this.props.style)}>
                {items}
            </div>
        )
    }
}

export default DetailPage