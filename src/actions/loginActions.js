//ACTION CONSTANTS
export const FETCH_LOADING = "FETCH_LOADING"
export const LOADING_DONE = "LOADING_DONE"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILED = "LOGIN_FAILED"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAILED = "REGISTER_FAILED"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILED = "LOGOUT_FAILED"

//ACTIONS
export const onRegister = (user) => {
    return dispatch => {
        let request = {
            method:"POST",
            mode:"cors",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(user)
          }
          dispatch(fetchLoading())
          fetch("/register", request).then((response) => {
            dispatch(loadingDone())
            if(response.ok){
              alert("Register success!");
              dispatch(registerSuccess());
            } else {
                dispatch(registerFailed("Server responded with status: " + response.status));
            }
        }).catch((error) => {
            dispatch(loadingDone())
            dispatch(registerFailed("Server responded with status: " + error));
        })
    }
}

export const onLogin = (user) => {
    return dispatch => {
        let request = {
            method:"POST",
            mode:"cors",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(user)
          }
          dispatch(fetchLoading())
          fetch("/login", request).then((response) => {
            dispatch(loadingDone())
            if(response.ok){
              response.json().then(data => {
                dispatch(loginSuccess(data.token));
              }).catch((error) => {
                  dispatch(loginFailed("JSON parse failed with error: " + error));
              })
            } else {
                dispatch(loginFailed("Server responded with status: " + response.status));
            }
        }).catch((error) => {
            dispatch(loadingDone())
            dispatch(loginFailed("Server responded  with error: " + error));
        })
    }
}

export const onLogout = (token) => {
    return dispatch => {
        let request = {
            method:"POST",
            mode:"cors",
            headers:{"Content-type":"application/json",
                    "token":token}
          }
          dispatch(fetchLoading())
          fetch("/logout", request).then((response) => {
            dispatch(loadingDone());
            dispatch(logoutSuccess());
        
        }).catch(error => {
            dispatch(loadingDone());
            dispatch(logoutFailed("Logged out but server responded with error: " + error))
        })
    }
}

//ACTIONS CREATORS
export const fetchLoading = () => {
    return {
        type:FETCH_LOADING
    }
}

export const loadingDone = () => {
    return {
        type:LOADING_DONE
    }
}

const registerSuccess = () => {
    return {
        type:REGISTER_SUCCESS
    }
}

const registerFailed = (error) => {
    return {
        type:REGISTER_FAILED,
        error:error
    }
}

const loginSuccess = (token) => {
    return {
        type:LOGIN_SUCCESS,
        token:token
    }
}

const loginFailed = (error) => {
    return {
        type:LOGIN_FAILED,
        error:error
    }
}

const logoutSuccess = () => {
    return {
        type:LOGOUT_SUCCESS
    }
}

const logoutFailed = (error) => {
    return {
        type:LOGOUT_FAILED,
        error:error
    }
}