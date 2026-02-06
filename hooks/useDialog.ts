import {useState} from "react";

export function useDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen(!isOpen);

    return {
        isOpen,
        setIsOpen,
        open,
        close,
        toggle,
    };
}