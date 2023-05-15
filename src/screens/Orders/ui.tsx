import React, { useRef, useState } from "react";
import { StatusBar, FlatList, ListRenderItemInfo } from "react-native";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";

import {
	BLACK_COLOR,
	ORANGE_COLOR,
	Spacer,
	WHITE_COLOR,
} from "../../shared/config";
import { IOrder, getOrders } from "../../entities/user";
import { useAppSelector, useLoadData } from "../../shared/lib";
import { Loader, Text } from "../../shared/ui";
import { OrderModal } from "../../widgets/order-modal";

export const OrdersScreen: React.FC = () => {
	const { userId } = useAppSelector((store) => store.user);
	const [orders, setOrders] = React.useState<Nullable<IOrder[]>>(null);
	const activeOrderRef = useRef<Nullable<IOrder>>(null);
	const [isOpenModal, setIsOpenModal] = useState(false);

	const handleToggleModal = () => {
		setIsOpenModal(!isOpenModal);
	};
	const handleLoadData = async () => {
		if (userId) {
			const result = await getOrders(userId);

			setOrders(result);
		}
	};

	const handlePressOrder = (data: IOrder) => {
		activeOrderRef.current = data;
		handleToggleModal();
	};

	const renderItem = ({ item }: ListRenderItemInfo<IOrder>) => {
		return (
			<OrderWrapper onPress={() => handlePressOrder(item)}>
				<OrderImage source={{ uri: item.image }} />
				<Text color={WHITE_COLOR}>{item.id}</Text>
			</OrderWrapper>
		);
	};

	const headerComponent = () => {
		return <Title size={Spacer.EXTRA_LARGE}>In progress</Title>;
	};

	const { isLoading } = useLoadData({ loadData: handleLoadData });

	return (
		<Wrapper>
			<StatusBar
				backgroundColor={WHITE_COLOR}
				barStyle="dark-content"
			/>

			{isLoading && <Loader />}

			<FlatList
				data={orders}
				ListHeaderComponent={headerComponent}
				renderItem={renderItem}
				contentContainerStyle={{ marginHorizontal: Spacer.MEDIUM }}
			/>
			{activeOrderRef.current && (
				<OrderModal
					visible={isOpenModal}
					onClose={handleToggleModal}
					data={activeOrderRef.current}
				/>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.View`
	flex: 1;
	background: ${WHITE_COLOR};
`;

const OrderWrapper = styled.TouchableOpacity`
	width: 100%;
	height: 40px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 ${Spacer.LARGE}px 0 ${Spacer.SMALL}px;
	background: ${BLACK_COLOR};
	margin-bottom: ${Spacer.SMALL}px;
	border-radius: 10px;
`;

const OrderImage = styled(FastImage)`
	width: 20px;
	height: 20px;
	background: ${WHITE_COLOR};

	border-color: ${ORANGE_COLOR};
	border-width: 1px;
	border-radius: 10px;
`;

const Title = styled(Text)`
	margin-bottom: ${Spacer.MEDIUM}px;
	margin-top: ${Spacer.EXTRA_LARGE}px;
`;
