import { take, put, call, fork, select } from 'redux-saga/effects'
import * as actions from 'actions'
import { MEMBERS_URL, apiCall } from 'services/api'


// ------- Delete member

function* deleteMember(identifier){
    yield put({type: actions.DELETE_MEMBER.REQUEST}) 
    const url = `${MEMBERS_URL}/${identifier}`
    
    const result = yield call(apiCall, url, 'DELETE', {}, true)
    
    if (result.isError){
        yield put({type: actions.DELETE_MEMBER.ERROR, payload: result.data})    
        return
    } 
    yield put({type: actions.DELETE_MEMBER.SUCCESS})
    
}

export function* watchDeleteMember(){
  while(true){
    const { identifier } = yield take(actions.DELETE_MEMBER.SUBMIT)
    yield fork(deleteMember, identifier)
  }
}
