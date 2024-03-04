"use client";

import Image from "next/image";
import ThemedButton from "@/components/themed-components/Buttons";
import ChangeOrgSettings from "@/components/ChangeOrgSettings";
import { useDisclosure } from "@nextui-org/react";

const AdminSettings = () => {
  const { isOpen, onOpenChange } = useDisclosure();

  const resetSettingState = () => {
    return;
  };

  return (
    <div className="flex-col flex items-center py-16">
      <div className="font-medium pb-4">
        <h6>Admin Settings</h6>
        <p>Change your organization name, Avatar and URL.</p>
      </div>

      <div className="admin-settings-content p-4">
        <div className="pb-16">
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
              onClick={onOpenChange}
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

        <hr />

        <div className="pb-4">
          <div className="pb-4">
            <p className="font-semibold">Surveygram URL</p>
            <p>The URL for all forms of your org contain this:</p>
          </div>

          <div>
            <ThemedButton
              type="button"
              variant="primary"
              className="w-auto"
              size="md"
              onClick={onOpenChange}
            >
              Edit URL
            </ThemedButton>
          </div>
        </div>
      </div>
      <ChangeOrgSettings
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onCloseChange={resetSettingState}
      />
    </div>
  );
};


export default AdminSettings;
