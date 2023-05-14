import React, { FC } from "react";
import { TextProps as AdditionalTextProps } from "react-native";
import styled from "styled-components/native";

import { BLACK_COLOR, Fonts, FontStyles } from "../../config";

interface IProps extends AdditionalTextProps {
	children: React.ReactNode;
	size?: number;
	color?: string;
	fontStyle?: FontStyles;
	font?: Fonts;
	style?: object;
	factor?: number;
	numberOfLines?: number;
	ellipsizeMode?: "head" | "middle" | "tail" | "clip";
}

interface TextProps {
	size?: number;
	color?: string;
	factor?: number;
	fontStyle?: string;
	font?: string;
}

export const Text: FC<IProps> = (props) => {
	const {
		size,
		color,
		fontStyle,
		factor,
		font,
		children,
		ellipsizeMode,
		numberOfLines,
		style,
	} = props;

	return (
		<Wrapper
			{...{
				size,
				factor,
				color,
				fontStyle,
				font,
				ellipsizeMode,
				numberOfLines,
				style,
			}}
		>
			{children}
		</Wrapper>
	);
};

const Wrapper = styled.Text<TextProps>`
	font-family: ${({ font = Fonts.SF_PRO_DISPLAY, fontStyle = FontStyles.REGULAR }) =>
		`${font}-${fontStyle}`};
	font-size: ${({ size = 16 }) => size}px;
	color: ${({ color = BLACK_COLOR }) => color};
`;
