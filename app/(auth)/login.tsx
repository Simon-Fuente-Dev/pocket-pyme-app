import {Button, Text, YStack} from "tamagui";
import {router} from "expo-router";
export default function LoginScreen() {
    return (
        <YStack flex={1} alignItems="center" justifyContent="center">
            <Text fontSize={"$10"} color={"blue"}>Login</Text>
            <Button
                backgroundColor="$vcolor3" // Usando el token directamente
                color="white"
                pressStyle={{ backgroundColor: '$vcolor4' }} // Efecto al presionar
                onPress={() => router.push("/register")}
            >
                Registrarse
            </Button>
        </YStack>
    )
}