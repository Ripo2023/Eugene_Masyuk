import React, { useMemo, useRef } from "react";
import { Modal, ToastAndroid, useWindowDimensions } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import QRCode from "react-native-qrcode-svg";
import Share from "react-native-share";

import { IOrder } from "../../entities/user";
import ArrowLeft from "../../shared/assets/icons/ArrowLeft.svg";
import {
	BLACK_COLOR,
	FontStyles,
	LIGHT_GRAY_COLOR,
	Spacer,
	WHITE_COLOR,
} from "../../shared/config";
import { Button, Text } from "../../shared/ui";
import { useAppSelector } from "../../shared/lib";

interface IOrderModalProps {
	visible: boolean;
	onClose: () => void;
	data: IOrder;
}

// Модальное окно с qr кодом

export const QRCodeModal: React.FC<IOrderModalProps> = ({
	visible,
	onClose,
	data,
}) => {
	const { width } = useWindowDimensions();
	const bottomSheetRef = useRef<BottomSheet>(null);
	const { phoneNumber } = useAppSelector((store) => store.user);
	const snapPoints = useMemo(() => ["95%"], []);
	const [QRImage, setQRImage] = React.useState("");
	const ref = React.useRef<any>();

	const handleCloseModal = () => {
		bottomSheetRef.current?.close();
	};

	const GenerateQR = () => {
		ref.current?.toDataURL((image: string) => {
			setQRImage("data:image/png;base64," + image);
		});
	};

	const handleShare = async () => {
		const options = {
			title: "Share is your QRcode",
			url: QRImage,
		};

		try {
			await Share.open(options);
		} catch (err) {
			ToastAndroid.showWithGravity(
				"Error",
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
		}
	};

	React.useEffect(() => {
		GenerateQR();
	}, [data]);

	return (
		<Modal
			visible={visible}
			animationType="fade"
			transparent
			onRequestClose={onClose}
		>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheet
					ref={bottomSheetRef}
					index={0}
					onClose={onClose}
					detached
					enablePanDownToClose
					snapPoints={snapPoints}
					animateOnMount
				>
					<Wrapper>
						<TopWrapper>
							<IconWrapper onPress={handleCloseModal}>
								<ArrowLeft />
							</IconWrapper>
							<Text
								fontStyle={FontStyles.BOLD}
								color={BLACK_COLOR}
								size={22}
							>
								QR
							</Text>
						</TopWrapper>
						<Content>
							<QRCode
								size={width - Spacer.EXTRA_LARGE * 3}
								value={`${phoneNumber} ${data.name} ${data.price}`}
								getRef={ref as any}
							/>
						</Content>
						<ButtonWrapper>
							<Button
								onPress={handleShare}
								text="Share QR Code"
								width={width - Spacer.EXTRA_LARGE}
							/>
						</ButtonWrapper>
					</Wrapper>
				</BottomSheet>
			</GestureHandlerRootView>
		</Modal>
	);
};

const Wrapper = styled.View`
	flex: 1;
	background: ${WHITE_COLOR};
`;

const Content = styled.View`
	margin: ${Spacer.XX_LARGE}px ${Spacer.MEDIUM}px;
	align-items: center;
	justify-content: center;
`;

const IconWrapper = styled.TouchableOpacity`
	position: absolute;
	left: ${Spacer.MEDIUM}px;
`;

const TopWrapper = styled.View`
	width: 100%;
	height: 55px;
	border-bottom-color: ${LIGHT_GRAY_COLOR};
	border-bottom-width: 1px;
	flex-direction: row;
	justify-content: center;
	margin-top: ${Spacer.EXTRA_SMALL}px;
	margin-bottom: ${Spacer.XX_LARGE}px;
`;

const ButtonWrapper = styled.View`
	margin: 0 ${Spacer.MEDIUM}px;
`;
