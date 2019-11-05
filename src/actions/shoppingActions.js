//ACTION CONSTANTS
import { fetchLoading, loadingDone, logoutSuccess } from './loginActions';

export const GET_SHOPPINGLIST_SUCCESS = "GET_SHOPPINGLIST_SUCCESS";
export const GET_SHOPPINGLIST_FAILED = "GET_SHOPPINGLIST_FAILED";
export const ADD_TO_LIST_SUCCESS = "ADD_TO_LIST_SUCCESS";
export const ADD_TO_LIST_FAILED = "ADD_TO_LIST_FAILED";
export const REMOVE_FROM_LIST_SUCCESS = "REMOVE_FROM_LIST_SUCCESS";
export const REMOVE_FROM_LIST_FAILED = "REMOVE_FROM_LIST_FAILED";
export const EDIT_ITEM_SUCCESS = "EDIT_ITEM_SUCCESS";
export const EDIT_ITEM_FAILED = "EDIT_ITEM_FAILED";
export const REMOVE_STATE = "REMOVE_STATE";

export const getList = (token, search) => {

}

export const addToList = (token, item) => {

}

export const removeFromList = (token, id) => {

}

export const editItem = (token, item) => {

}

const getListSuccess = (data) => {
    return {
        type:GET_SHOPPINGLIST_SUCCESS,
        list:data
    }
}

const getListFailed = (error) => {
    return {
        type:GET_SHOPPINGLIST_FAILED,
        error:error
    }
}

const addToListSuccess = () => {
    return {
        type:ADD_TO_LIST_SUCCESS
    }
}

const addToListFailed = (error) => {
    return {
        type:ADD_TO_LIST_FAILED,
        error:error
    }
}

const reomveFromListSuccess = () => {
    return {
        type:REMOVE_FROM_LIST_SUCCESS
    }
}

const removeFromListFailed = (error) => {
    return {
        type:REMOVE_FROM_LIST_FAILED,
        error:error
    }
}

const editItemSuccess = () => {
    return {
        type:EDIT_ITEM_SUCCESS
    }
}

const editItemFailed = (error) => {
    return {
        type:EDIT_ITEM_FAILED,
        error:error
    }
}

export const removeState = () => {
    return {
        type:REMOVE_STATE
    }
}