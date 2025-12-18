import {TamaguiProvider, Theme, YStack} from "tamagui";
import AppTamaguiConfig from "../tamagui.config";
import { Stack } from 'expo-router'
import {useColorScheme} from "react-native";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const currentTheme = AppTamaguiConfig.themes[colorScheme];
    return (
        //Provider de tamagui para usar sus estilos
        <TamaguiProvider config={AppTamaguiConfig} defaultTheme={colorScheme || 'light'}>
            <Theme name={colorScheme || 'light'}>
                <YStack f={1} backgroundColor={"$background"}>
                    <Stack screenOptions={{
                        headerShown: true,
                        animation: 'slide_from_right',
                        contentStyle: {
                            backgroundColor: currentTheme.background.val,
                        },
                        // 3. También aplicamos el color al header para que combine
                        headerStyle: {
                            backgroundColor: AppTamaguiConfig.themes[colorScheme || 'light'].background.val,
                        },
                        headerTintColor: AppTamaguiConfig.themes[colorScheme || 'light'].color.val,
                    }}/>
                </YStack>

            </Theme>


        </TamaguiProvider>
    )
}
