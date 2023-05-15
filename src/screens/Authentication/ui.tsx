import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components/native";
import { KeyboardAvoidingView, StatusBar, ToastAndroid } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PushNotification from "react-native-push-notification";

import {
	BLUE_COLOR,
	DARK_GRAY_COLOR,
	FontStyles,
	LIGHT_GRAY_COLOR,
	Spacer,
	WHITE_COLOR,
} from "../../shared/config";
import {
	BottomSheetInput,
	Button,
	Input,
	Loader,
	Text,
	TopBar,
} from "../../shared/ui";
import AuthenticationLogo from "../../shared/assets/icons/AuthenticationLogo.svg";
import { CheckBox } from "../../shared/ui/CheckBox";
import { RootScreens } from "../config";
import { RootStackListType } from "..";
import {
	addUser,
	generateSMSCode,
	getAllUsers,
	saveUserInfo,
} from "../../entities/user";
import { useAppDispatch } from "../../shared/lib";
import { PHONE_NUMBER_REGEX } from "../../shared/config/regex";

interface IProps {
	navigation: NativeStackNavigationProp<
		RootStackListType,
		RootScreens.DASHBOARD
	>;
}

const MAX_LENGTH_CODE = 6;

export const AuthenticationScreen: React.FC<IProps> = ({ navigation }) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [phoneNumberValue, setPhoneNumberValue] = useState("");
	const [isActiveCheckBox, setIsActiveCheckBox] = useState(false);
	const [isRequestSuccessFul, setIsRequestSuccessFul] = useState(false);
	const [codeValue, setCodeValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const smsCodeRef = useRef(0);
	const dispatch = useAppDispatch();
	const handlePressCheckBox = () => {
		setIsActiveCheckBox(!isActiveCheckBox);
	};

	const handleSendCode = async () => {
		if (!PHONE_NUMBER_REGEX.test(phoneNumberValue)) {
			ToastAndroid.showWithGravity(
				"Error. Invalid phone number",
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);

			return;
		}
		const SMSCode = generateSMSCode();

		smsCodeRef.current = SMSCode;
		ToastAndroid.showWithGravity(
			"Check your notifications",
			ToastAndroid.SHORT,
			ToastAndroid.BOTTOM,
		);
		PushNotification.localNotification({
			channelId: "worldskills-id",
			title: "SMS verification",
			message: `Your SMS code - ${SMSCode}`,
		});

		setIsRequestSuccessFul(true);
	};

	const handlePressSubmit = async () => {
		try {
			if (+codeValue !== smsCodeRef.current) {
				ToastAndroid.showWithGravity(
					"Error. Invalid SMS code",
					ToastAndroid.SHORT,
					ToastAndroid.BOTTOM,
				);

				return;
			}

			setIsLoading(true);
			const allUsers = await getAllUsers();
			const isUsersContainsCurrentNumber = allUsers.filter(
				(item) => item.phone === phoneNumberValue,
			);

			if (isUsersContainsCurrentNumber.length) {
				onSuccessAuth(isUsersContainsCurrentNumber[0].id);

				return;
			}
			const response = await addUser(phoneNumberValue);

			onSuccessAuth(+response);
			navigation.replace(RootScreens.HOME);
		} catch (err) {
		} finally {
			setIsLoading(false);
		}
	};

	const onSuccessAuth = (id: number) => {
		saveUserInfo(phoneNumberValue, id, dispatch);

		ToastAndroid.showWithGravity(
			"Success!",
			ToastAndroid.SHORT,
			ToastAndroid.BOTTOM,
		);
	};

	const onPressBack = () => {
		setIsRequestSuccessFul(false);
	};

	const handleGetContent = () => {
		if (isRequestSuccessFul) {
			return (
				<>
					{isLoading && <Loader />}
					<Title>Code</Title>
					<Input
						defaultValue={codeValue}
						onChange={setCodeValue}
						keyboardType="number-pad"
						maxLength={MAX_LENGTH_CODE}
					/>
					<ButtonWrapper>
						<Button
							fontStyle={FontStyles.BOLD}
							textSize={Spacer.LARGE}
							text="Sign in"
							disabled={
								!codeValue.length || codeValue.length !== MAX_LENGTH_CODE
							}
							disabledBackground={DARK_GRAY_COLOR}
							onPress={handlePressSubmit}
						/>
					</ButtonWrapper>
				</>
			);
		}

		return (
			<>
				<Title>Phone</Title>
				<BottomSheetInput
					keyboardType="phone-pad"
					onChange={setPhoneNumberValue}
				/>
				<Row onPress={handlePressCheckBox}>
					<CheckBox isActive={isActiveCheckBox} />
					<CheckBoxTitle>
						i'm agree with <Text color={BLUE_COLOR}>privacy policy</Text> and{" "}
						<Text color={BLUE_COLOR}>user agreement</Text>
					</CheckBoxTitle>
				</Row>
				<Button
					fontStyle={FontStyles.BOLD}
					textSize={Spacer.LARGE}
					text="Continue"
					disabled={!isActiveCheckBox || !phoneNumberValue.length}
					disabledBackground={DARK_GRAY_COLOR}
					onPress={handleSendCode}
				/>
			</>
		);
	};

	// variables
	const snapPoints = useMemo(() => [270, 370], []);

	return (
		<Container>
			<StatusBar
				backgroundColor={WHITE_COLOR}
				barStyle="dark-content"
			/>
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<TopBar
					withNavigationBack={isRequestSuccessFul}
					onPressBack={onPressBack}
					title="Sign in"
					titleSize={Spacer.LARGE}
				/>
				<Line />
				<AuthenticationLogo />
				<BottomSheet
					ref={bottomSheetRef}
					index={0}
					handleComponent={() => null}
					snapPoints={snapPoints}
					animateOnMount
					backgroundStyle={{
						borderTopLeftRadius: 10,
						borderTopRightRadius: 10,
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 8,
						},
						shadowOpacity: 0.8,
						shadowRadius: 5.46,
						elevation: 24,
					}}
				>
					<BottomSheetView>
						<Indicator />
						{handleGetContent()}
					</BottomSheetView>
				</BottomSheet>
			</KeyboardAvoidingView>
		</Container>
	);
};

const Container = styled.View`
	flex: 1;
	background: ${WHITE_COLOR};
`;
const Line = styled.View`
	width: 100%;
	height: 1px;
	background: ${LIGHT_GRAY_COLOR};
`;

const BottomSheetView = styled.View`
	margin: ${Spacer.MEDIUM}px;
	margin-top: ${Spacer.SMALL}px;
`;

const Indicator = styled.View`
	width: 36px;
	height: 4px;
	margin: 0 auto;
	background: #eeeeee;
`;

const Title = styled(Text)`
	margin-bottom: ${Spacer.MEDIUM}px;
`;

const Row = styled.TouchableOpacity`
	flex-direction: row;
	margin-top: ${Spacer.LARGE}px;
	align-items: center;
	margin-bottom: ${Spacer.EXTRA_LARGE}px;
`;

const CheckBoxTitle = styled(Text)`
	margin-left: ${Spacer.SMALL}px;
`;

const ButtonWrapper = styled.View`
	margin-top: ${Spacer.XX_LARGE}px;
`;
