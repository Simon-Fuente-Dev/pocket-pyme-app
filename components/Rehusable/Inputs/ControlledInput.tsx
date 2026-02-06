import { Input, YStack, Text, InputProps, XStack } from 'tamagui'
import { useController, UseControllerProps } from 'react-hook-form'
import React from 'react'

interface Props extends InputProps {
    control: any
    name: string
    label?: string
    rules?: UseControllerProps['rules']
    backgroundColor? : string
    borderColor? : string
    // Agregamos la prop para el icono
}

export function ControlledInput({
                                    control,
                                    name,
                                    label,
                                    rules,
                                    backgroundColor = '$vcolor1',
                                    borderColor = '$vcolor2',
                                    ...inputProps }: Props) {
    const { field, fieldState } = useController({
        control,
        name,
        rules,
    })

    return (
        <YStack space="$1" flexStyle={inputProps.flex ? { flex: inputProps.flex } : {}}>
            {label && <Text color="$vcolor5" fontWeight="bold">{label}</Text>}

            {/* Contenedor relativo para posicionar el icono */}
            <XStack ai="center" position="relative">

                <Input
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    borderColor={fieldState.error ? '$red10' : '$vcolor3'}
                    borderWidth={2}
                    backgroundColor={backgroundColor}
                    focusStyle={{ borderColor: borderColor }}
                    width="100%"
                    // Si hay icono, añadimos padding a la izquierda para que el texto no lo tape
                    // paddingLeft={Icon ? "$15" : "$4"}
                    {...inputProps}
                />
            </XStack>

            {fieldState.error && (
                <Text color="$red10" fontSize="$2" ml="$1">
                    {fieldState.error.message || 'Campo requerido'}
                </Text>
            )}
        </YStack>
    )
}