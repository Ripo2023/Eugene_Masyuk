import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    isFirstEntrance: null as Nullable<boolean>,
    phoneNumber: null as Nullable<string>,
    userId: null as Nullable<number>

}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
			state.isLoggedIn = action.payload;
		},

        setIsFirstEntrance: (state, action: PayloadAction<boolean>) => {
			state.isFirstEntrance = action.payload;
		},
        setPhoneNumber: (state, action: PayloadAction<string>) => {
			state.phoneNumber = action.payload;
		},
        setUserId: (state, action: PayloadAction<number>) => {
			state.userId = action.payload;
		},
    }
})

export const {setIsLoggedIn,setPhoneNumber,setUserId, setIsFirstEntrance} = userSlice.actions