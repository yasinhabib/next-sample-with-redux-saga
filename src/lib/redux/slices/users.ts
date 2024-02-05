import {createSlice} from '@reduxjs/toolkit'

export type UserType = {
    id?: number,
    email?: string,
    first_name?: string,
    last_name?: string,
    avatar?: string,
    job?: string,
    name?: string
}

const initialState : {
    fetching: boolean,
    users: UserType[],
    error? : any
} = {
    fetching: false,
    users: []
}

const users = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        requestUser: (state) => {
            state.fetching = true
            state.users = []
            delete state.error

            return state
        },
        receiveUser: (state, action) => {
            state.fetching = false
            state.users = action.payload
            delete state.error

            return state
        },
        errorUser: (state, action) => {
            state.fetching = false
            state.users = []
            state.error = action.payload

            return state
        }
    }
})

export const {requestUser,receiveUser,errorUser} = users.actions

export default users.reducer