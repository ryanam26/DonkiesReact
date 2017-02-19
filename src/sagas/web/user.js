import { take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from 'actions'
import { createUUID } from 'services/helpers'
import {
    CHANGE_EMAIL_URL,
    CHANGE_EMAIL_CONFIRM_URL,
    CHANGE_PASSWORD_URL,
    RESET_PASSWORD_REQUEST_URL,
    USER_URL,
    USER_SETTINGS_URL,
    apiCall } from 'services/api'



// ------- Edit profile

function* editProfile(form){
    yield put({type: actions.EDIT_PROFILE.REQUEST}) 

    const result = yield call(apiCall, USER_URL, 'PUT', form, true)
    
    if (result.isError){
        yield put({type: actions.EDIT_PROFILE.ERROR, payload: result.data})    
        return
    } 
    
    const id = createUUID()

    yield put({
        type: actions.GROWL_ADD_REQUEST,
        payload: {id: id, message: 'Your profile has been changed!', type: 'success'}
    })
    
    yield put({type: actions.EDIT_PROFILE.SUCCESS, payload: result.data})
    
}

export function* watchEditProfile(){
  while(true){
    const { form } = yield take(actions.EDIT_PROFILE.SUBMIT)
    yield fork(editProfile, form)
  }
}


// ------- Change email

function* changeEmail(form){
    yield put({type: actions.CHANGE_EMAIL.REQUEST}) 

    const result = yield call(apiCall, CHANGE_EMAIL_URL, 'POST', form, true)
    
    if (result.isError){
        yield put({type: actions.CHANGE_EMAIL.ERROR, payload: result.data})  
        return  
    } 
    
    yield put({type: actions.CHANGE_EMAIL.SUCCESS, payload: result.data})
    
    const id = createUUID()

    yield put({
        type: actions.GROWL_ADD_REQUEST,
        payload: {id: id, message: result.data.message, type: 'success', delay: 20000}
    })
    
}

export function* watchChangeEmail(){
  while(true){
    const { form } = yield take(actions.CHANGE_EMAIL.SUBMIT)
    yield fork(changeEmail, form)
  }
}


// ------- Change password

function* changePassword(form){
    yield put({type: actions.CHANGE_PASSWORD.REQUEST}) 

    const result = yield call(apiCall, CHANGE_PASSWORD_URL, 'POST', form, true)
    
    if (result.isError){
        yield put({type: actions.CHANGE_PASSWORD.ERROR, payload: result.data})  
        return  
    } 

    yield put({type: actions.CHANGE_PASSWORD.SUCCESS, payload: result.data})
    
    const id = createUUID()

    yield put({
        type: actions.GROWL_ADD_REQUEST,
        payload: {id: id, message: 'Your password has been changed!', type: 'success'}
    })
}

export function* watchChangePassword(){
  while(true){
    const { form } = yield take(actions.CHANGE_PASSWORD.SUBMIT)
    yield fork(changePassword, form)
  }
}


// ------- Edit user settings

function* editSettings(form){
    yield put({type: actions.EDIT_USER_SETTINGS.REQUEST}) 

    const result = yield call(apiCall, USER_SETTINGS_URL, 'PATCH', form, true)
    
    if (result.isError){
        yield put({type: actions.EDIT_USER_SETTINGS.ERROR, payload: result.data})    
        return
    } 
    
    const id = createUUID()

    yield put({
        type: actions.GROWL_ADD_REQUEST,
        payload: {id: id, message: 'Settings have been changed!', type: 'success'}
    })
    
    yield put({type: actions.EDIT_USER_SETTINGS.SUCCESS, payload: result.data})
    
}

export function* watchEditSettings(){
  while(true){
    const { form } = yield take(actions.EDIT_USER_SETTINGS.SUBMIT)
    yield fork(editSettings, form)
  }
}


// ------- Reset password request

function* resetPasswordRequest(form){
    yield put({type: actions.RESET_PASSWORD_REQUEST.REQUEST}) 

    const result = yield call(apiCall, RESET_PASSWORD_REQUEST_URL, 'POST', form, false)
    
    if (result.isError){
        yield put({type: actions.RESET_PASSWORD_REQUEST.ERROR, payload: result.data})  
        return  
    } 

    yield put({type: actions.RESET_PASSWORD_REQUEST.SUCCESS, payload: result.data})
}

export function* watchResetPasswordRequest(){
  while(true){
    const { form } = yield take(actions.RESET_PASSWORD_REQUEST.SUBMIT)
    yield fork(resetPasswordRequest, form)
  }
}
