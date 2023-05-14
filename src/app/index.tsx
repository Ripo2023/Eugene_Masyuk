import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

import { WithNavigation, WithRedux } from "./providers";
import { Routing } from "../screens";





export const App: React.FC = () => {



return (
         <GestureHandlerRootView style={styles.container}>
            <WithRedux>
                <SafeAreaProvider>
                    <WithNavigation>
                        <Routing />
                    </WithNavigation>
                </SafeAreaProvider>
            </WithRedux>
        </GestureHandlerRootView>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
