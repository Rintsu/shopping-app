import React from 'react';
import {Table, Button} from 'semantic-ui-react';

export default class RemoveRow extends React.Component {

    cancel = () => {
        this.props.cancel();
    }

    remove = (event) => {
        this.props.removeFromList(event.target.id);
    }

    render(){
        return(
        <Table.Row>
            <Table.Cell>{this.props.item.type}</Table.Cell>
            <Table.Cell>{this.props.item.count}</Table.Cell>
            <Table.Cell>{this.props.item.price}</Table.Cell>
            <Table.Cell>{this.props.item.total}</Table.Cell>
            <Table.Cell><Button color="red" name={this.props.item._id}
                                onClick={this.cancel}>Cancel</Button></Table.Cell>
            <Table.Cell><Button color="green" id={this.props.item._id}
                                onClick={this.remove}>Confirm</Button></Table.Cell>
        </Table.Row>
        )
    }
}