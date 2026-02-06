import React from 'react'
import { X } from "@tamagui/lucide-icons"
// Importamos Portal directamente
import { Button, Dialog, XStack, YStack, Portal } from "tamagui";
interface CustomDialogProps {
    isOpen: boolean;
    onClose: (open: boolean) => void;
    title?: string;
    description?: string;
    children?: React.ReactNode;
}
export function CustomDialog({
                                 isOpen,
                                 onClose,
                                 title,
                                 description,
                                 children
                             }: CustomDialogProps) {
    if(!isOpen) return null;

    return (
        <Dialog modal open={isOpen} onOpenChange={onClose}>
            {/* CAMBIO CLAVE: Usamos Portal normal de Tamagui
               en lugar de Dialog.Portal para saltarnos el bug del contexto
            */}
            <Portal>
                <YStack
                    key="overlay"
                    position="absolute"
                    fullscreen // Ocupa toda la pantalla
                    backgroundColor="rgba(0,0,0,0.5)" // Oscurece el fondo
                    zIndex={499999} // Justo debajo del Content
                    // Si quieres que NO se cierre al tocar fuera, borra el onPress de aquí
                    onPress={(e) => {
                        e.stopPropagation(); // Evita que el toque pase a lo que hay detrás
                        onClose(false); // Descomenta esto si SÍ quieres que cierre al tocar fuera
                    }}
                />

                <Dialog.Content
                    bordered
                    elevate
                    key="content"
                    zIndex={500000} // Aseguramos que esté arriba
                    animation="quick"
                    enterStyle={{ opacity: 0, scale: 0.9 }}
                    exitStyle={{ opacity: 0, scale: 0.95 }}
                    x={0}
                    y={0}
                    // Posicionamiento manual si falla el centrado del Dialog
                    position="absolute"
                    top="25%"
                    alignSelf="center"
                    width="90%"
                    backgroundColor="white"
                    br="$4"
                >
                    <YStack gap="$2">
                        <XStack
                            // backgroundColor={"$vcolor3"}
                            flex={1}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            {title && <Dialog.Title fontWeight="bold" fontSize="$6">{title}</Dialog.Title>}
                            <Button
                                color="$vcolo1"
                                // size={"$5"}
                                circular
                                icon={<X size={24}/>}
                                onPress={() => onClose(false)}
                            />
                        </XStack>
                        {description && <Dialog.Description color="$gray10">{description}</Dialog.Description>}
                    </YStack>

                    {children}

                    <XStack alignSelf="flex-end" gap="$3" mt="$4">
                        <Button theme="alt1" onPress={() => onClose(false)}>
                            Cerrar
                        </Button>
                    </XStack>


                </Dialog.Content>
            </Portal>
        </Dialog>
    )
}