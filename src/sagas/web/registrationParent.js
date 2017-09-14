import { take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from 'actions'
import { REGISTRATION_PARENT_URL, apiCall } from 'services/api'


function* registartionParent(form){
    const result = yield call(apiCall, REGISTRATION_PARENT_URL, 'POST', form)
    if(result.isError){
        yield put({type: actions.REGISTRATION_PARENT.ERROR, payload: result.data})
    } else {
        yield put({type: actions.REGISTRATION_PARENT.SUCCESS, payload: ''})
    }
}

export function* watchRegistrationParent(){
  while(true){
    const { form } = yield take(actions.REGISTRATION_PARENT.SUBMIT)
    yield fork(registartionParent, form)
  }
}
