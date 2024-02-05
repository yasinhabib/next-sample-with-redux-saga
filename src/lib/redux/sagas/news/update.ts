import { updateNews, } from '../../../services';
import { NewsType } from '../../slices/news';
import { UPDATE_NEWS } from '../../types'
import { put, takeEvery } from 'redux-saga/effects'
import { setTextNotification } from '../../slices/notification';

type AnyAction = {type: string, id: number, data: NewsType}

export function* updateNewsSaga({id,data}: AnyAction) {
    try{    
        const response: NewsType = yield updateNews(id, data );

        yield put(setTextNotification({text: 'News Has Been Updated', severity: 'success'}))
    }catch(error: any){
        yield put(setTextNotification({text: error.message, severity: 'error'}))
    }
}


export function* watchUpdateNewsAsync() {
    yield takeEvery(UPDATE_NEWS, updateNewsSaga)
}