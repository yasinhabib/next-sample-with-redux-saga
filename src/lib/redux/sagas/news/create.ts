import { createNews, getNewsList, } from '../../../services';
import { NewsType, receiveNews, requestNews } from '../../slices/news';
import { CREATE_NEWS } from '../../types'
import { put, takeEvery } from 'redux-saga/effects'
import { setTextNotification } from '../../slices/notification';
import { NewsListResponse } from '@/lib/services/news';

type AnyAction = {type: string, data: NewsType}

export function* createNewsSaga({data}: AnyAction) {
    try{
        yield put(requestNews())

        yield createNews(data);

        const response: NewsListResponse = yield getNewsList();

        yield put(receiveNews(response.data))

        yield put(setTextNotification({text: 'News Has Been Created', severity: 'success'}))
    }catch(error: any){
        yield put(setTextNotification({text: error.message, severity: 'error'}))
    }
}


export function* watchCreateNewsAsync() {
    yield takeEvery(CREATE_NEWS, createNewsSaga)
}