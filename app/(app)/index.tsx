// app/(app)/perfil.tsx
import { Text, YStack, Button } from 'tamagui';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { userId } = useAuth(); // ¡Ya lo tienes disponible!

  return (
    <YStack f={1} jc="center" ai="center">
      <Text>Mi ID de usuario es: {userId}</Text>
      <Button
        onPress={() => router.push("/profile")}
      >ir a profile</Button>
    </YStack>

  );
}