import {KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Button, H2, Progress, Square, Tabs, Text, XStack, YStack, Spinner} from "tamagui";
import {router} from "expo-router";
import {useForm} from "react-hook-form";
import {ControlledInput} from "../../components/Rehusable/Inputs/ControlledInput";
import {useState} from "react";
import {Check, ChevronLeft, ChevronRight} from "@tamagui/lucide-icons";
import type {Register} from "../../types/RegisterType";
import {registarUsuario} from "../../api/Registro/useRegistrar";
import {useToastController} from '@tamagui/toast'

export default function RegisterScreen() {
    const [step, setStep] = useState(1);
    const totalSteps = 2;
    const [loading, setLoading] = useState(false);
    const toast = useToastController()

    const {control, handleSubmit, formState, trigger, watch} = useForm<Register>({
        defaultValues: {
            pnombre: '',
            snombre: '',
            appaterno: '',
            apmaterno: '',
            nomUsuario: '',
            email: '',
            password: '',
            rPassword: '',
        }
    });

    const handleNext = async () => {
        //Valida los campos segun el paso
        const camposValidar = step === 1
            ? ["pnombre", "snombre", "appaterno", "apmaterno"]
            : ["nomUsuario", "email", "password", "rPassword"];

        const isValid = await trigger(camposValidar as any);
        if (isValid) setStep(step + 1);
    }

    const prevStep = () => setStep(step - 1);

    const onSubmit = async (data: any) => {
        try {

            setLoading(true);
            const response = await registarUsuario(data);
            if (!response.success) {
                toast.show(response.message, {
                    native: true,
                    message: response.message,
                    duration: 4000,
                    type: 'error'
                });
            }

            toast.show(response.message, {
                native: true,
                message: response.message,
                duration: 4000,
            });
            router.push('/login');

        } catch (e) {
            toast.show('Error de Conexión', {
                native: true,
                message: 'No se pudo conectar con el servidor',
                type: 'error'
            });
        } finally {
            setLoading(false);

        }
    }

    return (
        <YStack f={1} marginBlock={"$8"} p={"$4"} space={"$4"}>
            <YStack space={"$2"}>
                <XStack jc={"space-between"} ai={"center"}>
                    <Text color="$vcolor5" fontWeight="bold">Paso {step} de {totalSteps}</Text>
                    <Text color="$vcolor5">{Math.round((step / totalSteps) * 100)}%</Text>
                </XStack>
                <Progress value={(step / totalSteps) * 100} size={"$2"} backgroundColor={"$vcolor1"}>
                    <Progress.Indicator animation={"bouncy"} backgroundColor={"$vcolor4"}/>
                </Progress>
            </YStack>

            <YStack space={"$6"}>
                <YStack width={"100%"} space="$4">
                    {/* Paso 1: Datos Personales */}
                    {step === 1 && (
                        <YStack space="$4" animation="lazy" enterStyle={{opacity: 0, x: -10}}>
                            <Text fontSize="$8" fontWeight="bold" color="$brown5">Datos Personales</Text>
                            <ControlledInput name="pnombre" control={control} label="Primer Nombre"
                                             rules={{required: 'Obligatorio'}}/>
                            <ControlledInput name="snombre" control={control} label="Segundo Nombre"/>
                            <ControlledInput name="appaterno" control={control} label="Primer Apellido"
                                             rules={{required: 'Obligatorio'}}/>
                            <ControlledInput name="apmaterno" control={control} label="Segundo Apellido"/>
                        </YStack>
                    )}

                    {/* Paso 2: Datos de Usuario */}
                    {step === 2 && (
                        <YStack space="$4" animation="lazy" enterStyle={{opacity: 0, x: 10}}>
                            <Text fontSize="$8" fontWeight="bold" color="$brown5">Cuenta de Usuario</Text>
                            <ControlledInput name="nomUsuario" control={control} label="Nombre de Usuario"
                                             rules={{required: 'Obligatorio'}}/>
                            <ControlledInput name="email" control={control} label="Correo" rules={{
                                required: "Debe Ingresar un correo electronico",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Formato de correo no válido",
                                }
                            }}/>
                            <ControlledInput name="password" control={control} label="Contraseña" secureTextEntry
                                             rules={{
                                                 required: "La contraseña es obligatoria",
                                                 minLength: {
                                                     value: 4,
                                                     message: "La contraseña debe tener un largo minimo de 4 caracteres"
                                                 }
                                             }}
                            />
                            <ControlledInput name="rPassword" control={control} label="Confirmar Contraseña"
                                             secureTextEntry
                                             rules={{
                                                 validate: (value) =>
                                                     value === watch("password") || "Las contraseñas no coinciden"
                                             }}

                            />
                        </YStack>
                    )}
                </YStack>
                <XStack space={"$2"}>
                    {step > 1 && (
                        <Button flex={1} variant={"outlined"} icon={ChevronLeft} onPress={prevStep}>
                            Atrás
                        </Button>
                    )}
                    {step < totalSteps ? (
                        <Button
                            flex={2}
                            backgroundColor="$vcolor4"
                            color="white"
                            iconAfter={ChevronRight}
                            onPress={handleNext}
                        >
                            Siguiente
                        </Button>
                    ) : (
                        <Button
                            flex={2}
                            backgroundColor={loading ? "$vcolor2" : "$vcolor4"}
                            color={loading ? "$vcolor4" : "white"}
                            icon={loading ? <Spinner color="$vcolor4"/> : null}
                            iconAfter={loading ? null : Check}
                            onPress={handleSubmit(onSubmit)}
                            disabled={loading}
                            opacity={loading ? 0.8 : 1}
                        >
                            {loading ? "Cargando..." : "Registrarse"}
                        </Button>
                    )}
                </XStack>
                <XStack display={"flex"} alignItems={"center"} space={"$3"}>
                    <Text>Posee una cuenta? Inicie sesion</Text>
                    <Button
                        backgroundColor="$vcolor3" // Usando el token directamente
                        color="white"
                        pressStyle={{ backgroundColor: '$vcolor4' }} // Efecto al presionar
                        onPress={() => router.push("/login")}
                    >
                        Iniciar sesion
                    </Button>
                </XStack>

            </YStack>
        </YStack>

    )
}
















