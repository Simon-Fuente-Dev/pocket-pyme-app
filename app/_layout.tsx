// app/_layout.tsx
import { TamaguiProvider, Theme } from "tamagui";
import { ToastProvider } from '@tamagui/toast'; // Ya no necesitas ToastViewport
import AppTamaguiConfig from "../tamagui.config";
import { Stack } from 'expo-router';
import { useColorScheme } from "react-native";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const themeName = colorScheme || 'light';

    return (
        <TamaguiProvider config={AppTamaguiConfig} defaultTheme={themeName}>
            <ToastProvider swipeDirection="horizontal" duration={3000}>
                <Theme name={themeName}>
                    {/* Quitamos CurrentToast y ToastViewport */}
                    <Stack screenOptions={{ headerShown: false }} />
                </Theme>
            </ToastProvider>
        </TamaguiProvider>
    );
}