import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import news from '@/lib/redux/slices/news';
import users from '@/lib/redux/slices/users';
import notification from '@/lib/redux/slices/notification';
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: {
        news,
        users,
        notification
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: false}).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export type AppStore = ReturnType<() => typeof store>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = AppStore['dispatch']
export default store