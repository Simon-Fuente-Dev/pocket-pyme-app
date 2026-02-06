import {YStack, Text} from "tamagui";

interface ServiceCardProps {
    title: string;
    idServ: number;
    Icon: React.ElementType<{ size?: number; color?: string }>;
    iconColor?: string;
}

export const ServiceCard = ({ title, idServ, Icon, iconColor = "$vcolor5" }: ServiceCardProps) => {
    return (
        <YStack
            width="48%"
            h={150}
            jc="center"
            ai="center"
            br="$6"
            backgroundColor={"$vcolor6"}
            // opacity={0.5}
            // bw={1.5}
            space="$2"
            pressStyle={{ scale: 0.97, backgroundColor: '$backgroundPress' }}
        >
            <Icon size={48} color={iconColor} />
            <Text fontSize={18} fontWeight="500" color="$color">
                {title}
            </Text>
        </YStack>
    );
};