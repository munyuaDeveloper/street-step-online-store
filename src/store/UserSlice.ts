import { createSlice } from "@reduxjs/toolkit"
import { User } from "../interfaces/interface"

interface UserSlice{
user: User | null
}
const initialState: UserSlice = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload
        },
        logoutUser: (state) => {
            state.user = null
        }
    }
})


export const {setUserDetails, logoutUser} = userSlice.actions
export default userSlice.reducer




export const fetchUserDetails = async() => {
    const res = await fetch('/api/user-details')
    .then((res) => res.json())
    .then(res => res)

    return res.data
}