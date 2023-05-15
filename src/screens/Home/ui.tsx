import React, { useEffect, useState } from "react";
import { StatusBar, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { FontStyles, Spacer, WHITE_COLOR } from "../../shared/config";
import Logo from "../../shared/assets/icons/logo.svg";
import { BadgeButton, Loader, Text } from "../../shared/ui";
import Map from "../../shared/assets/icons/MapPin.svg";
import { BannersList } from "../../widgets/banners-list";
import {
	ProductsList,
	getDiscounts,
	getProducts,
} from "../../entities/product";
import { useAppDispatch, useAppSelector, useLoadData } from "../../shared/lib";
import { IBanner, IProduct } from "../../entities/product/config";
import { categoriesList } from "./config";
import { RootStackListType } from "..";
import { RootScreens } from "../config";
import {
	cacheBannersData,
	cacheProductsData,
	getNetworkStatus,
} from "../../entities/user";

interface IProps {
	navigation: NativeStackNavigationProp<RootStackListType, RootScreens.HOME>;
}

export const HomeScreen: React.FC<IProps> = ({ navigation }) => {
	const [activeCategory, setActiveCategory] = useState(0);
	const { cachedProductsData, cachedBannersData } = useAppSelector(
		(store) => store.user,
	);
	const dispatch = useAppDispatch();
	const [productsData, setProductsData] = useState<Nullable<IProduct[]>>(null);
	const [bannersData, setBannersData] = useState<Nullable<IBanner[]>>(null);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const handleLoadData = async () => {
		const isUserOnline = await getNetworkStatus();

		if (!isUserOnline) {
			setProductsData(cachedProductsData);
			setBannersData(cachedBannersData);

			return;
		}
		const productsResult = await getProducts();
		const discountsResult = await getDiscounts();

		cacheProductsData(productsResult, dispatch);
		cacheBannersData(discountsResult, dispatch);
		setProductsData(productsResult);
		setBannersData(discountsResult);
	};

	const handleRefreshData = async () => {
		setIsRefreshing(true);
		await handleLoadData();
		setIsRefreshing(false);
	};

	useEffect(() => {
		handleLoadData();
	}, []);

	const handlePressLogo = () => {
		navigation.push(RootScreens.ORDERS);
	};

	const { isLoading } = useLoadData({ loadData: handleLoadData });

	return (
		<Wrapper>
			<StatusBar
				backgroundColor={WHITE_COLOR}
				barStyle="dark-content"
			/>
			<LogoWrapper onPress={handlePressLogo}>
				<Logo />
				<LogoInfo>
					<LogoName color="#636466">Coffee shop address</LogoName>
					<LogoAddress fontStyle={FontStyles.SEMI_BOLD}>
						<Map /> 43, Marathon st.
					</LogoAddress>
				</LogoInfo>
			</LogoWrapper>

			<Container
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={handleRefreshData}
					/>
				}
				showsVerticalScrollIndicator={false}
			>
				{productsData && bannersData && (
					<>
						<BannersList data={bannersData} />
						<Row horizontal>
							{categoriesList.map((item, index) => (
								<BadgeButton
									onPress={() => setActiveCategory(index)}
									isActive={activeCategory === index}
									title={item.title}
									key={index}
								/>
							))}
						</Row>
						{activeCategory === 0 ? (
							<ProductsList data={productsData} />
						) : (
							<NotFound>
								<Text size={Spacer.EXTRA_LARGE}>
									:( Sorry, we couldn't find any products for this category.
								</Text>
							</NotFound>
						)}
					</>
				)}
			</Container>
			{isLoading && <Loader />}
		</Wrapper>
	);
};

const Container = styled.ScrollView`
	background: ${WHITE_COLOR};
	flex: 1;
`;

const Wrapper = styled.View`
	flex: 1;
	background: ${WHITE_COLOR};
`;

const LogoWrapper = styled.Pressable`
	flex-direction: row;
	margin: ${Spacer.LARGE}px ${Spacer.MEDIUM}px;
	background: white;
`;

const LogoInfo = styled.View`
	margin-left: ${Spacer.MEDIUM}px;
`;

const LogoAddress = styled(Text)`
	flex-direction: row;
	align-items: center;
	color: #2a2a2b;
`;

const LogoName = styled(Text)`
	margin-bottom: 3px;
`;

const Row = styled.ScrollView`
	margin-left: ${Spacer.MEDIUM}px;
	margin-top: ${Spacer.EXTRA_LARGE}px;
	margin-bottom: ${Spacer.LARGE}px;
`;

const NotFound = styled.View`
	margin: ${Spacer.EXTRA_LARGE}px;
`;
