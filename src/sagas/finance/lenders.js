import { take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from 'actions'
import { LENDERS_URL, apiCall } from 'services/api'
import { apiGet } from '../web/apiGetRequest'


// ------- Add lender

function* addLender(form){
    yield put({type: actions.ADD_LENDER.REQUEST}) 
    const result = yield call(apiCall, LENDERS_URL, 'POST', form, true)
    
    if (result.isError){
        yield put({type: actions.ADD_LENDER.ERROR, payload: result.data})    
        return
    } 
    
    yield put({type: actions.ADD_LENDER.SUCCESS})    
    yield apiGet('lenders', {}, LENDERS_URL)  
}

export function* watchAddLender(){
  while(true){
    const { form } = yield take(actions.ADD_LENDER.SUBMIT)
    yield fork(addLender, form)
  }
}


// ------- Delete Lender

function* deleteLender(id){
    yield put({type: actions.DELETE_LENDER.REQUEST}) 
    const url = `${LENDERS_URL}/${id}`
    
    const result = yield call(apiCall, url, 'DELETE', {}, true)
    
    if (result.isError){
        yield put({type: actions.DELETE_LENDER.ERROR, payload: result.data})    
        return
    } 

    yield put({type: actions.DELETE_LENDER.SUCCESS})
    yield apiGet('lenders', {}, LENDERS_URL)
}

export function* watchDeleteLender(){
  while(true){
    const { id } = yield take(actions.DELETE_LENDER.SUBMIT)
    yield fork(deleteLender, id)
  }
}