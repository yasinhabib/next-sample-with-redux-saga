import {createSlice} from '@reduxjs/toolkit'

export type NewsType = {
    id?: number,
    date: Date,
    title: string,
    content: string
}

const initialState : {
    fetching: boolean,
    news: NewsType[],
    error? : any
} = {
    fetching: false,
    news: []
}

const news = createSlice({
    name: 'news',
    initialState: initialState,
    reducers: {
        requestNews: (state) => {
            state.fetching = true
            state.news = []
            delete state.error

            return state
        },
        receiveNews: (state, action) => {
            state.fetching = false
            state.news = action.payload
            delete state.error

            return state
        },
        errorNews: (state, action) => {
            state.fetching = false
            state.news = []
            state.error = action.payload

            return state
        }
    }
})

export const {requestNews,receiveNews,errorNews} = news.actions

export default news.reducer