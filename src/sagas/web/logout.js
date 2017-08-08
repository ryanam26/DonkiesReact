import { take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from 'actions'
import { LOGOUT_URL, apiCall } from 'services/api'


function* logout(){

    const result = yield call(apiCall, LOGOUT_URL, 'GET', {})
}

export function* watchLogout(){
  while(true){
    yield take(actions.LOGOUT)
    yield fork(logout)
  }
}


