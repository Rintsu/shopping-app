import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import { connect } from 'react-redux';
import { getList } from '../actions/shoppingActions';

class ShoppingList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            removeIndex:-1,
            editIndex:-1,
            search:""
        }
    }

    change = (event) => {
        let state = {};
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    searchByType = (event) => {
        this.props.dispatch(getList(this.props.token, this.state.search));
        this.setState({
            search:""
        })
    }

    changeToRemoveMode = (id) => {
        for(let i = 0; i < this.props.list.length; i++){
            if(id === this.props.list[i]._id){
                this.setState({
                    removeIndex:i,
                    editIndex:-1
                })
            }
        }
    }

    changeToEditMode = (id) => {
        for(let i = 0; i < this.props.list.length; i++){
            if(id === this.props.list[i]._id){
                this.setState({
                    removeIndex:-1,
                    editIndex:i
                })
            }
        }
    }

    removeFromList = (id) => {
        this.props.removeFromList(id);
        this.cancel();
    }

    editItem = (item) => {
        this.props.editItem(item);
        this.cancel();
    }

    cancel = () => {
        this.setState({
            removeIndex:-1,
            editIndex:-1
        })
    }

    render(){
        //List on määritelty App.js - alunperin tyhjä array
        //joka on populoitu bakcendistä tulevalla datalla (list:data) (App.js)
        //ja lähetetty propsina ShoppingListille (App.js)
        //tässä lista mäpätään
        let items = this.props.list.map((item, index) => {
            //Total pitää taas määritellä uudestaan, jotta tietokannan kautta lisätyt itemit saavat myös total arvon
            item.total = (item.price * item.count).toFixed(2)
            if(this.state.editIndex === index){
                return <EditRow key={item._id} item={item}
                                editItem={this.editItem}
                                cancel={this.cancel}/>
            }
            if(this.state.removeIndex === index){
                return <RemoveRow key={item._id} item={item}
                                cancel={this.cancel}
                                removeFromList={this.removeFromList}/>
            }
            return <Row key={item._id} item={item}
                changeToRemoveMode={this.changeToRemoveMode}
                changeToEditMode={this.changeToEditMode}/>
        })

        return(
            <div>
                <label htmlFor="search">Search by type: </label>
                <input type="text"
                        name="search"
                        onChange={this.change}
                        value={this.state.search}/>
                <Button style={{marginLeft:10}} onClick={this.searchByType}>Search</Button>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Item Type</Table.HeaderCell>
                            <Table.HeaderCell>Item Count</Table.HeaderCell>
                            <Table.HeaderCell>Item Price</Table.HeaderCell>
                            <Table.HeaderCell>Total Price</Table.HeaderCell>
                            <Table.HeaderCell>Remove</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {items}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list:state.shopping.list,
        token:state.login.token
    }
}

export default connect(mapStateToProps)(ShoppingList);