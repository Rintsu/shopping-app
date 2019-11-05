import {
    GET_SHOPPINGLIST_SUCCESS,
    GET_SHOPPINGLIST_FAILED,
    ADD_TO_LIST_SUCCESS,
    ADD_TO_LIST_FAILED,
    REMOVE_FROM_LIST_SUCCESS,
    REMOVE_FROM_LIST_FAILED,
    EDIT_ITEM_SUCCESS,
    EDIT_ITEM_FAILED,
    REMOVE_STATE
} from '../actions/shoppingActions';

const initialState = {
    list:[],
    error:""
}

export const shoppingReducer = (state = initialState, action) => {
    let tempState = {}
    switch(action.type){
        case GET_SHOPPINGLIST_SUCCESS:
            tempState = {
                list:action.list,
                error:""
            }
            return tempState;
        case GET_SHOPPINGLIST_FAILED:
            tempState = {
                ...state,
                error:action.error
            }
            return tempState;
        case ADD_TO_LIST_SUCCESS:
            tempState = {
                ...state,
                error:""
            }
            return tempState;
        case ADD_TO_LIST_FAILED:
            tempState = {
                ...state,
                error:action.error
            }
            return tempState;
        case REMOVE_FROM_LIST_SUCCESS:
            tempState = {
                ...state,
                error:""
            }
            return tempState;
        case REMOVE_FROM_LIST_FAILED:
            tempState = {
                ...state,
                error:action.error
            }
            return tempState;
        case EDIT_ITEM_SUCCESS:
            tempState = {
                ...state,
                error:""
            }
            return tempState;
        case EDIT_ITEM_FAILED:
            tempState = {
                ...state,
                error:action.error
            }
            return tempState;
        case REMOVE_STATE:
            tempState = {
                list:[],
                error:""
            }
            return tempState;
        default:
            return state;
    }
}