import React, { useMemo, useRef, useState } from "react";
import {
	FlatList,
	ListRenderItemInfo,
	useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";
import Animated, { FadeIn } from "react-native-reanimated";

import { IProduct } from "../config";
import { Spacer } from "../../../shared/config";
import { ProductCard } from "./ProductCard";
import { AddProductModal } from "./AddProductModal";

interface IProductsListProps {
	data: IProduct[];
}

export const ProductsList: React.FC<IProductsListProps> = ({ data }) => {
	const { width } = useWindowDimensions();
	const cardWidth = useMemo(() => (width - Spacer.MEDIUM * 3) / 2, [width]);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const activeProductRef = useRef<Nullable<IProduct>>(null);
	const handleToggleModal = () => {
		setIsOpenModal(!isOpenModal);
	};

	const handlePressButton = (product: IProduct) => {
		activeProductRef.current = product;
		handleToggleModal();
	};

	const renderItem = ({ item, index }: ListRenderItemInfo<IProduct>) => {
		return (
			<Animated.View entering={FadeIn.delay(100 * index)}>
				<ProductCard
					data={item}
					width={cardWidth}
					onPress={handlePressButton}
				/>
			</Animated.View>
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
			{activeProductRef.current && isOpenModal && (
				<AddProductModal
					data={activeProductRef.current}
					onClose={handleToggleModal}
					visible={isOpenModal}
				/>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.View``;
