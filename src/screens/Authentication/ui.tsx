import React, {useMemo, useRef, useState} from "react";
import styled from "styled-components/native"
import { KeyboardAvoidingView, ToastAndroid } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet"
import auth from "@react-native-firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { BLUE_COLOR, DARK_GRAY_COLOR, FontStyles, LIGHT_GRAY_COLOR, Spacer, WHITE_COLOR } from "../../shared/config"
import { BottomSheetInput, Button, Input, Text, TopBar } from "../../shared/ui";
import AuthenticationLogo from "../../shared/assets/icons/AuthenticationLogo.svg"
import { CheckBox } from "../../shared/ui/CheckBox";
import { RootScreens } from "../config";
import { RootStackListType } from "..";

interface IProps {
    navigation: NativeStackNavigationProp<RootStackListType, RootScreens.DASHBOARD>
}

export const AuthenticationScreen: React.FC<IProps> = ({navigation}) => {
      // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [isActiveCheckBox, setIsActiveCheckBox] = useState(false);
  const [isRequestSuccessFul, setIsRequestSuccessFul] = useState(false);
  const [codeValue, setCodeValue] = useState("")
  const [confirm, setConfirm] = useState(null);

  const handlePressCheckBox = () => {
    setIsActiveCheckBox(!isActiveCheckBox)
  }

  const handleSendCode = async () => {
    // try {

    // const confirmation = await auth().signInWithPhoneNumber(phoneNumberValue);

    // console.log(confirmation)
    // setConfirm(confirmation);
    // setIsRequestSuccessFul(true)

    // } catch (err) {
    //     console.log("ERRROR")
    //     console.log(err)
    // }
    setIsRequestSuccessFul(true)
  }

  const handlePressSubmit = async () => {
    // try {
    //     if (!confirm) {

    //     }
    //     await confirm.confirm(codeValue);
    //   } catch (error) {
    //     ToastAndroid.showWithGravityAndOffset(
    //         "Error SMS code",
    //         ToastAndroid.SHORT,
    //         ToastAndroid.BOTTOM,
    //         25,
    //         50,
    //       );
    //   }
    navigation.replace(RootScreens.HOME)
  }

  const onPressBack = () => {
    setIsRequestSuccessFul(false)

  }

  const handleGetContent = () => {
        if (isRequestSuccessFul) {
            return (
                <>
                <Title>
                     Code
                </Title>
                <Input defaultValue={codeValue} onChange={setCodeValue} />
                <ButtonWrapper>
                <Button
            fontStyle={FontStyles.BOLD}
            textSize={Spacer.LARGE}
            text="Sign in"
            disabled={!codeValue.length}
            disabledBackground={DARK_GRAY_COLOR}
            onPress={handlePressSubmit} />
                </ButtonWrapper>
                </>
            )
        }

return (
       <>
            <Title>
            Phone
        </Title>
            <BottomSheetInput keyboardType="phone-pad" onChange={setPhoneNumberValue} />
            <Row onPress={handlePressCheckBox}>
                <CheckBox  isActive={isActiveCheckBox} />
                <CheckBoxTitle>
                    i'm agree with <Text color={BLUE_COLOR}>
                        privacy policy
                    </Text> and <Text color={BLUE_COLOR}>
                        user agreement
                    </Text>
                </CheckBoxTitle>
            </Row>
        <Button
            fontStyle={FontStyles.BOLD}
            textSize={Spacer.LARGE}
            text="Continue"
            disabled={!isActiveCheckBox || !phoneNumberValue.length}
            disabledBackground={DARK_GRAY_COLOR}
            onPress={handleSendCode} />
       </>
        )
  }

  // variables
  const snapPoints = useMemo(() => [270], []);

    return (
        <Container>
            <KeyboardAvoidingView style={{flex: 1}}>
            <TopBar withNavigationBack={isRequestSuccessFul} onPressBack={onPressBack} title="Sign in" titleSize={Spacer.LARGE} />
            <Line />
            <AuthenticationLogo />
            <BottomSheet
             ref={bottomSheetRef}
             index={0}
             handleComponent={() => null}
             snapPoints={snapPoints}
             animateOnMount
                backgroundStyle={{
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10,
                    shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 8,
                },
                shadowOpacity: 0.8,
                shadowRadius: 5.46,
                elevation: 24,
				}}
            >
                <BottomSheetView>
                <Indicator />
                    {handleGetContent()}
                </BottomSheetView>

            </BottomSheet>

            </KeyboardAvoidingView>
        </Container>
    )
}


const Container = styled.View`
    flex: 1;
    background: ${WHITE_COLOR}
`
const Line = styled.View`
    width: 100%;
    height: 1px;
    background: ${LIGHT_GRAY_COLOR};
`

const BottomSheetView = styled.View`
    margin: ${Spacer.MEDIUM}px;
    margin-top: ${Spacer.SMALL}px;
`

const Indicator = styled.View`
    width: 36px;
    height: 4px;
    margin: 0 auto;
    background: #EEEEEE;

`

const Title = styled(Text)`
    margin-bottom: ${Spacer.MEDIUM}px;
`

const Row = styled.TouchableOpacity`
    flex-direction: row;
    margin-top: ${Spacer.LARGE}px;
    align-items: center;
    margin-bottom: ${Spacer.EXTRA_LARGE}px;
`

const CheckBoxTitle = styled(Text)`
    margin-left: ${Spacer.SMALL}px;
`

const ButtonWrapper = styled.View`
    margin-top: ${Spacer.XX_LARGE}px;
`