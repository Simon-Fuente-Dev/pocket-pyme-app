import { Stack, Slot } from "expo-router";
import { YStack, ScrollView } from "tamagui";
import { FloatingTabBar } from "../../components/FloatingTabBar";
import {Spacer} from "@tamagui/core";

export default function AppGroupLayout() {
    return (
        // Contenedor base que ocupa toda la pantalla
        <YStack f={1} backgroundColor={"$background"}>
            <ScrollView
                f={1}
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}
            >
                <Slot />
                <Spacer size={12} />
            </ScrollView>
            <FloatingTabBar />
        </YStack>
    );
}