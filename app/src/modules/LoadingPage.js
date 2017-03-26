import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const LoadingPage = ({
    visible
}) => {
    if (visible) {
        return (
            <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 9999
            }}>
            <CircularProgress style={{
                left: '50%',
                top: '50%',
                marginLeft: -30,
                marginTop: -30
            }} size={60} thickness={7} />
            </div>
        )
    } else
        return <div/>
}
export default LoadingPage