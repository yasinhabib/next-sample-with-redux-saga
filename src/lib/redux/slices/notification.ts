import {createSlice} from '@reduxjs/toolkit'


const initialState : {
    text: string | undefined,
    severity: 'error' | 'info' | 'success' | 'warning' | undefined
} = {
    text: '',
    severity: 'success'
}

const notification = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        setTextNotification: (state,action) => {
            state.text = action.payload.text
            state.severity = action.payload.severity

            return state
        },
    }
})

export const {setTextNotification} = notification.actions

export default notification.reducer