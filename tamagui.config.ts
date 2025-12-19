import { createTamagui, createTokens } from 'tamagui'
import { config } from '@tamagui/config/v3'

const customColors = {
    vcolor1: '#BDD8E9',
    vcolor2: '#7BBDE8',
    vcolor3: '#6EA2B3',
    vcolor4: '#4E8EA2',
    vcolor5: '#001D39',
    bgColorL: '#F0F3FA',
    red10: '#F44336',
    white: '#FFFFFF',
    black: '#000000',
}

const tokens = createTokens({
    ...config.tokens,
    color: {
        ...config.tokens.color,
        ...customColors,
    },
    // 1. Tokens de Espaciado (Padding, Margin, Gap)
    space: {
        ...config.tokens.space,
        'xs': 4,
        'sm': 8,
        'md': 16,
        'lg': 24,
        'xl': 32,
        'true': 16, // Valor por defecto cuando usas p o m sin número
    },
    // 2. Tokens de Tamaño (Ancho, Alto)
    size: {
        ...config.tokens.size,
        'small': 30,
        'medium': 50,
        'large': 80,
    },
    // 3. Tokens de Radio (Bordes redondeados)
    radius: {
        ...config.tokens.radius,
        'button': 12,
        'card': 20,
    }
})

const appConfig = createTamagui({
    ...config,
    tokens,
    themes: {
        light: {
            background: tokens.color.bgColorL,
            color: tokens.color.vcolor5,
            primary: tokens.color.vcolor3,
            secondary: tokens.color.vcolor2,
        },
        dark: {
            background: tokens.color.vcolor5,
            color: tokens.color.vcolor1,
            primary: tokens.color.vcolor3,
            secondary: tokens.color.vcolor4,
        },
    },
})

export default appConfig
export type AppTamaguiConfig = typeof appConfig