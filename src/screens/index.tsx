import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import PushNotification from "react-native-push-notification";
import NetInfo, { NetInfoStateType } from "@react-native-community/netinfo";

import { useAppDispatch, useAppSelector } from "../shared/lib";
import { RootScreens } from "./config";
import { DashboardScreen } from "./Dashboard";
import { loadInitialData } from "../entities/user/model/thunks";
import { AuthenticationScreen } from "./Authentication";
import { HomeScreen } from "./Home";
import { OrdersScreen } from "./Orders/ui";
import { CustomAlert } from "../shared/ui";
import { setIsNetworkOffline, setIsOpenNetworkModal } from "../entities/user";

export type RootStackListType = {
	Authentication: undefined;
	Dashboard: undefined;
	Home: undefined;
	Orders: undefined;
};

const Stack = createNativeStackNavigator<RootStackListType>();

export const Routing = () => {
	const { isFirstEntrance, phoneNumber, isOpenNetworkModal } = useAppSelector(
		(store) => store.user,
	);
	const dispatch = useAppDispatch();

	const handleGetFirstScreen = () => {
		if (phoneNumber) {
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

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			if (
				state.type === NetInfoStateType.none ||
				state.type === NetInfoStateType.unknown
			) {
				dispatch(setIsNetworkOffline(true));
				dispatch(setIsOpenNetworkModal(true));
			} else {
				dispatch(setIsNetworkOffline(false));
				dispatch(setIsOpenNetworkModal(false));
			}
		});

		unsubscribe();
	}, []);

	useEffect(() => {
		PushNotification.createChannel(
			{
				channelId: "worldskills-id",
				channelName: "worldskills",
				channelDescription: "worldskills",
				playSound: true,
				soundName: "default",
				vibrate: true,
			},
			() => {},
		);
	}, []);

	if (isFirstEntrance === null) {
		return <></>;
	}

	return (
		<>
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

				<Stack.Screen
					name={RootScreens.ORDERS}
					component={OrdersScreen}
				/>
			</Stack.Navigator>
			{isOpenNetworkModal && <CustomAlert />}
		</>
	);
};
