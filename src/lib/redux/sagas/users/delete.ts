import { deleteUser, } from '../../../services';
import { UserType } from '../../slices/users';
import { DELETE_USER } from '../../types'
import { put, takeEvery } from 'redux-saga/effects'
import { setTextNotification } from '../../slices/notification';

type AnyAction = {type: string, id: number}

export function* deleteUserSaga({id}: AnyAction) {
    try{    
        yield deleteUser(id);

        yield put(setTextNotification({text: 'User Has Been Deleted', severity: 'success'}))
    }catch(error: any){
        yield put(setTextNotification({text: error.message, severity: 'error'}))
    }
}


export function* watchDeleteUserAsync() {
    yield takeEvery(DELETE_USER, deleteUserSaga)
}