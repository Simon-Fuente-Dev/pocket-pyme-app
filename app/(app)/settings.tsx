// app/(app)/perfil.tsx
import {Button, Text, YStack} from 'tamagui';
import {useAuth} from '../../context/AuthContext';

export default function ProfileScreen() {
    const {userId, signOut} = useAuth(); // ¡Ya lo tienes disponible!

    return (
        <YStack f={1} jc="center" ai="center">
            <Text>Profile</Text>
            <Text>Mi ID de usuario es: {userId}</Text>
            <Button onPress={signOut}>Sign Out</Button>
        </YStack>
    );
}