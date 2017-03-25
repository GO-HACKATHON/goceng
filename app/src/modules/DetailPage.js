import React from 'react'
import LazyLoad from 'react-lazyload'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import DetailItem from './DetailItem'

const DetailPage = React.createClass({
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
            <div>
                <AppBar
                    style={{
                        position:'fixed',
                        top:0
                    }}
                    title={<span style={styles.title}>Booking Time Recommendation</span>}
                    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                />
                <div style={{marginTop:64}}>
                    {items}
                </div>
            </div>
        )
    }
})

export default DetailPage