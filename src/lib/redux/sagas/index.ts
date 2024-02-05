import { all } from "redux-saga/effects";
import { watchLoginAsync } from "./auth/login";
import { watchLogoutAsync } from "./auth/logout";
import { watchRegisterAsync } from "./auth/register";
import { watchGetUserAsync } from "./users/get";
import { watchCreateUserAsync } from "./users/create";
import { watchUpdateUserAsync } from "./users/update";
import { watchDeleteUserAsync } from "./users/delete";
import { watchGetNewsAsync } from "./news/get";
import { watchCreateNewsAsync } from "./news/create";
import { watchUpdateNewsAsync } from "./news/update";
import { watchDeleteNewsAsync } from "./news/delete";

export function* rootSaga() {
    yield all([
        watchLoginAsync(),
        watchLogoutAsync(),
        watchRegisterAsync(),

        watchGetUserAsync(),
        watchCreateUserAsync(),
        watchUpdateUserAsync(),
        watchDeleteUserAsync(),
        
        watchGetNewsAsync(),
        watchCreateNewsAsync(),
        watchUpdateNewsAsync(),
        watchDeleteNewsAsync()
    ])
}