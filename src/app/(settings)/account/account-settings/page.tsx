"use client";

import Image from "next/image";
import ThemedButton from "@/components/themed-components/Buttons";
import { useDisclosure } from "@nextui-org/react";
import ChangeAccountSettings from "@/components/ChangeAccountSettings";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { ROUTES_CONSTANT } from "@/lib/routesConstants";

const AccountSettings = () => {
    const { isOpen, onOpenChange } = useDisclosure();
    const [changeName, setChangeName] = useState<boolean>(false);
    const [changeEmail, setChangeEmail] = useState<boolean>(false);
    const [changePassword, setChangePassword] = useState<boolean>(false);

    const router = useRouter();

    const handleChangeSettings = (type: "name" | "email" | "password") => {
        switch (type) {
            case "name":
                setChangeName(true);
                break;
            case "email":
                setChangeEmail(true);
                break;
            default:
                setChangePassword(true);
                break;
        }

        onOpenChange();
    };

    const resetSettingState = () => {
        setChangeName(false);
        setChangeEmail(false);
        setChangePassword(false);
    };

    return (
        <div className="flex-col flex items-center py-16">
            <div className="font-medium mb-6">
                <h6>Your Settings</h6>
                <p>Put a face to your name,edit your login details and set preferences.</p>
            </div>

            <div className="w-636 user-settings-content p-4">
                <div className="mb-4">
                    <div className="flex p-2 gap-4">
                        <Image
                            src={"/next.svg"}
                            alt="company logo"
                            width={"50"}
                            height={"50"}
                            objectFit="contain"
                        />
                        <p className="font-semibold">{"name"}</p>
                    </div>

                    <div className="flex gap-8">
                        <ThemedButton
                            type="button"
                            variant="primary"
                            className="w-auto"
                            size="md"
                            onClick={() => handleChangeSettings("name")}
                        >
                            Change Name
                        </ThemedButton>
                        <ThemedButton
                            type="button"
                            variant="primary"
                            className="w-auto"
                            size="md"
                        >
                            Change Avatar
                        </ThemedButton>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="pb-4">
                        <p className="font-semibold">Login Details</p>
                        <p>Your email is: {"email"}</p>
                    </div>

                    <div className="pb-4 flex gap-8">
                        <ThemedButton
                            type="button"
                            variant="primary"
                            className="w-auto"
                            size="md"
                            onClick={() => handleChangeSettings("email")}
                        >
                            Change Email
                        </ThemedButton>
                        <ThemedButton
                            type="button"
                            variant="primary"
                            className="w-auto"
                            size="md"
                            onClick={() => handleChangeSettings("password")}
                        >
                            Change Password
                        </ThemedButton>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="pb-4">
                        <p className="font-semibold">Danger Zone</p>
                        <p>If you do this, all your typeforms and the data they collected get removed from our system forever</p>
                    </div>

                    <div>
                        <ThemedButton
                            type="button"
                            variant="primary"
                            className="w-auto"
                            size="md"
                            onClick={() => {
                                router.push(ROUTES_CONSTANT.DELETE_ACCOUNT);
                            }}
                        >
                            Delete Account
                        </ThemedButton>
                    </div>
                </div>
            </div>
            <ChangeAccountSettings
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isChangeName={changeName}
                isChangeEmail={changeEmail}
                onCloseChange={resetSettingState}
            />
        </div>
    );
};

export default AccountSettings;
