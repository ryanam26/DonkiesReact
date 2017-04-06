import { take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from 'actions'
import { ACCOUNTS_URL, ITEMS_URL, USER_URL, apiCall } from 'services/api'
import { apiGet } from '../web/apiGetRequest'


// ------- Create Item

function* createItem(publicToken){
    yield put({type: actions.CREATE_ITEM.REQUEST}) 
    const form = {public_token: publicToken}
    const result = yield call(apiCall, ITEMS_URL, 'POST', form, true)
    
    if (result.isError){
        yield put({type: actions.CREATE_ITEM.ERROR, payload: result.data}) 
        yield put({
            type: actions.GROWL_ADD_REQUEST,
            payload: {message: 'Error in creating account.', type: 'danger'}
        })
        return
    } 
    
    yield put({type: actions.CREATE_ITEM.SUCCESS, payload: result.data}) 

    // Update items, accounts and user in Redux state.
    // User need to be updated for signup_steps
    yield apiGet('items', {}, ITEMS_URL)
    yield apiGet('accounts', {}, ACCOUNTS_URL)  
    yield apiGet('user', {}, USER_URL)  
}

export function* watchCreateItem(){
  while(true){
    const { publicToken } = yield take(actions.CREATE_ITEM.SUBMIT)
    yield fork(createItem, publicToken)
  }
}


// ------- Delete Item

function* deleteItem(guid){
    yield put({type: actions.DELETE_ITEM.REQUEST}) 
    const url = `${ITEMS_URL}/${guid}`
    
    const result = yield call(apiCall, url, 'DELETE', {}, true)
    
    if (result.isError){
        yield put({type: actions.DELETE_ITEM.ERROR, payload: result.data})    
        return
    } 
    yield put({type: actions.DELETE_ITEM.SUCCESS})

    // Update Redux state
    yield apiGet('items', {}, ITEMS_URL)
    yield apiGet('accounts', {}, ACCOUNTS_URL)  
    
}

export function* watchDeleteItem(){
  while(true){
    const { guid } = yield take(actions.DELETE_ITEM.SUBMIT)
    yield fork(deleteItem, guid)
  }
}