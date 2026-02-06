// app/(app)/perfil.tsx
import {useEffect, useState} from 'react';
import {Text, YStack, Button, Spinner, XStack, Input, ScrollView} from 'tamagui';
import {Hamburger, Utensils, Gift, Home, Heart, Search} from "@tamagui/lucide-icons"
import {ServiceCard} from "../../components/IndexApp/ServiceCard";
import {ControlledInput} from "../../components/Rehusable/Inputs/ControlledInput";
import {useForm} from "react-hook-form";
import SearchComponent from "../../components/IndexApp/SearchComponent";

export default function HomeScreen() {
    // Opcional: Puedes manejar los datos en un array para escalar más fácil
    const servicios = [
        {id: 1, title: 'Comida', icon: Utensils, color: '$orange10'},
        {id: 2, title: 'Regalos', icon: Gift, color: '$pink10'},
        {id: 3, title: 'Hogar', icon: Home, color: '$blue10'},
        {id: 4, title: 'Salud', icon: Heart, color: '$red10'},
    ];

    return (

        <YStack>
            <SearchComponent />
            <YStack
                f={1}
                p={"$4"}
                space={"$4"}
                backgroundColor={"$background"}

            >
                <YStack>
                    <Text fontSize={26}>Servicios mas buscados</Text>
                    <XStack spacing={2} flexWrap={"wrap"} jc={"space-between"} gap={"$3"}>
                        {servicios.map((item) => (
                            <ServiceCard
                                key={item.id}
                                title={item.title}
                                idServ={item.id}
                                Icon={item.icon}
                                iconColor={item.color}
                            />
                        ))}
                    </XStack>
                </YStack>
                <YStack>
                    <Text fontSize={26}>Sin ideas para regalos?</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingRight: 20}}
                    >
                        <XStack gap={"$15"}>
                            <Text fontSize={30}>1</Text>
                            <Text fontSize={30}>1</Text>
                            <Text fontSize={30}>1</Text>
                            <Text fontSize={30}>1</Text>
                            <Text fontSize={30}>1</Text>
                            <Text fontSize={30}>1</Text>
                            <Text fontSize={30}>1</Text>
                            <Text fontSize={30}>1</Text>
                            <Text fontSize={30}>1</Text>
                        </XStack>
                    </ScrollView>

                </YStack>


            </YStack>




        </YStack>

    );
}