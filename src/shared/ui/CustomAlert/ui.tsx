import React from "react";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

import { useAppDispatch, useModalAnimation } from "../../lib";
import { setIsOpenNetworkModal } from "../../../entities/user";
import { FontStyles, Spacer, WHITE_COLOR } from "../../config";
import CrossIcon from "../../assets/icons/crossIcon.svg";
import WifiIcon from "../../assets/icons/wifiIcon.svg";
import { Text } from "../Text";

const BLOCK_HEIGHT = 90;

export const CustomAlert: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleCloseModal = () => {
		dispatch(setIsOpenNetworkModal(false));
	};

	const { animatedStyle, width, handleClose } = useModalAnimation({
		callback: handleCloseModal,
	});

	return (
		<Wrapper
			width={width}
			height={BLOCK_HEIGHT}
			style={[
				animatedStyle,
				{
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25,
					shadowRadius: 3.84,

					elevation: 5,
				},
			]}
		>
			<Container>
				<Title
					size={18}
					fontStyle={FontStyles.MEDIUM}
				>
					You're offline
				</Title>
				<IconWrapper onPress={handleClose}>
					<CrossIcon
						width={Spacer.LARGE}
						height={Spacer.LARGE}
					/>
				</IconWrapper>
			</Container>
			<ContentWrapper>
				<WifiIcon
					width={Spacer.SECONDARY}
					height={Spacer.SECONDARY}
				/>
				<Text style={{ marginLeft: Spacer.SMALL }}>
					Turn on Wi-Fi or Cellular Data
				</Text>
			</ContentWrapper>
		</Wrapper>
	);
};

const Wrapper = styled(Animated.View)<{ width: number; height: number }>`
	width: ${({ width }) => width}px;
	height: ${({ height }) => height}px;
	position: absolute;
	top: 0;
	left: 50%;
	right: 50%;
	padding: 10px;
	background: ${WHITE_COLOR};
`;

const IconWrapper = styled.TouchableOpacity`
	margin-left: auto;
`;

const Title = styled(Text)`
	padding-left: ${Spacer.MEDIUM}px;
`;

const Container = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;

const ContentWrapper = styled.View`
	flex-direction: row;
	align-items: center;
	padding: ${Spacer.MEDIUM}px;
`;
