import {
    FETCH_LOADING,
    LOADING_DONE,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED
} from '../actions/loginActions';

const initialState = {
    isLogged:false,
    token:[],
    loading:false,
    error:""
}

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_LOADING:
            return {
                ...state,
                loading:true
            }
        case LOADING_DONE:
                return {
                    ...state,
                    loading:false
                }
        case REGISTER_SUCCESS:
                return {
                    ...state,
                    error:""
                }
        case REGISTER_FAILED:
                return {
                    ...state,
                    error:action.error
                }
        case LOGIN_SUCCESS:
                return {
                    ...state,
                    isLogged:true,
                    token:action.token,
                    error:""
                }
        case LOGIN_FAILED:
                return {
                    ...state,
                    error:action.error
                }
        case LOGOUT_SUCCESS:
                return {
                    ...state,
                    isLogged:false,
                    token:"",
                    error:""
                }
        case LOGOUT_FAILED:
                return {
                    ...state,
                    isLogged:false,
                    token:"",
                    error:action.error
                }
        default:
            return state;
    }
}
 export default loginReducer;