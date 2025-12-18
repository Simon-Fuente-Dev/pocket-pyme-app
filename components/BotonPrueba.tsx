import {Button, ButtonProps} from "tamagui";

interface Props extends ButtonProps {
    title: string
}
export default function BotonPrueba({title, ...rest}: Props) {
    return (
        <Button
            {...rest}
            backgroundColor={"$vcolor3"}
            color={"white"}
            pressStyle={{opacity: 0.8, backgroundColor: "$vcolor4"}}
        >
            {title}
        </Button>
    )
}