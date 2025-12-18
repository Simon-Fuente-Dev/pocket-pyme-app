import {Button, H2, Progress, Square, Tabs, Text, XStack, YStack} from "tamagui";
import {router} from "expo-router";
import {useForm} from "react-hook-form";
import {ControlledInput} from "../../components/Rehusable/ControlledInput";
import {useState} from "react";
import {Check, ChevronLeft, ChevronRight} from "@tamagui/lucide-icons";

interface Register {
    pnombre: string;
    snombre: string;
    appaterno: string;
    apmaterno: string;
    nomUsuario: string;
    email: string;
    password: string;
    rPassword: string;
}


export default function RegisterScreen() {
    const [step, setStep] = useState(1);
    const totalSteps = 2;

    const {control, handleSubmit, formState, trigger} = useForm<Register>({
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

    const onSubmit = (data: any) => {
        console.log("Datos del formulario:", data)
    }

    return (
        <YStack f={1} p={"$4"} space={"$4"}>
            <YStack space={"$2"}>
                <XStack jc={"space-between"} ai={"center"}>
                    <Text color="$vcolor5" fontWeight="bold">Paso {step} de {totalSteps}</Text>
                    <Text color="$vcolor3">{Math.round((step / totalSteps) * 100)}%</Text>
                </XStack>
                <Progress value={(step / totalSteps) * 100} size={"$2"} backgroundColor={"$vcolor2"}>
                    <Progress.Indicator animation={"bouncy"} backgroundColor={"$vcolor4"}/>
                </Progress>
            </YStack>

            <YStack space={"$6"}  >
                <YStack  width={"100%"} space="$4">
                    {/* Paso 1: Datos Personales */}
                    {step === 1 && (
                        <YStack space="$4" animation="lazy" enterStyle={{ opacity: 0, x: -10 }}>
                            <Text fontSize="$8" fontWeight="bold" color="$brown5">Datos Personales</Text>
                            <ControlledInput name="pnombre" control={control} label="Primer Nombre" rules={{ required: 'Obligatorio' }} />
                            <ControlledInput name="snombre" control={control} label="Segundo Nombre" />
                            <ControlledInput name="appaterno" control={control} label="Primer Apellido" rules={{ required: 'Obligatorio' }} />
                            <ControlledInput name="apmaterno" control={control} label="Segundo Apellido" />
                        </YStack>
                    )}

                    {/* Paso 2: Datos de Usuario */}
                    {step === 2 && (
                        <YStack space="$4" animation="lazy" enterStyle={{ opacity: 0, x: 10 }}>
                            <Text fontSize="$8" fontWeight="bold" color="$brown5">Cuenta de Usuario</Text>
                            <ControlledInput name="nomUsuario" control={control} label="Nombre de Usuario" rules={{ required: 'Obligatorio' }} />
                            <ControlledInput name="email" control={control} label="Correo" rules={{ required: 'Email inválido' }} />
                            <ControlledInput name="password" control={control} label="Contraseña" secureTextEntry />
                            <ControlledInput name="rPassword" control={control} label="Confirmar Contraseña" secureTextEntry />
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
                            backgroundColor="$vcolor5"
                            color="white"
                            iconAfter={Check}
                            onPress={handleSubmit(onSubmit)}
                        >
                            Registrarse
                        </Button>
                    )}
                </XStack>

            </YStack>
        </YStack>

    )
}
















