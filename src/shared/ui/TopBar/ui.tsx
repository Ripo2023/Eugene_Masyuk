import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { WHITE_COLOR, FontStyles, Spacer, BLACK_COLOR } from "../../config";
import { Text } from "../Text/ui";
import ArrowLeft from "../../assets/icons/ArrowLeft.svg";

interface ITopBarProps {
	title: string;
    titleSize?: number;
	onPressBack?: () => void;
	withNavigationBack?: boolean;
}

export const TopBar: React.FC<ITopBarProps> = (props) => {
	const { title,onPressBack,titleSize, withNavigationBack } = props;
	const navigation = useNavigation();

	const handleGoBack = () => {
		if (onPressBack) {
			onPressBack()

			return;
		}
		navigation.goBack();
	};

	return (
		<Wrapper>
			{withNavigationBack && (
				<IconWrapper onPress={handleGoBack}>
					<ArrowLeft />
				</IconWrapper>
			)}
			<Text
				fontStyle={FontStyles.BOLD}
				color={BLACK_COLOR}
                size={titleSize}
			>
				{title}
			</Text>
		</Wrapper>
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
