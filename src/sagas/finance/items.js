import { take, put, call, fork, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as actions from 'actions'
import {
    ACCOUNTS_URL,
    ITEMS_URL,
    TRANSACTIONS_URL,
    USER_URL,
    apiCall } from 'services/api'
import { getTransactions } from 'selectors'
import { apiGet } from '../web/apiGetRequest'


function* waitTransactions(){
    let transactions = yield select(getTransactions)
    const initialCount = transactions.length
    let attempt = 0

    while (true){
        transactions = yield select(getTransactions)
        let count = transactions.length
        if (count > initialCount || attempt > 10){
            break
        }

        yield call(delay, 30000)
        yield apiGet('transactions', {}, TRANSACTIONS_URL)
        yield call(delay, 3000)
        attempt++
    }
}


// ------- Create Item

function* createItem(publicToken, account_id){
    yield put({type: actions.CREATE_ITEM.REQUEST})
    const form = {public_token: publicToken, account_id: account_id}
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

    // When user created new Item, transaction are not ready instantly.
    // Wait for transactions (10 attempts every 30 seconds).
    yield waitTransactions()

}

export function* watchCreateItem(){
  while(true){
    const { publicToken, account_id } = yield take(actions.CREATE_ITEM.SUBMIT)
    yield fork(createItem, publicToken, account_id)
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
