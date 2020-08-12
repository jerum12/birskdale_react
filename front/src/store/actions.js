export const COLLAPSE_MENU = 'COLLAPSE_MENU';
export const COLLAPSE_TOGGLE = 'COLLAPSE_TOGGLE';
export const FULL_SCREEN = 'FULL_SCREEN';
export const FULL_SCREEN_EXIT = 'FULL_SCREEN_EXIT';
export const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
export const NAV_CONTENT_LEAVE = 'NAV_CONTENT_LEAVE';
export const NAV_COLLAPSE_LEAVE = 'NAV_COLLAPSE_LEAVE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const HAS_STOCKS_UPDATE = 'STOCKS_UPDATE'

export function requestLogin(creds) {
    return {
      type: LOGIN_REQUEST,
      isFetching: true,
      isAuthenticated: false,
      creds
    }
  }
  
  export  function receiveLogin(user) {
    return {
      type: LOGIN_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
      id_token: user.token
    }
  }
  
  export function loginError(message) {
    return {
      type: LOGIN_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      message
    }
  }

  export function requestLogout() {
    return {
      type: LOGOUT_REQUEST,
      isFetching: true,
      isAuthenticated: true
    }
  }
  
  export function receiveLogout() {
    return {
      type: LOGOUT_SUCCESS,
      isFetching: false,
      isAuthenticated: false
    }
  }
  
  // Logs the user out
  export function logoutUser() {
    return dispatch => {
      //console.log('-----------------------------------------------------')
      dispatch(requestLogout())
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('access_token')
      dispatch(receiveLogout())
    }
  }