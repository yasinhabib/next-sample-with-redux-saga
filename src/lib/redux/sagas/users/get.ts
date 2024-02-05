import { getUserList, } from '../../../services';
import { errorUser, receiveUser, requestUser } from '../../slices/users';
import { GET_USER_LIST } from '../../types'
import { put, takeEvery } from 'redux-saga/effects'
import { setTextNotification } from '../../slices/notification';
import { UserListResponse } from '@/lib/services/users';

type AnyAction = {type: string, id: number}

export function* getUserSaga({}: AnyAction) {
    try{ 
        yield put(requestUser())
        
        const response: UserListResponse = yield getUserList();

        yield put(receiveUser(response.data))

        yield put(setTextNotification({text: 'Successfully Retrieved User Data', severity: 'success'}))
    }catch(error: any){
        yield put(errorUser(error.message))

        yield put(setTextNotification({text: error.message, severity: 'error'}))
    }
}


export function* watchGetUserAsync() {
    yield takeEvery(GET_USER_LIST, getUserSaga)
}