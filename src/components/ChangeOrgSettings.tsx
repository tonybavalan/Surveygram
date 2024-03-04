"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { TextField } from "./themed-components/Inputs";
import ThemedButton from "./themed-components/Buttons";

interface ChangeOrgSettingsProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onCloseChange: () => void;
}

const ChangeOrgSettings: React.FC<ChangeOrgSettingsProps> = ({
  isOpen,
  onOpenChange,
  onCloseChange,
}) => {
  const handleClose = () => {
    onCloseChange();
    onOpenChange();
  };

  return (
    <Modal className="rounded-none" isOpen={isOpen} onOpenChange={handleClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {"Change Org Name"}
        </ModalHeader>
        <ModalBody>
          <TextField label="Org Name" name="changeOrgName" />
        </ModalBody>
        <ModalFooter>
          <ThemedButton
            size="sm"
            variant="primary"
            onClick={handleClose}
            className="opacity-60 !px-4"
          >
            Cancel
          </ThemedButton>
          <ThemedButton size="sm" variant="primary" className="!px-4">
            Confirm
          </ThemedButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangeOrgSettings;
