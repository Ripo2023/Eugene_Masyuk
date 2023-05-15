import React from "react";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";

import { IProduct } from "../config";
import { ORANGE_COLOR, Spacer, WHITE_COLOR } from "../../../shared/config";
import { Button, Text } from "../../../shared/ui";

interface IProductCardProps {
	width: number;
	data: IProduct;
	onPress: (data: IProduct) => void;
}

export const ProductCard: React.FC<IProductCardProps> = ({
	width,
	onPress,
	data,
}) => {
	const handlePressButton = () => {
		onPress(data);
	};

	return (
		<Wrapper
			style={{
				shadowColor: "#000",
				shadowOffset: {
					width: 0,
					height: 4,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.84,

				elevation: 2,
			}}
			width={width}
		>
			<ProductImage
				resizeMode="contain"
				source={{ uri: data.image }}
			/>
			<Title>{data.name}</Title>
			<SubTitle>from {data.price} ₽</SubTitle>
			<Button
				text="Select"
				onPress={handlePressButton}
				borderColor={ORANGE_COLOR}
				backgroundColor={WHITE_COLOR}
				textColor={ORANGE_COLOR}
				width={117}
				height={40}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.View<{ width: number }>`
	width: ${({ width }) => width}px;
	height: 234px;
	align-items: center;
	background: ${WHITE_COLOR};
	border-radius: ${Spacer.SECONDARY}px;
	margin-right: ${Spacer.MEDIUM}px;
	margin-bottom: ${Spacer.MEDIUM}px;
`;

const ProductImage = styled(FastImage)`
	width: 100%;
	height: 105px;
	margin-bottom: ${Spacer.MEDIUM}px;
`;

const Title = styled(Text)`
	color: #2a2a2b;
	font-size: 20px;
	margin-bottom: ${Spacer.EXTRA_SMALL}px;
`;

const SubTitle = styled(Text)`
	color: #636466;
	margin-bottom: ${Spacer.SECONDARY}px;
`;
