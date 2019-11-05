import React from 'react';
import { Link } from 'react-router-dom';
import { List, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { onLogout } from '../actions/loginActions';

class NavBar extends React.Component {

    logout = () => {
        this.props.dispatch(onLogout(this.props.token));
    }

    render(){
        let header = "Shopping App";
        if(this.props.loading){
            header = "Loading...";
        }
        if(this.props.error){
            header = this.props.error
        }
        let style = {
            height:100,
            backgroundColor:"lightblue"
        }
    
        return(
            //Ternary operator (if-else conditional statement)
            this.props.isLogged
            ?
            <div style={style}>
                <Header>{header}</Header>
                <List>
                    <List.Item>
                        <Link to="/list">
                            Shopping List
                        </Link>
                    </List.Item>
                    <List.Item>
                        <Link to="/form">
                            Add new item
                        </Link>
                    </List.Item>
                    <List.Item>
                        <Link to="/" onClick={ this.logout }>Logout</Link>
                    </List.Item>
                </List>
            </div>
            : 
            <div style={style}>
                <Header>{header}</Header>
            </div>
        )
            
        }
    
}

const mapStateToProps = (state) => {
    let error = ""
    if(state.shopping.error){
        error = state.shopping.error
    }
    if(state.login.error){
        error = state.login.error
    }
    return {
        isLogged:state.login.isLogged,
        token:state.login.token,
        loading:state.login.loading,
        error:error
    }
}
export default connect(mapStateToProps)(NavBar);