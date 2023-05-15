import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { IBanner, IProduct } from "../../product/config";
import { IOrder } from "../config";

const initialState = {
    isLoggedIn: false,
    isFirstEntrance: null as Nullable<boolean>,
    phoneNumber: null as Nullable<string>,
    userId: null as Nullable<number>,
    isNetworkOffline: null as Nullable<boolean>,
    isOpenNetworkModal: null as Nullable<boolean>,
    cachedProductsData: null as Nullable<IProduct[]>,
    cachedBannersData: null as Nullable<IBanner[]>,
    cachedOrdersData: null as Nullable<IOrder[]>
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
        setIsNetworkOffline: (state, action: PayloadAction<boolean>) => {
			state.isNetworkOffline = action.payload;
		},
        setIsOpenNetworkModal: (state, action: PayloadAction<boolean>) => {
			state.isOpenNetworkModal = action.payload;
		},
        setCachedProductsData: (state, action: PayloadAction<IProduct[]>) => {
			state.cachedProductsData = action.payload;
		},
        setCachedBannersData: (state, action: PayloadAction<IBanner[]>) => {
			state.cachedBannersData = action.payload;
		},
        setCachedOrdersData: (state, action: PayloadAction<IOrder[]>) => {
			state.cachedOrdersData = action.payload;
		},
    }
})

export const {
    setIsLoggedIn,
    setCachedProductsData,
    setCachedOrdersData,
    setCachedBannersData,
    setPhoneNumber,
    setIsNetworkOffline,
    setIsOpenNetworkModal,
    setUserId,
    setIsFirstEntrance}
     = userSlice.actions