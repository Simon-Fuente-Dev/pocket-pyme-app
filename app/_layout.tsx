// app/_layout.tsx
import { TamaguiProvider, Theme, YStack, PortalProvider } from "tamagui";
import { ToastProvider, ToastViewport } from '@tamagui/toast';
import AppTamaguiConfig from "../tamagui.config";
import { Stack } from 'expo-router';
import { useColorScheme } from "react-native";
import { CurrentToast } from "../components/Rehusable/CurrentToast";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const themeName = colorScheme || 'light';

    return (
        <TamaguiProvider config={AppTamaguiConfig} defaultTheme={themeName}>
            {/* 1. El PortalProvider DEBE ser el padre del ToastProvider */}
            <PortalProvider>
                <ToastProvider swipeDirection="horizontal" duration={3000}>
                    <Theme name={themeName}>
                        <YStack f={1} backgroundColor={"$background"}>
                            <Stack screenOptions={{ headerShown: false }} />

                            {/* 2. El Viewport y el Toast deben estar dentro del PortalProvider y Theme */}
                            <CurrentToast />
                            <ToastViewport top={50} left={0} right={0} />
                        </YStack>
                    </Theme>
                </ToastProvider>
            </PortalProvider>
        </TamaguiProvider>
    );
}