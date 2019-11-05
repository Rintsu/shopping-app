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
    return dispatch => {
        let request = {
            method:"GET",
            mode:"cors",
            headers:{"Content-type":"application/json",
                    "token":token}
        }
        let url = "/api/shopping";
        if(search){
            url = url + "?type=" + search;
        }
        dispatch(fetchLoading());
        fetch(url, request).then((response) => {
            dispatch(loadingDone());
            if(response.ok){
                response.json().then((data) => {
                    dispatch(getListSuccess(data));
            }).catch((error) => {
                dispatch(getListFailed("Failed to handle JSON: " + error));
            });
            } else {
                if(response.status === 403){
                    dispatch(removeState());
                    dispatch(logoutSuccess());
                } 
                dispatch(getListFailed("Server responded with status: " + response.statusText));
            }
        }).catch((error) => {
            dispatch(getListFailed("Server responded with an error: " + error));
        });
    }
}

export const addToList = (token, item) => {
    return dispatch => {
        let request = {
            method:"POST",
            mode:"cors",
            //Content-type pakollinen, jos on body. Muutoin ei pysty purkamaan.
            headers:{"Content-type":"application/json",
                    "token":token},
            body:JSON.stringify(item)
          }
          dispatch(fetchLoading());
          fetch("/api/shopping", request).then((response) => {
            dispatch(loadingDone());
            if(response.ok){
                dispatch(addToListSuccess());
              dispatch(getList(token));
            } else {
                if(response.status === 403){
                    dispatch(removeState());
                    dispatch(logoutSuccess());
                }
                dispatch(addToListFailed("Server respondend with status: " + response.statusText));
            }
          }).catch((error) => {
                dispatch(loadingDone());
                dispatch(addToListFailed("Server responded with error: " + error));
          });
    }
}

export const removeFromList = (token, id) => {
    return dispatch => {
        let request = {
            method:"DELETE",
            mode:"cors",
            headers:{"Content-type":"application/json",
                    "token":token}
          }
          dispatch(fetchLoading());
          fetch("/api/shopping/"+id, request).then((response) => {
              dispatch(loadingDone());
            if(response.ok){
                dispatch(removeFromListSuccess());
                dispatch(getList(token));
            } else {
                dispatch(removeState());
                dispatch(logoutSuccess());
              dispatch(removeFromList("Server respondend with status: " + response.status));
            }
          }).catch((error) => {
            dispatch(loadingDone());
            dispatch(removeFromListFailed("Server responded with error: " + error));
          });
    }
}

export const editItem = (token, item) => {
    return dispatch => {
        let request = {
            method:"PUT",
            mode:"cors",
            headers:{"Content-type":"application/json",
                    "token":token},
            body:JSON.stringify(item)
          }
          dispatch(fetchLoading());
          fetch("/api/shopping/"+item._id, request).then((response) => {
            dispatch(loadingDone());
            if(response.ok){
              dispatch(getList(token));
              dispatch(editItemSuccess());
            } else {
                if(response.status === 403) {
                    dispatch(removeState());
                    dispatch(logoutSuccess());
                }
              dispatch(editItemFailed("Server respondend with status: " + response.statusText));
            }
          }).catch((error) => {
            dispatch(loadingDone());
            dispatch(editItemFailed("Server responded with error: " + error));
          });
    }

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

const removeFromListSuccess = () => {
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