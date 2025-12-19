import { Input, YStack, Text, InputProps } from 'tamagui'
import { useController, UseControllerProps } from 'react-hook-form'

interface Props extends InputProps {
    control: any
    name: string
    label?: string
    rules?: UseControllerProps['rules']
}

export function ControlledInput({ control, name, label, rules, ...inputProps }: Props) {
    const { field, fieldState } = useController({
        control,
        name,
        rules,
    })

    return (
        <YStack space="$1" width="100%">
            {label && <Text color="$vcolor5" fontWeight="bold">{label}</Text>}

            <Input
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                borderColor={fieldState.error ? '$red10' : '$vcolor3'}
                borderWidth={2}
                backgroundColor={'$vcolor1'}
                focusStyle={{ borderColor: '$vcolor4' }}
                {...inputProps}
            />

            {fieldState.error && (
                <Text color="$red10" fontSize="$2">
                    {fieldState.error.message || 'Campo requerido'}
                </Text>
            )}
        </YStack>
    )
}