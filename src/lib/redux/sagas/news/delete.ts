import { deleteNews, } from '../../../services';
import { NewsType } from '../../slices/news';
import { DELETE_NEWS } from '../../types'
import { put, takeEvery } from 'redux-saga/effects'
import { setTextNotification } from '../../slices/notification';

type AnyAction = {type: string, id: number}

export function* deleteNewsSaga({id}: AnyAction) {
    try{    
        yield deleteNews(id);

        yield put(setTextNotification({text: 'News Has Been Deleted', severity: 'success'}))
    }catch(error: any){
        yield put(setTextNotification({text: error.message, severity: 'error'}))
    }
}


export function* watchDeleteNewsAsync() {
    yield takeEvery(DELETE_NEWS, deleteNewsSaga)
}