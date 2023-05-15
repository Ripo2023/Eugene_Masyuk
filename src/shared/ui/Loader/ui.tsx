import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

import { BLUE_COLOR } from "../../config";

interface ILoaderProps {
	color?: string;
	size?: "large" | "small";
}

export const Loader: React.FC<ILoaderProps> = ({
	color = BLUE_COLOR,
	size = "large",
}) => {
	return (
		<IndicatorContainer>
			<ActivityIndicator
				size={size}
				color={color}
			/>
		</IndicatorContainer>
	);
};

const IndicatorContainer = styled.View`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	flex: 1;
	z-index: 5;
	elevation: 5;
	justify-content: center;
	align-items: center;
`;
