import { setCookie } from 'cookies-next';
import { login } from '../../../services';
import { LoginServiceResponse } from '../../../services/auth';
import { setTextNotification } from '../../slices/notification';
import { LOGIN } from '../../types'
import { put, takeEvery } from 'redux-saga/effects'

type AnyAction = {type: string, [key: string]: any}

export function* loginSagas({email, password} : AnyAction) {
    try{    
        const loginResponse: LoginServiceResponse = yield login(email,password);

        setCookie('token',loginResponse.token)

        yield put(setTextNotification({text: 'Login Successfull', severity: 'success'}))
        window.location.href = '/dashboard'
    }catch(error: any){
        yield put(setTextNotification({text: error.message, severity: 'error'}))
    }
}

export function* watchLoginAsync() {
    yield takeEvery(LOGIN, loginSagas)
}