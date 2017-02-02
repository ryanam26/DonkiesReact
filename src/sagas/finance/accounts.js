import { take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from 'actions'
import { ACCOUNTS_URL, ACCOUNTS_SET_ACTIVE_URL, apiCall } from 'services/api'
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




