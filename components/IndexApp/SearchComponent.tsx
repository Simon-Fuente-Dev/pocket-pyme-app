import {useState, useEffect} from "react";
import {Text, YStack, ScrollView, XStack, ListItem, Separator, Portal, Button} from "tamagui";
import {ControlledInput} from "../Rehusable/Inputs/ControlledInput";
import {useForm, useWatch} from "react-hook-form";
import {Search, Store, Utensils, Tag} from "@tamagui/lucide-icons";
import {FlatList} from "react-native";
import {useDialog} from "../../hooks/useDialog";
import {CustomDialog} from "../Rehusable/Dialog/CustomDialog";

export default function SearchComponent() {
    const {control} = useForm({
        defaultValues: {busqueda: ""}
    });

    const [showResults, setShowResults] = useState<boolean>(false);
    // Observamos el input en tiempo real
    const searchTerm = useWatch({control, name: "busqueda"});
    const [results, setResults] = useState<any[]>([]);
    const myDialog = useDialog();

    // Simulación de Base de Datos según tu lógica
    const mockData = [
        {id: 1, nombre: "Sushi Master1", tipo: "pyme", categoria: "Alimentos", subServicios: ["Sushi","gohan"]},
        {id: 3, nombre: "Sushi Master2", tipo: "pyme", categoria: "Alimentos", subServicios: ["Sushi", "Ramen"]},
        {id: 4, nombre: "Sushi Master3", tipo: "pyme", categoria: "Alimentos", subServicios: ["Sushi", "Ramen"]},
        {id: 5, nombre: "Sushi Master4", tipo: "pyme", categoria: "Alimentos", subServicios: ["Sushi", "Ramen"]},
        {id: 6, nombre: "Sushi Master5", tipo: "pyme", categoria: "Alimentos", subServicios: ["Sushi", "Ramen"]},
        {id: 7, nombre: "Sushi Master6", tipo: "pyme", categoria: "Alimentos", subServicios: ["Sushi", "Ramen"]},
        {id: 8, nombre: "Sushi Master7", tipo: "pyme", categoria: "Alimentos", subServicios: ["Sushi", "Ramen"]},
        {id: 9, nombre: "Sushi Master8", tipo: "pyme", categoria: "Alimentos", subServicios: ["Sushi", "Ramen"]},
        {id: 10, nombre: "Sushi Master9", tipo: "pyme", categoria: "Alimentos", subServicios: ["Sushi", "Ramen"]},
        {id: 11, nombre: "Arreglos pc mascapitos", tipo: "pyme", categoria: "Computación", subServicios: ["limpieza pc", "cotizacion computador", "reparacion notebooks"]},
        {
            id: 2,
            nombre: "Foca Hogar",
            tipo: "pyme",
            categoria: "Reparación",
            subServicios: ["Gasfitería", "Electricidad"]
        },
    ];

    useEffect(() => {
        if (searchTerm.length > 2) {
            const filtered = mockData.filter(item =>
                item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.subServicios.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setResults(filtered);
            setShowResults(true)
        } else {
            setResults([]);
            setShowResults(false);
        }
    }, [searchTerm]);

    const handleSelect = (item: any) => {
        setShowResults(false);
        console.log("registro seleccionado: ", item)
    }

    return (
        <YStack zIndex={2000}>
            <YStack
                backgroundColor="$vcolor5"
                pt="$8"
                pb="$4"
                px="$5"
                borderBottomLeftRadius="$8"
                borderBottomRightRadius="$8"
                elevation={5}
            >
                <Text color="white" fontSize={19} fontWeight="bold" mb="$2">¿Qué buscas hoy?</Text>
                <XStack
                    display={"flex"}
                    gap={"$2"}
                    width={"100%"}
                >
                    <YStack f={1}>
                        <ControlledInput
                            name="busqueda"
                            control={control}
                            placeholder="Pymes, comida, servicios..."
                            backgroundColor="white"
                            onFocus={() => setShowResults(true)}
                            // Ya no necesitas width="100%" aquí porque el padre YStack flex={1} lo controla
                        />
                    </YStack>
                    <Button icon={<Search/>} scaleIcon={1.5} onPress={() => myDialog.open()}/>

                </XStack>

            </YStack>

            {/* USAMOS PORTAL PARA RENDERIZAR FUERA DEL SCROLLVIEW DEL LAYOUT */}
            {showResults && results.length > 0 && (
                <Portal>
                    <YStack
                        position="absolute"
                        fullscreen
                        onPress={() => setShowResults(false)}
                    />
                    <YStack
                        position="absolute"
                        // Ajustamos la posición manualmente ya que el Portal va a la raíz de la app
                        top={145} // Ajusta este valor según la altura de tu header azul
                        left={15}
                        right={15}
                        backgroundColor="white"
                        br="$4"
                        elevation={20}
                        zIndex={5000}
                        overflow="hidden"
                        maxHeight={300}
                        borderWidth={0.1}
                        borderColor="$borderColor"
                    >
                        <FlatList
                            data={results}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <XStack
                                    p="$4"
                                    ai="center"
                                    gap="$3"
                                    borderBottomWidth={1}
                                    // boc="$borderColor"
                                    onPress={() => handleSelect(item)}
                                >
                                    <Store size={20} color="$vcolor5" />
                                    <YStack f={1}>
                                        <Text fontWeight="bold">{item.nombre}</Text>
                                        <Text fontSize={12} color="$gray10">
                                            {item.categoria} • {item.subServicios.join(", ")}
                                        </Text>
                                    </YStack>
                                </XStack>
                            )}
                            // Ahora el scroll funcionará porque el Portal no está dentro del ScrollView del layout
                            keyboardShouldPersistTaps="always"
                        />
                    </YStack>
                </Portal>
            )}
            <CustomDialog
                isOpen={myDialog.isOpen}
                onClose={myDialog.setIsOpen}
                title={"tulip"}
                // description={"tulip"}
            >
                {/* Aquí va cualquier cosa: un formulario, un icono, etc. */}
                <YStack p="$2" backgroundColor="$vcolor1" br="$2">
                    <Text>Contenido extra personalizado aquí.</Text>
                </YStack>
            </CustomDialog>
        </YStack>
    );
}