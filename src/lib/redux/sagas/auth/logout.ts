import { deleteCookie } from 'cookies-next';
import { setTextNotification } from '../../slices/notification';
import { LOGOUT } from '../../types'
import { put, takeEvery } from 'redux-saga/effects'
type AnyAction = {type: string, [key: string]: any}

export function* logoutSagas() {
    try{    
        deleteCookie('token')

        yield put(setTextNotification({text: 'Logout Successfull', severity: 'success'}))
        window.location.href = '/'
    }catch(error: any){
        yield put(setTextNotification({text: error.message, severity: 'error'}))
    }
}

export function* watchLogoutAsync() {
    yield takeEvery(LOGOUT, logoutSagas)
}