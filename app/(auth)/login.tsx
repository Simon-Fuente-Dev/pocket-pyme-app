import {Button, Text, XStack, YStack} from "tamagui";
import { useToastController } from '@tamagui/toast'
import {router} from "expo-router";
import type {LoginType} from "../../types/LoginType";
import {useForm} from "react-hook-form";
import {ControlledInput} from "../../components/Rehusable/Inputs/ControlledInput";
import {authUsuario} from "../../api/Login/useLogin";

export default function LoginScreen() {

    const toast = useToastController()

    const {control, handleSubmit} = useForm<LoginType>({
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const onSubmit = async (data): LoginType => {
        try {
            const response = await authUsuario(data);
            console.log(response)
        }catch (e) {
            toast.show('Error de Conexión', {
                native: true,
                message: 'No se pudo conectar con el servidor',
                type: 'error'
            });
        }
    }

    return (
        <YStack flex={1} alignItems="center" justifyContent="center" space={"$5"}>
            <Text>Login</Text>
            <YStack width={"100%"} space={"$4"} padding={"$3"}>
                <ControlledInput
                    control={control}
                    name={"username"}
                    label={"Usuario"}
                    rules={{
                        required: "Debe ingresar el nombre de usuario"
                    }}
                />

                <ControlledInput
                    control={control}
                    name={"password"}
                    label={"Contraseña"}
                    secureTextEntry
                    rules={{
                        required: "Debe ingresar la contraseña"
                    }}
                />
                <Button
                    backgroundColor="$vcolor4" // Usando el token directamente
                    color="white"
                    pressStyle={{ backgroundColor: '$vcolor4' }}
                    onPress={handleSubmit(onSubmit)}
                >Iniciar sesion</Button>
            </YStack>
            <XStack display={"flex"} alignItems={"center"} space={"$3"}>
                <Text>No tiene una cuenta? Registrese</Text>
                <Button
                    backgroundColor="$vcolor3" // Usando el token directamente
                    color="white"
                    pressStyle={{ backgroundColor: '$vcolor4' }} // Efecto al presionar
                    onPress={() => router.push("/register")}
                >
                    Registrarse
                </Button>
            </XStack>

        </YStack>
    )
}