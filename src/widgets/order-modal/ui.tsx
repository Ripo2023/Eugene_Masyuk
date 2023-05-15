import React, { useMemo, useRef, useState } from "react";
import { Modal } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";

import { IOrder } from "../../entities/user";
import ArrowLeft from "../../shared/assets/icons/ArrowLeft.svg";
import {
	BLACK_COLOR,
	FontStyles,
	GRAY_COLOR,
	LIGHT_GRAY_COLOR,
	LIGHT_ORANGE_COLOR,
	ORANGE_COLOR,
	SPACE_COLOR,
	Spacer,
	WHITE_COLOR,
} from "../../shared/config";
import { Button, Text } from "../../shared/ui";
import { QRCodeModal } from "./QRCodeModal";

interface IOrderModalProps {
	visible: boolean;
	onClose: () => void;
	data: IOrder;
}

// Модальное окно с информацией о заказе

export const OrderModal: React.FC<IOrderModalProps> = ({
	visible,
	onClose,
	data,
}) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [isOpenQrCodeModal, setIsOpenQrCodeModal] = useState(false);

	const handleToggleModal = () => {
		setIsOpenQrCodeModal(!isOpenQrCodeModal);
	};

	const snapPoints = useMemo(() => ["95%"], []);

	const handleCloseModal = () => {
		bottomSheetRef.current?.close();
	};

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
								Product list
							</Text>
						</TopWrapper>
						<OrderCard>
							<OrderImage source={{ uri: data.image }} />
							<OrderInformation>
								<OrderName
									fontStyle={FontStyles.BOLD}
									size={18}
								>
									{data.name}
								</OrderName>
								<Text
									color={GRAY_COLOR}
									size={14}
								>
									{data.volume} ml
								</Text>
								<OrderComponents
									size={12}
									color={LIGHT_ORANGE_COLOR}
								>
									+{data.components}
								</OrderComponents>
							</OrderInformation>
							<OrderPrice fontStyle={FontStyles.BOLD}>
								{data.price} ₽
							</OrderPrice>
						</OrderCard>
						<ButtonWrapper
							style={{
								shadowColor: "#000",
								shadowOffset: {
									width: 0,
									height: 2,
								},
								shadowOpacity: 0.25,
								shadowRadius: 3.84,

								elevation: 10,
							}}
						>
							<Button
								onPress={handleToggleModal}
								text="QR Code"
								textSize={22}
								fontStyle={FontStyles.SEMI_BOLD}
							/>
						</ButtonWrapper>
					</Wrapper>
				</BottomSheet>
			</GestureHandlerRootView>
			{isOpenQrCodeModal && (
				<QRCodeModal
					data={data}
					visible={isOpenQrCodeModal}
					onClose={handleToggleModal}
				/>
			)}
		</Modal>
	);
};

const Wrapper = styled.View`
	flex: 1;
	background: ${WHITE_COLOR};
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

const OrderCard = styled.View`
	width: 100%;
	flex-direction: row;
	margin: 0 ${Spacer.MEDIUM}px;

	padding-bottom: ${Spacer.MEDIUM}px;
`;

const OrderImage = styled(FastImage)`
	width: 90px;
	height: 90px;
	margin-right: ${Spacer.SMALL}px;
`;

const OrderInformation = styled.View``;
const OrderName = styled(Text)`
	margin-bottom: ${Spacer.TINY}px;
	padding-top: ${Spacer.SMALL}px;
`;

const OrderComponents = styled(Text)`
	margin-top: ${Spacer.SMALL}px;
`;

const OrderPrice = styled(Text)`
	margin-left: auto;
	padding-top: ${Spacer.SMALL}px;
	padding-right: ${Spacer.EXTRA_LARGE}px;
`;

const ButtonWrapper = styled.View`
	width: 100%;
	height: 112px;
	background: ${WHITE_COLOR};
	flex-direction: row;
	margin-top: auto;
	justify-content: center;
	padding: ${Spacer.LARGE}px ${Spacer.MEDIUM}px 0;
`;
