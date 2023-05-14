import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    isFirstEntrance: null as Nullable<boolean>,

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
    }
})

export const {setIsLoggedIn, setIsFirstEntrance} = userSlice.actions