import { useEffect } from "react";
import {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Spacer } from "../config";

interface IUseModalAnimationProps {
	callback: () => void;
}

const BLOCK_WIDTH = 320;
const ANIMATION_DURATION = 500;

export const useModalAnimation = ({ callback }: IUseModalAnimationProps) => {
	const translateY = useSharedValue(-200);
	const insets = useSafeAreaInsets();
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateY: translateY.value },
				{ translateX: -BLOCK_WIDTH / 2 },
			],
		};
	});

    const handleClose = () => {
        translateY.value = withTiming(
            -200,
            { duration: ANIMATION_DURATION },
            (isFinished) => {
                if (isFinished) {
                    runOnJS(callback)();
                }
            },
        );
    }

	useEffect(() => {
		translateY.value = withTiming(insets.top + Spacer.TINY, {
			duration: ANIMATION_DURATION,
		});

	}, []);

	return {
		width: BLOCK_WIDTH,
		animatedStyle,
        handleClose,
	};
};
