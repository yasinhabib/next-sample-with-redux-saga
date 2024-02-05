import { getNewsList, } from '../../../services';
import {  errorNews, receiveNews, requestNews } from '../../slices/news';
import { GET_NEWS_LIST } from '../../types'
import { put, takeEvery } from 'redux-saga/effects'
import { setTextNotification } from '../../slices/notification';
import { NewsListResponse } from '@/lib/services/news';

type AnyAction = {type: string, id: number}

export function* getNewsSaga({}: AnyAction) {
    try{    
        yield put(requestNews())

        const response: NewsListResponse = yield getNewsList();

        yield put(receiveNews(response.data))

        yield put(setTextNotification({text: 'Successfully Retrieved News Data', severity: 'success'}))
    }catch(error: any){
        yield put(errorNews(error.message))

        yield put(setTextNotification({text: error.message, severity: 'error'}))
    }
}


export function* watchGetNewsAsync() {
    yield takeEvery(GET_NEWS_LIST, getNewsSaga)
}