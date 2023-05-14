import React from "react";
import styled from "styled-components/native";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import { KeyboardTypeOptions } from "react-native";

import { DARK_GRAY_COLOR, Spacer } from "../../config";

interface InputProps {
	placeholder?: string;
	onChange: (text: string) => void;
	onBlur?: () => void;
	onFocus?: () => void;
	defaultValue?: string;
	multiline?: boolean;
	height?: number;
	maxLength?: number;
    keyboardType?: KeyboardTypeOptions;
}

export const BottomSheetInput: React.FC<InputProps> = (props) => {
	const {
		placeholder,
		multiline,
        keyboardType,
		height,
		onFocus,
		maxLength,
		onBlur,
		onChange,
		defaultValue,
	} = props;
	const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

	const handleFocusInput = () => {
		shouldHandleKeyboardEvents.value = true;
		if (onFocus) {
			onFocus();
		}
	};

	const handleBlurInput = () => {
		shouldHandleKeyboardEvents.value = false;
		if (onBlur) {
			onBlur();
		}
	};


	return (
		<Wrapper
			height={height}
			placeholder={placeholder}
			onBlur={handleBlurInput}
			onFocus={handleFocusInput}
			onChangeText={onChange}
			defaultValue={defaultValue}
			multiline={multiline}
			autoCapitalize="none"
            keyboardType={keyboardType}
			maxLength={maxLength}
		/>
	);
};

const Wrapper = styled.TextInput<{ height?: number }>`
	height: ${({ height }) => height ?? Spacer.XX_LARGE}px;
	border: 1px solid ${DARK_GRAY_COLOR};
	border-radius: ${Spacer.EXTRA_SMALL}px;
	${({ height }) => height && "text-align-vertical: top"};
	padding: 10px;
	font-size: ${Spacer.MEDIUM}px;
`;
