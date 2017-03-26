import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'

const DetailItem = ({
    time,
    density,
    color
}) => {
    const detail = (
        <span className="item-box">
            <span className="item duration">29 min</span>
            <span className="item distance">4.5 km</span>
            <span className="item traffic">low traffic</span>
        </span>
    )
    return (
        <Card style={{marginBottom: 10}}>
            <CardTitle title="08.00" subtitle={detail} />
        </Card>
    )
}
export default DetailItem