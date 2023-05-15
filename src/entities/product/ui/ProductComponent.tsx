import React from "react";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";

import { SPACE_COLOR, Spacer } from "../../../shared/config";
import { Text } from "../../../shared/ui";
import { IProductComponent } from "../config";
import PlusIcon from "../../../shared/assets/icons/PlusIcon.svg";

interface IProps {
	data: IProductComponent;
	isActive: boolean;
	setProductComponents: (value: string) => void;
	productComponents: string;
}

export const ProductComponent: React.FC<IProps> = ({
	data,
	setProductComponents,
	productComponents,
	isActive,
}) => {
	const handlePress = () => {
		if (isActive) {
			setProductComponents(productComponents.replace(data.value, ""));

			return;
		}

		setProductComponents(`${productComponents} ${data.value}`);
	};

	return (
		<Wrapper onPress={handlePress}>
			<ImageWrapper>
				{isActive ? (
					<Image
						resizeMode="contain"
						source={{ uri: data.image }}
					/>
				) : (
					<PlusIcon />
				)}
			</ImageWrapper>
			<Title>{data.value}</Title>
		</Wrapper>
	);
};

const Wrapper = styled.TouchableOpacity`
	align-items: center;
	width: 96px;
	margin-right: ${Spacer.MEDIUM}px;
`;

const ImageWrapper = styled.View`
	width: 96px;
	height: 96px;
	background: ${SPACE_COLOR};
	border-radius: ${Spacer.MEDIUM}px;
	margin-bottom: ${Spacer.SMALL}px;
	justify-content: center;
	align-items: center;
`;

const Image = styled(FastImage)`
	width: 100%;
	height: 100%;
`;

const Title = styled(Text)`
	text-align: center;
`;
