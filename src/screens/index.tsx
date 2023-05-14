import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen"
import { getAuth } from "@firebase/auth";
import { getDatabase } from "@firebase/database";
import { initializeApp } from "@firebase/app";

import { useAppDispatch, useAppSelector } from "../shared/lib";
import { RootScreens } from "./config";
import { DashboardScreen } from "./Dashboard";
import { loadInitialData } from "../entities/user/model/thunks";
import { firebaseConfig } from "../shared/config";
import { AuthenticationScreen } from "./Authentication";

export type RootStackListType = {
	Authentication: undefined;
    Dashboard: undefined;
    Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackListType>();

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

export const Routing = () => {
    const {isLoggedIn, isFirstEntrance} = useAppSelector(store => store.user)
    const dispatch = useAppDispatch()

    const handleGetFirstScreen = () => {
        if (isLoggedIn) {
            return RootScreens.HOME
        }

        if (isFirstEntrance) {
            return RootScreens.DASHBOARD
        }

        return RootScreens.AUTHENTICATION
    }

    const initializeFields = async () => {
        await dispatch(loadInitialData())
        SplashScreen.hide()
    }

    useEffect(() => {
        initializeFields()
    }, [])

    if (isFirstEntrance === null) {
        return <></>
    }

return (
        <Stack.Navigator
            initialRouteName={RootScreens.DASHBOARD}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen  name={RootScreens.DASHBOARD} component={DashboardScreen}/>
            <Stack.Screen  name={RootScreens.AUTHENTICATION} component={AuthenticationScreen}/>

        </Stack.Navigator>
    )
}

