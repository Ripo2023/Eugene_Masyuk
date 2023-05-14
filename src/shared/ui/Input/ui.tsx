import React from "react";
import styled from "styled-components/native";

import { DARK_GRAY_COLOR, Spacer } from "../../config";

interface InputProps {
	placeholder?: string;
	onChange: (text: string) => void;
	onBlur?: () => void;
	defaultValue?: string;
}

export const Input: React.FC<InputProps> = (props) => {
	const { placeholder, onBlur, onChange, defaultValue } = props;

	return (
		<Wrapper
			placeholder={placeholder}
			onBlur={onBlur}
			onChangeText={onChange}
			defaultValue={defaultValue}
			autoCapitalize="none"
		/>
	);
};

const Wrapper = styled.TextInput`
	border: 1px solid ${DARK_GRAY_COLOR};
	border-radius: ${Spacer.EXTRA_SMALL}px;
	padding: 10px;
	font-size: ${Spacer.MEDIUM}px;
`;
