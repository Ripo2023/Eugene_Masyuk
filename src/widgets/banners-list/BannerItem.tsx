import React from "react";
import styled from "styled-components/native"
import FastImage from "react-native-fast-image";

import { BANNER_HEIGHT, BANNER_WIDTH, BannerData } from "./config"
import { Spacer } from "../../shared/config";

interface IProps {
    data: BannerData;
}

export const BannerItem: React.FC<IProps> = ({data}) => {
    return (
        <Container>
            <Image source={{uri: data.image}}/>
        </Container>
    )
}

const Container = styled.View`
    width: ${BANNER_WIDTH}px;
    height: ${BANNER_HEIGHT}px;
    border-radius: ${Spacer.MEDIUM}px;
    margin-right: ${Spacer.MEDIUM}px;
    overflow: hidden;
`

const Image = styled(FastImage)`
    width: 100%;
    height: ${BANNER_HEIGHT}px;

`