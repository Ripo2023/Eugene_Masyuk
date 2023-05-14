import React, { useEffect } from "react";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import styled from "styled-components/native";

import { DARK_GRAY_COLOR, ORANGE_COLOR } from "../../config";

interface IProps {
    isActive: boolean;
}

export const CheckBox: React.FC<IProps> = ({isActive}) => {
    const isActiveShared = useSharedValue(isActive ? 1 : 0)


    const animatedStyles = useAnimatedStyle(() => {
        const borderColor = interpolateColor(
			isActiveShared.value,
			[0, 1],
			[DARK_GRAY_COLOR, ORANGE_COLOR],
			"RGB",
		);


        return {
           borderColor
    }
    })

    useEffect(() => {
        if (isActive) {
            isActiveShared.value = withTiming(1);
        } else {
            isActiveShared.value = withTiming(0);
        }
    }, [isActive])


return (
        <Wrapper style={animatedStyles}/>
    )
}

const Wrapper = styled(Animated.View)`
    width: 14px;
    height: 14px;
    border-width: 2px;
    border-radius: 3px;
`