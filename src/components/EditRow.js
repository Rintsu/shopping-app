import React from 'react';
import {Table, Button} from 'semantic-ui-react';

export default class EditRow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            type:props.item.type,
            count:props.item.count,
            price:props.item.price,
            total:props.item.total
        }
    }

    change = (event) => {
        let state = {};
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    save = () => {
        let item = {
            _id:this.props.item._id,
            type:this.state.type,
            count:this.state.count,
            price:this.state.price,
            total:(this.state.count * this.state.price).toFixed(2)
           // voisiko total'in tehdä cond ? exp : exp2 -lauseella?
           //jottei renderin sisälle tarvitsisi määritellä const total'ia
           
        }
        this.props.editItem(item);
    }

    cancel = () => {
        this.props.cancel();
    }

    render(){
        const total = (this.state.count * this.state.price).toFixed(2);
        return(
            <Table.Row>
                <Table.Cell>
                    <input type="text"
                            name="type"
                            value={this.state.type}
                            onChange={this.change}/>
                </Table.Cell>
                <Table.Cell>
                    <input type="number"
                           name="count"
                           required={true}
                           minimum="0"
                           step="1"
                           value={this.state.count}
                           onChange={this.change}/>
                </Table.Cell>
                <Table.Cell>
                    <input type="number"
                           name="price"
                           required={true}
                           minimum="0"
                           step="0.01"
                           value={this.state.price}
                           onChange={this.change}/>
                </Table.Cell>
                <Table.Cell>{total}</Table.Cell>
                <Table.Cell><Button color="green"
                                    onClick={this.save}>Save</Button></Table.Cell>
                <Table.Cell><Button color="red"
                                    onClick={this.cancel}>Cancel</Button></Table.Cell>
            </Table.Row>
            
        )
    }
}