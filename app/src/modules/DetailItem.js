import React from 'react'
import {Card, CardTitle} from 'material-ui/Card'

const DetailItem = () => {
    return (
        <Card>
            <CardTitle title="Card title" subtitle="Card subtitle" />
            <div>
                <span>Best time to order GoJek</span>
                <h1>08.00</h1>
                <span>29 min</span>
                <span>4.5 km</span>
                <span>low traffic</span>
            </div>
        </Card>
    )
}
export default DetailItem