import { take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from 'actions'
import { ITEMS_URL, apiCall } from 'services/api'
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
    yield put({
        type: actions.GROWL_ADD_REQUEST,
        payload: {message: 'Bank account created.', type: 'success'}
    })

    // Update items and accounts to Redux state.
    yield apiGet('items', {}, ITEMS_URL)
    yield apiGet('accounts', {}, ACCOUNTS_URL)  
}

export function* watchCreateItem(){
  while(true){
    const { publicToken } = yield take(actions.CREATE_ITEM.SUBMIT)
    yield fork(createItem, publicToken)
  }
}

