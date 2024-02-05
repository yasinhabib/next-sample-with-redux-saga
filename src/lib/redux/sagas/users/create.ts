import { createUser, } from '../../../services';
import { UserType } from '../../slices/users';
import { CREATE_USER } from '../../types'
import { put, takeEvery } from 'redux-saga/effects'
import { setTextNotification } from '../../slices/notification';

type AnyAction = {type: string, data: UserType}

export function* createUserSaga({data}: AnyAction) {
    try{    
        const response: UserType = yield createUser(data);

        yield put(setTextNotification({text: 'User Has Been Created', severity: 'success'}))
    }catch(error: any){
        yield put(setTextNotification({text: error.message, severity: 'error'}))
    }
}


export function* watchCreateUserAsync() {
    yield takeEvery(CREATE_USER, createUserSaga)
}