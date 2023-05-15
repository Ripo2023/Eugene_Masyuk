import React, { useMemo, useRef } from "react";
import { Modal } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface IOrderModalProps {
	visible: boolean;
	onClose: () => void;
}

export const OrderModal: React.FC<IOrderModalProps> = ({
	visible,
	onClose,
}) => {
	const bottomSheetRef = useRef<BottomSheet>(null);

	const snapPoints = useMemo(() => ["95%"], []);

	return (
		<Modal
			visible={visible}
			animationType="fade"
			transparent
			onRequestClose={onClose}
		>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheet
					ref={bottomSheetRef}
					index={0}
					onClose={onClose}
					detached
					enablePanDownToClose
					snapPoints={snapPoints}
					animateOnMount
				></BottomSheet>
			</GestureHandlerRootView>
		</Modal>
	);
};
