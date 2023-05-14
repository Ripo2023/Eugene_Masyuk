import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

import {
	FontStyles,
	Fonts,
	LIGHT_GRAY_COLOR,
	Spacer,
	WHITE_COLOR,
} from "../../config";

interface IProps {
	title: string;
	isActive: boolean;
	onPress: () => void;
}

export const BadgeButton: React.FC<IProps> = ({ title, onPress, isActive }) => {
	const isActiveShared = useSharedValue(0);
	const isActiveSharedColor = useSharedValue(0);

	const animatedStyles = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			isActiveShared.value,
			[0, 1],
			[WHITE_COLOR, "#2A2A2B"],
			"RGB",
		);

		return {
			backgroundColor,
		};
	});

	const colorAnimatedStyles = useAnimatedStyle(() => {
		const color = interpolateColor(
			isActiveShared.value,
			[0, 1],
			[LIGHT_GRAY_COLOR, WHITE_COLOR],
			"RGB",
		);

		return {
			color,
		};
	});

	useEffect(() => {
		if (isActive) {
			isActiveShared.value = withTiming(1);
			isActiveSharedColor.value = withTiming(1, { duration: 1000 });
		} else {
			isActiveShared.value = withTiming(0);
			isActiveSharedColor.value = withTiming(0, { duration: 1000 });
		}
	}, [isActive]);

	return (
		<TouchableOpacity onPress={onPress}>
			<Container style={animatedStyles}>
				<Title style={colorAnimatedStyles}>{title}</Title>
			</Container>
		</TouchableOpacity>
	);
};

const Container = styled(Animated.View)`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 4px 16px;
	border-radius: 6px;
`;

const Title = styled(Animated.Text)`
	font-family: ${Fonts.SF_PRO_DISPLAY}-${FontStyles.MEDIUM};
	font-size: ${Spacer.MEDIUM}px;
`;
