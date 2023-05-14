import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";

import { BANNER_WIDTH, BannerData } from "./config";
import { BannerItem } from "./BannerItem";
import { Spacer } from "../../shared/config";

interface IBannersListProps {
	data: BannerData[];
}

export const BannersList: React.FC<IBannersListProps> = ({ data }) => {
	const renderItem = ({ item }: ListRenderItemInfo<BannerData>) => {
		return <BannerItem data={item} />;
	};

	const keyExtractor = (_: BannerData, index: number) => index.toString();

	return (
		<FlatList
			data={data}
			keyExtractor={keyExtractor}
			renderItem={renderItem}
			horizontal
			snapToInterval={BANNER_WIDTH}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingLeft: Spacer.MEDIUM }}
		/>
	);
};
