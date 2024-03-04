"use client";

import ThemedButton from "@/components/themed-components/Buttons";
import { useDisclosure } from "@nextui-org/react";
import DeleteAccountSettings from "@/components/DeleteAccountSettings";

const DeleteAccount: React.FC = () => {
    const { isOpen, onOpenChange } = useDisclosure();

    return (
        
        <div className="flex justify-center">
            <div>
                <div className="pb-6">
                    <h5>Authenticate to continue</h5>
                    <p>{`Before you can delete your account`}</p>
                    <p>{`you need to authenticate so we can be extra safe thar you’re you.`}</p>
                </div>

                <div className="flex gap-4">
                    <ThemedButton
                        type="button"
                        variant="primary"
                        size="md">Cancel</ThemedButton>
                    <ThemedButton
                        type="button"
                        variant="primary"
                        size="md"
                        onClick={onOpenChange}
                    >
                        Authenticate
                    </ThemedButton>
                </div>
            </div>
            <DeleteAccountSettings
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </div>
    );
};
export default DeleteAccount;