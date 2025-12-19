import { Toast, useToastState } from '@tamagui/toast'
import { YStack, Text } from 'tamagui'

export function CurrentToast() {
    const currentToast = useToastState()

    if (!currentToast || currentToast.isHandledNatively) return null

    return (
        <Toast
            key={currentToast.id}
            duration={3000}
            enterStyle={{ opacity: 0, scale: 0.5, y: -20 }}
            exitStyle={{ opacity: 0, scale: 0.5, y: -20 }}
            opacity={1}
            scale={1}
            y={0}
            animation="quick"
            backgroundColor={currentToast.type === 'error' ? "$red10" : "$vcolor5"}
            br="$radius.button"
            p="$4"
        >
            <YStack>
                <Toast.Title fontWeight="bold" color="white">{currentToast.title}</Toast.Title>
                {currentToast.message && (
                    <Toast.Description color="white">{currentToast.message}</Toast.Description>
                )}
            </YStack>
        </Toast>
    )
}