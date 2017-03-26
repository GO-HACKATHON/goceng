import React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'

const DetailItem = ({
    time,
    density,
    color
}) => {
    return (
        <Card>
            <CardTitle title="Card title" subtitle="Card subtitle" />
            <CardText>
                <div>
                    <span>Best time to order GoJek</span>
                    <h1>{1}</h1>
                    <span>29 min</span>
                    <span>4.5 km</span>
                    <span>low traffic</span>
                </div>
            </CardText>
        </Card>
    )
}
export default DetailItem