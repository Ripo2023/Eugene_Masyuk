import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";

import { useAppDispatch, useAppSelector } from "../shared/lib";
import { RootScreens } from "./config";
import { DashboardScreen } from "./Dashboard";
import { loadInitialData } from "../entities/user/model/thunks";
import { AuthenticationScreen } from "./Authentication";
import { HomeScreen } from "./Home";

export type RootStackListType = {
	Authentication: undefined;
	Dashboard: undefined;
	Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackListType>();

export const Routing = () => {
	const { isLoggedIn, isFirstEntrance } = useAppSelector((store) => store.user);
	const dispatch = useAppDispatch();

	const handleGetFirstScreen = () => {
		if (isLoggedIn) {
			return RootScreens.HOME;
		}

		if (isFirstEntrance) {
			return RootScreens.AUTHENTICATION;
		}

		return RootScreens.DASHBOARD;
	};

	const initializeFields = async () => {
		await dispatch(loadInitialData());
		SplashScreen.hide();
	};

	useEffect(() => {
		initializeFields();
	}, []);

	if (isFirstEntrance === null) {
		return <></>;
	}

	return (
		<Stack.Navigator
			initialRouteName={handleGetFirstScreen()}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name={RootScreens.DASHBOARD}
				component={DashboardScreen}
			/>
			<Stack.Screen
				name={RootScreens.AUTHENTICATION}
				component={AuthenticationScreen}
			/>
			<Stack.Screen
				name={RootScreens.HOME}
				component={HomeScreen}
			/>
		</Stack.Navigator>
	);
};
