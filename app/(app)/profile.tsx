// app/(app)/perfil.tsx
import { Text, YStack } from 'tamagui';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { userId } = useAuth(); // ¡Ya lo tienes disponible!

  return (
    <YStack f={1} jc="center" ai="center">
        <Text>Profile</Text>
      <Text>Mi ID de usuario es: {userId}</Text>
    </YStack>
  );
}