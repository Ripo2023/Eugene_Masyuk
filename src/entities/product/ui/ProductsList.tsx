import React, { useMemo } from "react";
import {
	FlatList,
	ListRenderItemInfo,
	useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";

import { IProduct } from "../config";
import { Spacer } from "../../../shared/config";
import { ProductCard } from "./ProductCard";

interface IProductsListProps {
	data: IProduct[];
}

export const ProductsList: React.FC<IProductsListProps> = ({ data }) => {
	const { width } = useWindowDimensions();
	const cardWidth = useMemo(() => (width - Spacer.MEDIUM * 3) / 2, [width]);

	const handlePressButton = (product: IProduct) => {
		console.log(product);
	};

	const renderItem = ({ item }: ListRenderItemInfo<IProduct>) => {
		return (
			<ProductCard
				data={item}
				width={cardWidth}
				onPress={handlePressButton}
			/>
		);
	};

	return (
		<Wrapper>
			<FlatList
				renderItem={renderItem}
				data={data}
				scrollEnabled={false}
				numColumns={2}
				columnWrapperStyle={{ marginHorizontal: Spacer.MEDIUM }}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.View``;
