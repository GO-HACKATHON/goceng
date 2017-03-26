import React, {Component} from 'react'
import LazyLoad from 'react-lazyload'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import DetailItem from './DetailItem'

class DetailPage extends Component {
    static defaultProps = {
        style: {}
    }

    render() {
        let items = []
        for (let i = 0; i < 10; ++i) {
            items.push(
                <LazyLoad height={200} key={i}>
                    <DetailItem/>
                </LazyLoad>
            )
        }
        const styles = {
            title: {
                cursor: 'pointer',
            },
        }
        return (
            <div style={Object.assign({}, {marginTop:64}, this.props.style)}>
                {items}
            </div>
        )
    }
}

export default DetailPage