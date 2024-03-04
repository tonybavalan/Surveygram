"use client";

import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import ThemedButton from "@/components/themed-components/Buttons";
import { TextField } from "./themed-components/Inputs";
import { useState } from "react";

interface DeleteAccountProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

const DeleteAccountSettings: React.FC<DeleteAccountProps> = ({
    isOpen,
    onOpenChange,
}) => {

    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState(""); // Store input value

    const handleAuthenticateClick = () => {
        setShowInput(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <Modal className="rounded-none" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    <p>Email Authentication</p>
                </ModalHeader>
                <ModalBody>
                    <p>{`We’ll email you the code you need to get set up`}</p>
                    {showInput && (
                        <TextField
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Enter the code"
                        />
                    )}
                    <ThemedButton
                        type="button"
                        variant="primary"
                        size="md"
                        onClick={handleAuthenticateClick} // Trigger input display
                    >
                        {showInput ? "Submit" : "Authenticate"}
                    </ThemedButton>
                </ModalBody>
            </ModalContent>
        </Modal>

    );
};
export default DeleteAccountSettings;