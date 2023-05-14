import React from "react";
import styled from "styled-components/native";

import { FontStyles, ORANGE_COLOR, Spacer, WHITE_COLOR } from "../../config";
import { Text } from "../Text";

interface IButtonSubmitProps {
	text: string;
	width?: number;
	height?: number;
	backgroundColor?: string;
	isFullWidth?: boolean;
	textColor?: string;
	textSize?: number;
	onPress: () => void;
	borderRadius?: number;
	borderColor?: string;
	leftIcon?: JSX.Element;
	fontStyle?: FontStyles;
	disabled?: boolean;
	disabledBackground?: string;
}

export const Button: React.FC<IButtonSubmitProps> = (props) => {
	const { text,fontStyle,leftIcon, textColor, textSize } = props;

	return (
		<ButtonContainer {...props}>
			{leftIcon && <LeftIconWrapper>{leftIcon}</LeftIconWrapper>}
			<Text
				size={textSize}
				fontStyle={ fontStyle ?? FontStyles.MEDIUM}
				color={textColor ?? WHITE_COLOR}
			>
				{text}
			</Text>
		</ButtonContainer>
	);
};

const ButtonContainer = styled.TouchableOpacity<IButtonSubmitProps>`
	width: ${({ width }) => (width ? `${width}px` : "100%")};
	height: ${({ height }) => height ?? 50}px;
	background-color: ${({ backgroundColor, disabled, disabledBackground }) => {
		if (disabled && disabledBackground) {
			return disabledBackground
		}

			return backgroundColor ?? ORANGE_COLOR;
	}};
	border: 1px solid ${({ borderColor }) => borderColor ?? "transparent"};
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border-radius: ${Spacer.SMALL}px;
	border-width: ${({ borderColor }) => (borderColor ? "1px" : "0px")};
	border-color: ${({ borderColor }) =>
		borderColor ? borderColor : "transparent"};
`;

const LeftIconWrapper = styled.View`
	margin-right: ${Spacer.SMALL}px;
`;
