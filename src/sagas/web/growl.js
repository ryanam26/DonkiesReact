import { take, put, call, fork, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as actions from 'actions'


// ------- Growl add

function* growlAdd(payload){
    yield put({type: actions.GROWL_ADD, payload: payload})
    yield call(delay, 1000)
    yield put({type: actions.GROWL_REMOVE, id: payload.id})
}

export function* watchGrowlAdd(){
  while(true){
    const { payload } = yield take(actions.GROWL_ADD_REQUEST)
    yield fork(growlAdd, payload)
  }
}

