import React, { useRef, useMemo, useCallback } from "react";
import { BackHandler, Modal } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import styled from "styled-components/native";
import { useFocusEffect } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

import ArrowLeft from "../../../assets/icons/ArrowLeft.svg";
import {
	BLACK_COLOR,
	FontStyles,
	Spacer,
	WHITE_COLOR,
} from "../../../shared/config";
import { Text } from "../../../shared/ui";
import { IProduct } from "../config";
import InfoIcon from "../../../shared/assets/icons/infoIcon.svg";

interface IAddProductModalProps {
	visible: boolean;
	onClose: () => void;
	data: IProduct;
}

export const AddProductModal: React.FC<IAddProductModalProps> = ({
	visible,
	data,
	onClose,
}) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["98%"], []);

	const handlePressBack = () => {
		bottomSheetRef.current?.close();

		return true;
	};

	useFocusEffect(
		useCallback(() => {
			BackHandler.addEventListener("hardwareBackPress", handlePressBack);

			return () =>
				BackHandler.removeEventListener("hardwareBackPress", handlePressBack);
		}, [bottomSheetRef]),
	);

	return (
		<Modal
			visible={visible}
			animationType="fade"
			onRequestClose={onClose}
		>
			<BottomSheet
				ref={bottomSheetRef}
				index={0}
				handleComponent={() => null}
				snapPoints={snapPoints}
				animateOnMount
			>
				<Wrapper>
					<IconWrapper onPress={handlePressBack}>
						<ArrowLeft />
					</IconWrapper>
				</Wrapper>
				<Text
					fontStyle={FontStyles.BOLD}
					color={BLACK_COLOR}
					size={22}
				>
					{data.title}
				</Text>
				<InfoWrapper>
					<InfoIcon />
				</InfoWrapper>
				<ProductImage />
				<ProductDescription>{data.description}</ProductDescription>
				<Row horizontal>
					{/* {categoriesList.map((item, index) => (
						<BadgeButton
							onPress={() => setActiveCategory(index)}
							isActive={activeCategory === index}
							title={item.title}
							key={index}
						/>
					))} */}
				</Row>
				<VolumeTitle>Volume</VolumeTitle>
			</BottomSheet>
		</Modal>
	);
};

const Wrapper = styled.View`
	width: 100%;
	height: 46px;
	background: ${WHITE_COLOR};
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const IconWrapper = styled.TouchableOpacity`
	position: absolute;
	left: ${Spacer.MEDIUM}px;
`;

const InfoWrapper = styled.TouchableOpacity`
	position: absolute;
	right: ${Spacer.MEDIUM}px;
`;

const ProductImage = styled(FastImage)`
	width: 100%;
	height: 184px;
	margin-bottom: ${Spacer.EXTRA_SMALL}px;
`;

const ProductDescription = styled(Text)`
	color: #636466;
	margin-bottom: 20px;
`;

const VolumeTitle = styled(Text)`
	font-size: 20px;
	margin-bottom: 10px;
`;

const Row = styled.ScrollView`
	margin-left: ${Spacer.MEDIUM}px;
	margin-top: ${Spacer.EXTRA_LARGE}px;
	margin-bottom: ${Spacer.LARGE}px;
`;
