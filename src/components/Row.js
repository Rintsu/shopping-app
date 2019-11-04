import React from 'react';
import {Table, Button} from 'semantic-ui-react';

export default class Row extends React.Component {

    remove = (event) => {
        this.props.changeToRemoveMode(event.target.name);
    }

    edit = (event) => {
        this.props.changeToEditMode(event.target.id);
    }

    render(){
        return(
            <Table.Row>
                <Table.Cell>{this.props.item.type}</Table.Cell>
                <Table.Cell>{this.props.item.count}</Table.Cell>
                <Table.Cell>{this.props.item.price}</Table.Cell>
                <Table.Cell>{this.props.item.total}</Table.Cell>
                <Table.Cell><Button name={this.props.item._id}
                                    onClick={this.remove}>Remove</Button></Table.Cell>
                <Table.Cell><Button id={this.props.item._id}
                                    onClick={this.edit}>Edit</Button></Table.Cell>
            </Table.Row>
        )
    }
}