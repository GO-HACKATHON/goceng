import React, {Component} from 'react'
import AutoComplete from 'material-ui/AutoComplete'

class MaterialSearchBar extends Component {
    state = {
        dataSource: [],
    }

    handleUpdateInput = (value) => {
        this.setState({
            dataSource: [
                value,
                value + value,
                value + value + value,
            ],
        })
    }

    render() {
        return (
            <AutoComplete
                {...this.props}
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleUpdateInput}
                fullWidth={true}
                />
        )
    }
}

export default MaterialSearchBar