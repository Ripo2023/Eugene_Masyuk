import React from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { FontStyles, ORANGE_COLOR, Spacer, WHITE_COLOR } from "../../shared/config";
import { Text } from "../../shared/ui";
import { DashboardCarousel } from "../../widgets/dashboard-carousel/ui";
import { RootStackListType } from "..";
import { RootScreens } from "../config";
import { setIsFirstEntranceThunk } from "../../entities/user";

interface IProps {
    navigation: NativeStackNavigationProp<RootStackListType, RootScreens.DASHBOARD>
}

export const DashboardScreen: React.FC<IProps> = ({navigation}) => {

    const handlePressSkip = async () => {
        setIsFirstEntranceThunk()
        navigation.replace(RootScreens.AUTHENTICATION)
    }

    return (
        <Container>
            <StatusBar backgroundColor={WHITE_COLOR} barStyle="dark-content" />
                <SkipButton onPress={handlePressSkip}>
                    <Text fontStyle={FontStyles.MEDIUM} color={ORANGE_COLOR}>
                        Skip
                    </Text>
                </SkipButton>
                <DashboardCarousel navigation={navigation}/>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    background: ${WHITE_COLOR}
`

const SkipButton = styled.TouchableOpacity`
    margin-right: ${Spacer.SECONDARY}px;
    margin-bottom: ${Spacer.EXTRA_LARGE}px;
    margin-left: auto;
    margin: ${Spacer.LARGE}px ${Spacer.MEDIUM}px ${Spacer.EXTRA_LARGE}px auto;
`