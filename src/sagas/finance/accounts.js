import { take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from 'actions'
import {
    ACCOUNTS_URL,
    ACCOUNTS_SET_ACTIVE_URL,
    ACCOUNTS_SET_NUMBER_URL,
    apiCall } from 'services/api'
import { apiGet } from '../web/apiGetRequest'


// ------- Set active

function* setActive(id, form){
    yield put({type: actions.ACCOUNTS_SET_ACTIVE.REQUEST}) 

    const url = `${ACCOUNTS_SET_ACTIVE_URL}/${id}`

    const result = yield call(apiCall, url, 'PUT', form, true)
    
    if (result.isError){
        yield put({type: actions.ACCOUNTS_SET_ACTIVE.ERROR, payload: result.data})    
        return
    } 
    
    yield apiGet('accounts', {}, ACCOUNTS_URL)  
}

export function* watchSetActive(){
  while(true){
    const { id, form } = yield take(actions.ACCOUNTS_SET_ACTIVE.SUBMIT)
    yield fork(setActive, id, form)
  }
}


// ------- Set account number

function* setAccountNumber(id, form){
    yield put({type: actions.ACCOUNTS_SET_NUMBER.REQUEST}) 

    const url = `${ACCOUNTS_SET_NUMBER_URL}/${id}`
    const result = yield call(apiCall, url, 'POST', form, true)
    
    if (result.isError){
        yield put({type: actions.ACCOUNTS_SET_NUMBER.ERROR, payload: result.data})    
        return
    } 
    
    yield apiGet('accounts', {}, ACCOUNTS_URL)  
    yield put({type: actions.ACCOUNTS_SET_NUMBER.SUCCESS}) 
}

export function* watchSetAccountNumber(){
  while(true){
    const { id, form } = yield take(actions.ACCOUNTS_SET_NUMBER.SUBMIT)
    yield fork(setAccountNumber, id, form)
  }
}



