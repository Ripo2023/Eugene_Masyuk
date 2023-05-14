import React, { useState } from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";

import { FontStyles, Spacer, WHITE_COLOR } from "../../shared/config";
import Logo from "../../shared/assets/icons/logo.svg";
import { BadgeButton, Text } from "../../shared/ui";
import Map from "../../shared/assets/icons/MapPin.svg";
import { BannersList } from "../../widgets/banners-list";
import { ProductsList } from "../../entities/product";

const bannersMockData = [
	{ image: "https://i.ibb.co/r0xJBcX/Frame-175.png" },
	{ image: "https://i.ibb.co/r0xJBcX/Frame-175.png" },
];

const categoriesList = [
	{
		title: "Coffee",
	},
	{
		title: "Tea",
	},
	{
		title: "Drinks",
	},
	{
		title: "Desserts",
	},
];

const productsMockData = [
	{
		title: "Cappuccino",
		minPrice: 180,
		description: "CappuccinoCappuccinoCappuccinoCappuccinoCappuccino",
		image: "https://i.ibb.co/JRD661m/image.png",
	},
	{
		title: "Cappuccino",
		minPrice: 180,
		description: "CappuccinoCappuccinoCappuccinoCappuccinoCappuccino",
		image: "https://i.ibb.co/JRD661m/image.png",
	},
	{
		title: "Cappuccino",
		minPrice: 180,
		description: "CappuccinoCappuccinoCappuccinoCappuccinoCappuccino",
		image: "https://i.ibb.co/JRD661m/image.png",
	},
	{
		title: "Cappuccino",
		minPrice: 180,
		description: "CappuccinoCappuccinoCappuccinoCappuccinoCappuccino",
		image: "https://i.ibb.co/JRD661m/image.png",
	},
	{
		title: "Cappuccino",
		minPrice: 180,
		description: "CappuccinoCappuccinoCappuccinoCappuccinoCappuccino",
		image: "https://i.ibb.co/JRD661m/image.png",
	},
	{
		title: "Cappuccino",
		minPrice: 180,
		description: "CappuccinoCappuccinoCappuccinoCappuccinoCappuccino",
		image: "https://i.ibb.co/JRD661m/image.png",
	},
	{
		title: "Cappuccino",
		minPrice: 180,
		description: "CappuccinoCappuccinoCappuccinoCappuccinoCappuccino",
		image: "https://i.ibb.co/JRD661m/image.png",
	},
	{
		title: "Cappuccino",
		minPrice: 180,
		description: "CappuccinoCappuccinoCappuccinoCappuccinoCappuccino",
		image: "https://i.ibb.co/JRD661m/image.png",
	},
	{
		title: "Cappuccino",
		minPrice: 180,
		description: "CappuccinoCappuccinoCappuccinoCappuccinoCappuccino",
		image: "https://i.ibb.co/JRD661m/image.png",
	},
];

export const HomeScreen: React.FC = () => {
	const [activeCategory, setActiveCategory] = useState(0);

	return (
		<Container>
			<StatusBar
				backgroundColor={WHITE_COLOR}
				barStyle="dark-content"
			/>
			<LogoWrapper>
				<Logo />
				<LogoInfo>
					<LogoName color="#636466">Coffee shop address</LogoName>
					<LogoAddress fontStyle={FontStyles.SEMI_BOLD}>
						<Map /> 43, Marathon st.
					</LogoAddress>
				</LogoInfo>
			</LogoWrapper>
			<BannersList data={bannersMockData} />
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
			<ProductsList data={productsMockData} />
		</Container>
	);
};

const Container = styled.ScrollView`
	background: ${WHITE_COLOR};
`;

const LogoWrapper = styled.View`
	flex-direction: row;
	margin: ${Spacer.LARGE}px ${Spacer.MEDIUM}px;
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
