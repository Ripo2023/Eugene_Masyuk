import React from "react";
import {
	NavigationContainer,
} from "@react-navigation/native";


interface IProps {
	children: React.ReactNode;
}


export const WithNavigation: React.FC<IProps> = ({ children }) => (
	<NavigationContainer
	>
		{children}
	</NavigationContainer>
);
