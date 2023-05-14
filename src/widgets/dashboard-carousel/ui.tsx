import React, {useState} from "react";
import {TouchableOpacity} from "react-native"
import Animated, { FadeIn, SlideInRight } from "react-native-reanimated";
import styled from "styled-components/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BLACK_COLOR, FontStyles, Fonts, GRAY_COLOR, Spacer } from "../../shared/config";
import FirstStepDashboardIcon from "../../shared/assets/icons/onBoardingFirstStep.svg"
import SecondStepDashboardIcon from "../../shared/assets/icons/onBoardingSecondStep.svg"
import ThirdStepDashboardIcon from "../../shared/assets/icons/onBoardingThirdStep.svg"
import FourthStepDashboardIcon from "../../shared/assets/icons/onBoardingFourthStep.svg"
import { Text } from "../../shared/ui";
import { Dot } from "./Dot";
import { Button } from "../../shared/ui/Button";
import { RootStackListType } from "../../screens";
import { RootScreens } from "../../screens/config";
import {  setIsFirstEntranceThunk } from "../../entities/user";


const MAX_STEP = 3;

interface IDashboardCarouselProps {
    navigation: NativeStackNavigationProp<RootStackListType, RootScreens.DASHBOARD>
}

export const DashboardCarousel: React.FC<IDashboardCarouselProps> = ({navigation}) => {
    const [activeStep, setActiveStep] = useState(0)

    const handlePressIndicator = (index: number) => {
        if (index > activeStep) {
            setActiveStep(index)
        }
    }

    const handlePressSubmit = async () => {
        if (activeStep === MAX_STEP) {
                setIsFirstEntranceThunk()
                navigation.replace(RootScreens.AUTHENTICATION)

                return;
        }
        setActiveStep(activeStep + 1)
    }

    const handleGetStepComponent = () => {
        switch (activeStep) {
            case 0: return <DashBoardFirstStep />
            case 1: return <DashBoardSecondStep />
            case 2: return <DashBoardThirdStep />
            case 3: return <DashBoardFourthStep />
            default: return <DashBoardFirstStep />
        }

    }

    return (
        <Container>
    {handleGetStepComponent()}
        <DotsWrapper>
        {["", "", "", ""].map((item, index) => (
                <TouchableOpacity onPress={() => handlePressIndicator(index)} key={index}>
                <Dot  isActive={activeStep === index}/>
                </TouchableOpacity>
            ))}
        </DotsWrapper>
        <ButtonWrapper>
            <Button text="Next" width={155}  onPress={handlePressSubmit}/>
        </ButtonWrapper>
        </Container>
    )
}



const DashBoardFirstStep = () => {
    return (
        <StepWrapper entering={FadeIn}>
            <FirstStepDashboardIcon />
            <Title>
                Hello!
            </Title>
            <SubTitle>
                Coffee to Go is an application in which you can order coffee online and
                pick it up at the coffee shop closest to you. {`\n`}
                Now let's tell you how it works
            </SubTitle>
        </StepWrapper>
    )
}

const DashBoardSecondStep = () => {
    return (
        <StepWrapper entering={SlideInRight.duration(500)}>
            <SecondStepDashboardIcon />
            <Title>
                Search for a coffee shop
            </Title>
            <SubTitle>
                The map shows the nearest coffee shops to you, choose the most convenient one for you.
                The app will tell you how long to go to it.
            </SubTitle>
        </StepWrapper>
    )
}

const DashBoardThirdStep = () => {
    return (
        <StepWrapper entering={SlideInRight.duration(500)}>
            <ThirdStepDashboardIcon />
            <Title>
                Making an order
            </Title>
            <SubTitle>
                Choose your favorite drinks and desserts. {`\n`}
                You can choose their composition and choose the time when it will be convenient for you to pick them up
            </SubTitle>
        </StepWrapper>
    )
}

const DashBoardFourthStep = () => {
    return (
        <StepWrapper entering={SlideInRight.duration(500)}>
            <FourthStepDashboardIcon />
            <Title>
                Receiving an order
            </Title>
            <SubTitle>
               At the specified time, come to the coffee. {`\n`}
                You can choose their composition and choose the time when it will be convenient for you to pick them up
            </SubTitle>
        </StepWrapper>
    )
}

const Container = styled.View`
    flex: 1;
`

const StepWrapper = styled(Animated.View)`
    margin: 0 ${Spacer.LARGE}px;
    align-items: center;
`

const Title = styled(Text)`
    margin-bottom: ${Spacer.MEDIUM}px;
    margin-top: ${Spacer.LARGE}px;
    color: ${BLACK_COLOR};
    font-size: 20px;
    font-family: ${Fonts.SF_PRO_DISPLAY}-${FontStyles.BOLD}
`

const SubTitle = styled(Text)`
    color: ${GRAY_COLOR};
    text-align: center;
    line-height: 20px;
    margin: 0 ${Spacer.SMALL}px;
    margin-bottom: ${Spacer.MEDIUM}px;
`


const DotsWrapper = styled.View`
    flex-direction: row;
    margin: ${Spacer.MEDIUM}px auto;
`
const ButtonWrapper = styled.View`
    margin: ${Spacer.XX_LARGE}px auto 0;
`