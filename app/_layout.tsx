import { useEffect } from "react";
import { useRouter, useSegments, Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import { ToastProvider } from '@tamagui/toast';
import AppTamaguiConfig from "../tamagui.config";

// Importa tu contexto
import { AuthProvider, useAuth } from "../context/AuthContext";

function RootLayoutNav() {
    const { session, isLoading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        // Revisamos si el usuario está en el grupo de autenticación o de la app
        const inAppGroup = segments[0] === '(app)';

        if (!session && inAppGroup) {
            // Si NO hay token y quiere entrar a la app -> al Login
            router.replace('/(auth)/login');
        } else if (session && segments[0] === '(auth)') {
            // Si SÍ hay token y está en login -> al Home de la app
            router.replace('/(app)/'); 
        }
    }, [session, isLoading, segments]);

    // Si está cargando el SecureStore, mostramos pantalla en blanco para evitar saltos
    if (isLoading) return null;

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack>
    );
}

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const themeName = colorScheme || 'light';

    return (
        <TamaguiProvider config={AppTamaguiConfig} defaultTheme={themeName}>
            <ToastProvider swipeDirection="horizontal" duration={3000}>
                <AuthProvider>
                    <Theme name={themeName}>
                        <RootLayoutNav />
                    </Theme>
                </AuthProvider>
            </ToastProvider>
        </TamaguiProvider>
    );
}