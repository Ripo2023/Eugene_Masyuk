import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { UserKeys } from "../config";
import { setIsFirstEntrance } from "./slice";

export const loadInitialData = createAsyncThunk(
	`user/initializeData`,
	async (_, { dispatch }) => {
        const isFirstEntrance = await AsyncStorage.getItem(UserKeys.IS_FIRST_ENTRANCE)

        if (isFirstEntrance) {
            dispatch(setIsFirstEntrance(true))
        } else {
            dispatch(setIsFirstEntrance(false))
        }
    })


export const setIsFirstEntranceThunk = async () => {
    await AsyncStorage.setItem(UserKeys.IS_FIRST_ENTRANCE, "true");
}