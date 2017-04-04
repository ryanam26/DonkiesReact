import { take, put, call, fork, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as actions from 'actions'
import { createUUID } from 'services/helpers'


// ------- Growl add

function* growlAdd(payload){
    let obj = {...payload}
    if (!obj.hasOwnProperty('id')){
        obj.id = createUUID()
    }

    yield put({type: actions.GROWL_ADD, payload: obj})
    yield call(delay, 1000)
    yield put({type: actions.GROWL_REMOVE, id: obj.id})
}

export function* watchGrowlAdd(){
  while(true){
    const { payload } = yield take(actions.GROWL_ADD_REQUEST)
    yield fork(growlAdd, payload)
  }
}

