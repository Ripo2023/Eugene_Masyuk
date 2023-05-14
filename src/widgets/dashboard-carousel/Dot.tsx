import React, {useEffect} from "react";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import styled from "styled-components/native";


interface IDotProps {
    isActive: boolean;
}

export const Dot: React.FC<IDotProps> = ({isActive}) => {
    const isActiveShared = useSharedValue(isActive ? 1 : 0)
    const animatedStyles = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
			isActiveShared.value,
			[0, 1],
			["rgba(255, 87, 18, 0.1)", "rgba(255, 87, 18, 1)"],
			"RGB",
		);


        return {
            width: isActive ? withTiming(10) : withTiming(6),
            height: isActive ? withTiming(10) : withTiming(6),
            backgroundColor
    }
    })

    useEffect(() => {
        if (isActive) {
            isActiveShared.value = withTiming(1)
        } else {
            isActiveShared.value = withTiming(0)

        }
    }, [isActive])

    return (
        <DotPress>
            <DotView style={animatedStyles}>
            </DotView>
        </DotPress>
        )

}

const DotPress = styled.View`
    padding-right: 10px;
`

const DotView = styled(Animated.View)`
    border-radius: 16px;
`