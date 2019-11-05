import React from 'react';
import {Form, Button} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addToList } from '../actions/shoppingActions';

class ShoppingForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            type:"",
            count:0,
            price:0,
            total:0
        }
    }

    change = (event) => {
        let state = {};
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    submit = (event) => {
        event.preventDefault();
        let item = {
            id:0,
            type:this.state.type,
            price:this.state.price,
            count:this.state.count,
            total:(this.state.price * this.state.count).toFixed(2)
        }
        this.props.dispatch(addToList(this.props.token, item));
        this.setState({
            type:"",
            price:0,
            count:0,
            total:0
        })
        //Vie suoraan lomakesivulta ostoslistaan 
        //withRouter hommeli
        this.props.history.push("/list");
    }

    render(){
        return(
            <Form onSubmit={this.submit}>
                <Form.Field>
                    <label htmlFor="type">Item Type:</label>
                    <input type="text"
                           name="type"
                           required={true}
                           value={this.state.type}
                           onChange={this.change}/>
                </Form.Field>
                <Form.Field>
                    <label htmlFor="count">Item Count:</label>
                    <input type="number"
                           name="count"
                           required={true}
                           minimum="0"
                           step="1"
                           value={this.state.count}
                           onChange={this.change}/>
                </Form.Field>
                <Form.Field>
                    <label htmlFor="price">Item Price:</label>
                    <input type="number"
                           name="price"
                           required={true}
                           minimum="0"
                           step="0.01"
                           value={this.state.price}
                           onChange={this.change}/>
                </Form.Field>
                <Button type="submit">Add</Button>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token:state.login.token
    }
}
export default withRouter(connect(mapStateToProps)(ShoppingForm));