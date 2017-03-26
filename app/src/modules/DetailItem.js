import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import moment from 'moment'

const DetailItem = ({
    time,
    density,
    color
}) => {
    const detail = (
        <span className="item-box">
            <span className="item duration">29 min</span>
            <span className="item distance">4.5 km</span>
            <span className="item traffic">traffic index: {density}</span>
        </span>
    )
    return (
        <Card style={{
            marginBottom: 10,
            background: color
        }}>
            <CardTitle title={moment(time).format('HH:00')} subtitle={detail} />
        </Card>
    )
}
export default DetailItem