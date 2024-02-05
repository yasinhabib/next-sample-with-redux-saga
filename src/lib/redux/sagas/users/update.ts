import { updateUser, } from '../../../services';
import { UserType } from '../../slices/users';
import { UPDATE_USER } from '../../types'
import { put, takeEvery } from 'redux-saga/effects'
import { setTextNotification } from '../../slices/notification';

type AnyAction = {type: string, id: number, data: UserType}

export function* updateUserSaga({id,data}: AnyAction) {
    try{    
        const response: UserType = yield updateUser(id, data );

        yield put(setTextNotification({text: 'User Has Been Updated', severity: 'success'}))
    }catch(error: any){
        yield put(setTextNotification({text: error.message, severity: 'error'}))
    }
}


export function* watchUpdateUserAsync() {
    yield takeEvery(UPDATE_USER, updateUserSaga)
}