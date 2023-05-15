import NetInfo, { NetInfoStateType } from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { IOrder, UserKeys } from "../config";
import { setCachedBannersData, setCachedOrdersData, setCachedProductsData, setIsFirstEntrance, setPhoneNumber, setUserId } from "./slice";
import { AppDispatch } from "../../../app/store";
import { IBanner, IProduct } from "../../product/config";

export const loadInitialData = createAsyncThunk(
	`user/initializeData`,
	async (_, { dispatch }) => {
        const isFirstEntrance = await AsyncStorage.getItem(UserKeys.IS_FIRST_ENTRANCE)
        const phoneNumber = await AsyncStorage.getItem(UserKeys.PHONE_NUMBER)
        const userId = await AsyncStorage.getItem(UserKeys.USER_ID)
        const productsData = await AsyncStorage.getItem(UserKeys.PRODUCTS_DATA)
        const bannersData = await AsyncStorage.getItem(UserKeys.BANNERS_DATA)
        const ordersData = await AsyncStorage.getItem(UserKeys.ORDERS_DATA)



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

        if (productsData) {
            dispatch(setCachedProductsData(JSON.parse(productsData)))
        }
        if (bannersData) {
            dispatch(setCachedBannersData(JSON.parse(bannersData)))
        }
        if (ordersData) {
            dispatch(setCachedOrdersData(JSON.parse(ordersData)))
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

export const cacheProductsData = async (data: IProduct[], dispatch: AppDispatch) => {
    await AsyncStorage.setItem(UserKeys.PRODUCTS_DATA, JSON.stringify(data))
    dispatch(setCachedProductsData(data))
}

export const cacheBannersData = async (data: IBanner[], dispatch: AppDispatch) => {
    await AsyncStorage.setItem(UserKeys.BANNERS_DATA, JSON.stringify(data))
    dispatch(setCachedBannersData(data))
}


export const cacheOrdersData = async (data: IOrder[], dispatch: AppDispatch) => {
    await AsyncStorage.setItem(UserKeys.ORDERS_DATA, JSON.stringify(data))
    dispatch(setCachedOrdersData(data))
}

export const getNetworkStatus = async () => {
		const result = await NetInfo.fetch()

        if (result.type === NetInfoStateType.none ||
            result.type === NetInfoStateType.unknown) {
                return false
            }

            return true;
}