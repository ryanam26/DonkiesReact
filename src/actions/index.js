
// convention:
// GET - for sync calls, FETCH - for async calls

const GET = 'GET'
const FETCH = 'FETCH'
const HIDE = 'HIDE'
const SUBMIT = 'SUBMIT'
const REQUEST = 'REQUEST'
const RELOAD = 'RELOAD'
const SET = 'SET'
const SHOW = 'SHOW'
const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR'
const SET_CLEAR_FORM = 'SET_CLEAR_FORM'
const UNSET_CLEAR_FORM = 'UNSET_CLEAR_FORM'

function createRequestTypes(base) {
  const res = {};
  [
    GET,
    FETCH,
    HIDE,
    SUBMIT,
    REQUEST,
    SET,
    SHOW,
    SUCCESS,
    RELOAD,
    SET_CLEAR_FORM,
    UNSET_CLEAR_FORM,
    ERROR].forEach(type => res[type] = `${base}_${type}`)

  return res;
}

export const ACCOUNTS = createRequestTypes('ACCOUNTS')
export const ACCOUNTS_SET_ACTIVE = createRequestTypes('ACCOUNTS_SET_ACTIVE')
export const ACCOUNTS_SET_NUMBER = createRequestTypes('ACCOUNTS_SET_NUMBER')
export const ACCOUNTS_SET_PRIMARY = createRequestTypes('ACCOUNTS_SET_PRIMARY')
export const ADD_LENDER = createRequestTypes('ADD_LENDER')
export const API_GET_REQUEST = createRequestTypes('API_GET_REQUEST')
export const API_EDIT_REQUEST = createRequestTypes('API_EDIT_REQUEST')
export const CHANGE_EMAIL = createRequestTypes('CHANGE_EMAIL')
export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD')
export const CLOSE_DONKIES_ACCOUNT = createRequestTypes('CLOSE_DONKIES_ACCOUNT')
export const CREATE_ITEM = createRequestTypes('CREATE_ITEM')
export const CREATE_ACCOUNT = createRequestTypes('CREATE_ACCOUNT')
export const DEBT_INSTITUTIONS = createRequestTypes('DEBT_INSTITUTIONS')
export const DELETE_ITEM = createRequestTypes('DELETE_ITEM')
export const DELETE_LENDER = createRequestTypes('DELETE_LENDER')
export const EDIT_PROFILE = createRequestTypes('EDIT_PROFILE')
export const EDIT_USER_SETTINGS = createRequestTypes('EDIT_USER_SETTINGS')
export const ITEMS = createRequestTypes('ITEMS')
export const LENDERS = createRequestTypes('LENDERS')
export const LOGIN = createRequestTypes('LOGIN')
export const LOGIN_FACEBOOK = createRequestTypes('LOGIN_FACEBOOK')
export const REGISTRATION = createRequestTypes('REGISTRATION')
export const RESET_PASSWORD_REQUEST = createRequestTypes('RESET_PASSWORD_REQUEST')
export const SETTINGS = createRequestTypes('SETTINGS')
export const SETTINGS_LOGIN = createRequestTypes('SETTINGS_LOGIN')
export const TOKEN = createRequestTypes('TOKEN')
export const STAT = createRequestTypes('STAT')
export const TRANSACTIONS = createRequestTypes('TRANSACTIONS')
export const TRANSFERS_DEBT = createRequestTypes('TRANSFERS_DEBT')
export const TRANSFERS_DONKIES = createRequestTypes('TRANSFERS_DONKIES')
export const TRANSFERS_PREPARE = createRequestTypes('TRANSFERS_PREPARE')
export const TRANSFERS_STRIPE = createRequestTypes('TRANSFERS_STRIPE')
export const USER = createRequestTypes('USER')

export const ALERT_ADD = 'ALERT_ADD'
export const ALERT_REMOVE = 'ALERT_REMOVE'
export const FORM_ERRORS =  'FORM_ERRORS'
export const GROWL_ADD_REQUEST = 'GROWL_ADD_REQUEST'
export const GROWL_ADD = 'GROWL_ADD'
export const GROWL_REMOVE = 'GROWL_REMOVE'
export const LOGOUT =  'LOGOUT'
export const NAVIGATE =  'NAVIGATE'
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
export const SET_ACTIVE_MENU = 'SET_ACTIVE_MENU'
export const TOKEN_EXPIRED =  'TOKEN_EXPIRED'
export const UPDATE_ROUTER_STATE = 'UPDATE_ROUTER_STATE'


function action(type, payload = {}) {
  return {type, ...payload}
}

// Generic GET request
// Example: name="some"
// actions should have "SOME.FETCH", "SOME.SUCCESS", "SOME.ERROR"
// url should be equal "SOME_URL"
export const apiGetRequest = (name, params, url=null) => action(API_GET_REQUEST.FETCH, {name, params, url})


// Generic EDIT (PATCH) request
// Example: name="some"
// actions should have "SOME_EDIT.SUCCESS", "SOME_EDIT.ERROR"
// url in api should be equal "SOME_URL"
// form should conatain id (edit by id)
export const apiEditRequest = (name, id, form, url=null) => action(API_EDIT_REQUEST.SUBMIT, {name, id, form, url})


// layout
export const alertAdd = (alertType, message) => action(ALERT_ADD, {alertType, message})
export const alertRemove = (message) => action(ALERT_REMOVE, {message})
export const growlAddRequest = (payload) => action(GROWL_ADD_REQUEST, {payload})
export const navigate = pathname => action(NAVIGATE, {pathname})
export const resetErrorMessage = () => action(RESET_ERROR_MESSAGE)
export const setFormErrors = (formType, errors) => action(FORM_ERRORS, {formType, errors})
export const setActiveMenu = url => action(SET_ACTIVE_MENU, {url})
export const updateRouterState = state => action(UPDATE_ROUTER_STATE, {state})


// finance
export const accountsSetActive = (id, form) => action(ACCOUNTS_SET_ACTIVE.SUBMIT, {id, form})
export const accountsSetNumber = (id, form) => action(ACCOUNTS_SET_NUMBER.SUBMIT, {id, form})
export const accountsSetPrimary = (id) => action(ACCOUNTS_SET_PRIMARY.SUBMIT, {id})
export const createItem = (publicToken, account_id) => action(CREATE_ITEM.SUBMIT, {publicToken, account_id})
export const createAccount = (form) => action(CREATE_ACCOUNT.SUBMIT, {form})
export const deleteItem = (guid) => action(DELETE_ITEM.SUBMIT, {guid})
export const addLender = (form) => action(ADD_LENDER.SUBMIT, {form})
export const deleteLender = (id) => action(DELETE_LENDER.SUBMIT, {id})

// auth
export const getToken = () => action(TOKEN.GET)
export const login = (email, password) => action(LOGIN.SUBMIT, {email, password})
export const loginFacebook = (code) => action(LOGIN_FACEBOOK.SUBMIT, {code})
export const logout = () => action(LOGOUT)
export const registration = (form) => action(REGISTRATION.SUBMIT, {form})


// user
export const changeEmail = (form) => action(CHANGE_EMAIL.SUBMIT, {form})
export const changePassword = (form) => action(CHANGE_PASSWORD.SUBMIT, {form})
export const closeDonkiesAccount = () => action(CLOSE_DONKIES_ACCOUNT.SUBMIT)
export const editProfile = (form) => action(EDIT_PROFILE.SUBMIT, {form})
export const editUserSettings = (form) => action(EDIT_USER_SETTINGS.SUBMIT, {form})
export const resetPasswordRequest = (form) => action(RESET_PASSWORD_REQUEST.SUBMIT, {form})
