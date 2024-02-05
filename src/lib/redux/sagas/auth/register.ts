import { register } from '../../../services';
import { RegisterServiceResponse } from '../../../services/auth';
import { setTextNotification } from '../../slices/notification';
import { REGISTER } from '../../types'
import { put, takeEvery } from 'redux-saga/effects'
type AnyAction = {type: string, [key: string]: any}

export function* registerSagas({email, password} : AnyAction) {
    try{    
        const registerResponse: RegisterServiceResponse = yield register(email,password);

        localStorage.setItem('token',registerResponse.token || '');

        yield put(setTextNotification({text: 'Successfully Registered', severity: 'success'}))
    }catch(error: any){
        yield put(setTextNotification({text: error.message, severity: 'error'}))
    }
}

export function* watchRegisterAsync() {
    yield takeEvery(REGISTER, registerSagas)
}