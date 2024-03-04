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

interface ChangeAccountSettingsProps {
  isOpen: boolean;
  onOpenChange: () => void;
  isChangeName?: boolean;
  isChangeEmail?: boolean;
  onCloseChange: () => void;
}

const ChangeAccountSettings: React.FC<ChangeAccountSettingsProps> = ({
  isOpen,
  onOpenChange,
  isChangeName = false,
  isChangeEmail = false,
  onCloseChange,
}) => {
  const getNameChangeContent = () => (
    <>
      <TextField label="Your First Name" name="changeUserFirstName" />
      <TextField label="Your Last Name" name="changeUserLastName" />
    </>
  );

  const getEmailChangeContent = () => (
    <>
      <div>
        {`We'll send an email to the new address for you to confirm.
        Your current email is valid until then.`}
      </div>
      <TextField
        label="Your Password"
        name="currentPassword"
        aria-label="Current Password"
      />
      <TextField
        label="Your New Email"
        name="newEmail"
        aria-label="New Email"
      />
    </>
  );

  const getPasswordChangeContent = () => (
    <>
      <div>
        {`You'll be logged out after making the change. Use your new password to log back in.`}
      </div>
      <TextField
        label="Your Old Password"
        name="oldPassword"
        aria-label="Old Password"
      />
      <TextField
        label="Your New Password"
        name="newPassword"
        aria-label="New Password"
      />
      <TextField
        label="Your New Password (repeat)"
        name="confirmNewPassword"
        aria-label="Confirm New Password"
      />
    </>
  );

  const modalBodyContent = isChangeName
    ? getNameChangeContent()
    : isChangeEmail
    ? getEmailChangeContent()
    : getPasswordChangeContent();

  const handleClose = () => {
    onCloseChange();
    onOpenChange();
  };

  return (
    <Modal className="rounded-none" isOpen={isOpen} onOpenChange={handleClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {isChangeName
            ? "Change Your Name"
            : isChangeEmail
            ? "Change Your Email"
            : "Change Your Password"}
        </ModalHeader>
        <ModalBody>{modalBodyContent}</ModalBody>
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

export default ChangeAccountSettings;
