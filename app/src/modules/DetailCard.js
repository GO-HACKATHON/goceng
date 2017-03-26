import React from 'react'
import {Card, CardTitle} from 'material-ui/Card'

const DetailCard = ({
    style
}) => {
    return (
        <Card style={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          zIndex: 999
        }}>
          <CardTitle title="Card title" subtitle="Card subtitle" />
        </Card>
    )
}

export default DetailCard