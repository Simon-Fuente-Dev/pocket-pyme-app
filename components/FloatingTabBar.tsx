import { Home, Heart, ShoppingBag, Settings } from '@tamagui/lucide-icons';
import { useRouter, usePathname } from 'expo-router';
import { XStack, YStack, Button } from 'tamagui';

export const FloatingTabBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { icon: Home, path: '/', name: 'index' },
        { icon: Heart, path: '/favorites', name: 'favorites' }, // Ajusta según tus rutas
        { icon: ShoppingBag, path: '/shop', name: 'shop' },
        { icon: Settings, path: '/settings', name: 'settings' },
    ];

    return (
        <YStack  bottom={35} left={0} right={0}>
            <XStack
                borderTopColor={"$vcolor1"}
                borderTopWidth={1.5}
                backgroundColor="$background" // Color oscuro de tu imagen
                px="$6"
                py="$3"
                gap="$5"
                // elevation={15}
                shadowColor="$vcolor4"
                // width={"100%"}
                alignItems="center"
                justifyContent="space-around"
            >
                {navItems.map((item) => (
                    <Button
                        key={item.path}
                        size="$2"
                        circular
                        backgroundColor="transparent"
                        onPress={() => router.push(item.path as any)}
                        icon={
                            <item.icon
                                size={22}
                                color={pathname === item.path ? '$vcolor5' : '$vcolor2'}
                            />
                        }
                        pressStyle={{ scale: 0.9, opacity: 0.7 }}
                    />
                ))}
            </XStack>
        </YStack>
    );
};