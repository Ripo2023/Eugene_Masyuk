import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { UserKeys } from "../config";
import { setIsFirstEntrance, setPhoneNumber, setUserId } from "./slice";
import { AppDispatch } from "../../../app/store";

export const loadInitialData = createAsyncThunk(
	`user/initializeData`,
	async (_, { dispatch }) => {
        const isFirstEntrance = await AsyncStorage.getItem(UserKeys.IS_FIRST_ENTRANCE)
        const phoneNumber = await AsyncStorage.getItem(UserKeys.PHONE_NUMBER)
        const userId = await AsyncStorage.getItem(UserKeys.USER_ID)

        if (phoneNumber) {
            dispatch(setPhoneNumber(phoneNumber))
        }
        if (userId) {
            dispatch(setUserId(+userId))
        }
        if (isFirstEntrance) {
            dispatch(setIsFirstEntrance(true))
        } else {
            dispatch(setIsFirstEntrance(false))
        }
    })


export const setIsFirstEntranceThunk = async () => {
    await AsyncStorage.setItem(UserKeys.IS_FIRST_ENTRANCE, "true");
}

export const saveUserInfo = async (phoneNumber: string,userId: number, dispatch: AppDispatch) => {
    await AsyncStorage.setItem(UserKeys.PHONE_NUMBER, phoneNumber)
    await AsyncStorage.setItem(UserKeys.USER_ID, userId.toString())
    dispatch(setUserId(userId))
    dispatch(setPhoneNumber(phoneNumber))
}