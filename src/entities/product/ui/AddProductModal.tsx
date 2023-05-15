import React, { useRef, useMemo, useCallback, useState } from "react";
import {
	BackHandler,
	Modal,
	StyleSheet,
	ListRenderItemInfo,
	NativeSyntheticEvent,
	NativeScrollEvent,
	ToastAndroid,
} from "react-native";
import BottomSheet, {
	BottomSheetFlatList,
	BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import styled from "styled-components/native";
import { useFocusEffect } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
	FadeIn,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import ArrowLeft from "../../../shared/assets/icons/ArrowLeft.svg";
import {
	BLACK_COLOR,
	FontStyles,
	SPACE_COLOR,
	Spacer,
	WHITE_COLOR,
} from "../../../shared/config";
import { BadgeButton, Button, Text } from "../../../shared/ui";
import { IProduct, IProductComponent } from "../config";
import InfoIcon from "../../../shared/assets/icons/infoIcon.svg";
import { ProductComponent } from "./ProductComponent";
import { getProductPrice } from "../lib";
import { createOrder } from "../api";
import { useAppSelector } from "../../../shared/lib";

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
	const { userId } = useAppSelector((store) => store.user);
	const [activeVolume, setActiveVolume] = useState(+data.volume[0]);
	const [productComponents, setProductComponents] = useState("");
	const productPrice = useMemo(
		() => getProductPrice(data.price, +activeVolume),
		[activeVolume],
	);

	const scale = useSharedValue(1);

	const onScroll = (scaleData: NativeSyntheticEvent<NativeScrollEvent>) => {
		if (scaleData.nativeEvent.contentOffset.y > 30) {
			scale.value = withTiming(0.8);
		} else {
			scale.value = withTiming(1);
		}
	};

	const imageStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		};
	});

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

	const handlePressInfo = () => {
		ToastAndroid.showWithGravity(
			data.name,
			ToastAndroid.SHORT,
			ToastAndroid.BOTTOM,
		);
	};

	const handleCreateOrder = async () => {
		if (userId) {
			await createOrder(
				userId,
				data.name,
				activeVolume,
				productComponents,
				productPrice,
				data.image,
			);

			ToastAndroid.showWithGravity(
				"Success!",
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			);
			bottomSheetRef.current?.close();
		}
	};

	const renderItem = ({ item }: ListRenderItemInfo<IProductComponent>) => {
		return (
			<ProductComponent
				isActive={productComponents.includes(item.value)}
				setProductComponents={setProductComponents}
				productComponents={productComponents}
				data={item}
			/>
		);
	};

	return (
		<Modal
			visible={visible}
			animationType="fade"
			transparent
			onRequestClose={onClose}
		>
			<GestureHandlerRootView style={styles.container}>
				<BottomSheet
					ref={bottomSheetRef}
					index={0}
					onClose={onClose}
					detached
					enablePanDownToClose
					snapPoints={snapPoints}
					animateOnMount
				>
					<Scroll onScroll={onScroll}>
						<Animated.View entering={FadeIn}>
							<Wrapper>
								<IconWrapper onPress={handlePressBack}>
									<ArrowLeft />
								</IconWrapper>
								<Text
									fontStyle={FontStyles.BOLD}
									color={BLACK_COLOR}
									size={22}
								>
									{data.name}
								</Text>
								<InfoWrapper onPress={handlePressInfo}>
									<InfoIcon />
								</InfoWrapper>
							</Wrapper>

							<Animated.Image
								source={{ uri: data.image }}
								resizeMode="contain"
								style={[
									{
										width: "100%",
										height: 280,
										marginBottom: Spacer.EXTRA_SMALL,
									},
									imageStyle,
								]}
							/>
							<ProductDescription>{data.description}</ProductDescription>
							<Title fontStyle={FontStyles.BOLD}>Volume</Title>

							<Row>
								{data.volume.map((item, index) => (
									<BadgeButtonWrapper key={index}>
										<BadgeButton
											onPress={() => setActiveVolume(+item)}
											isActive={+activeVolume === +item}
											title={`${item} ml`}
											inActiveBackground={SPACE_COLOR}
										/>
									</BadgeButtonWrapper>
								))}
							</Row>
							<Title>Change components</Title>
							<ComponentsContainer>
								<BottomSheetFlatList
									renderItem={renderItem}
									horizontal
									data={data.components}
								/>
							</ComponentsContainer>
							<DeveloperContainer>
								<Text>Made by Eugene Masyuk</Text>
							</DeveloperContainer>
						</Animated.View>
					</Scroll>

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
							onPress={handleCreateOrder}
							text={`Add to cart ${productPrice} ₽`}
							textSize={22}
							fontStyle={FontStyles.SEMI_BOLD}
						/>
					</ButtonWrapper>
				</BottomSheet>
			</GestureHandlerRootView>
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

const Scroll = styled(BottomSheetScrollView)``;

const IconWrapper = styled.TouchableOpacity`
	position: absolute;
	left: ${Spacer.MEDIUM}px;
`;

const InfoWrapper = styled.TouchableOpacity`
	position: absolute;
	right: ${Spacer.MEDIUM}px;
`;

const ProductDescription = styled(Text)`
	color: #636466;
	margin-bottom: 20px;
	text-align: center;
`;

const Title = styled(Text)`
	font-size: 20px;
	margin-bottom: 10px;
	margin-left: ${Spacer.MEDIUM}px;
`;

const Row = styled.View`
	flex-direction: row;
	margin-left: ${Spacer.MEDIUM}px;
	margin-bottom: ${Spacer.LARGE}px;
`;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

const BadgeButtonWrapper = styled.View`
	margin-right: 14px;
`;

const ComponentsContainer = styled.ScrollView`
	margin-left: ${Spacer.MEDIUM}px;
`;

const ButtonWrapper = styled.View`
	width: 100%;
	height: 112px;
	background: ${WHITE_COLOR};
	flex-direction: row;
	justify-content: center;
	padding: ${Spacer.LARGE}px ${Spacer.MEDIUM}px 0;
`;

const DeveloperContainer = styled.View`
	padding-bottom: ${Spacer.XX_LARGE}px;
	margin-top: ${Spacer.MEDIUM}px;
	margin-left: ${Spacer.MEDIUM}px;
`;
