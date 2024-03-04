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
import { useEffect, useState } from "react";
import {
  commonService,
  getCookie,
  getUserDetail,
  showSuccessMessage,
} from "@/lib/utils";
import { API_ROUTES } from "@/lib/api-routes";
import { API_TYPES } from "@/lib/constants";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ROUTES_CONSTANT } from "@/lib/routesConstants";

interface CreateWorkspaceProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onWorkspaceAdd: () => void;
  isRename?: boolean;
  isTeam?: string | null;
}

const CreateWorkspace: React.FC<CreateWorkspaceProps> = ({
  isOpen,
  onOpenChange,
  onWorkspaceAdd,
  isRename = false,
  isTeam,
}) => {
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("identify");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState<string>("");
  const renameEndpoint = isTeam
    ? API_ROUTES.RENAME_TEAM_WORKSPACE(workspaceId, getUserDetail("email"))
    : API_ROUTES.RENAME_WORKSPACE(workspaceId, getUserDetail("email"));

  useEffect(() => {
    const currentWorkspaceName = searchParams.get("name") || "";
    setNewWorkspaceName(isRename ? currentWorkspaceName : "");
  }, [searchParams]);

  const createNewWorkspace = async () => {
    try {
      setLoading(true);
      const response = await commonService(
        isTeam ? API_ROUTES.CREATE_TEAM_WORKSPACE : API_ROUTES.CREATE_WORKSPACE,
        API_TYPES.POST,
        { workspaceName: newWorkspaceName, isDisable: false }
      );

      if (response?.status === 200) {
        showSuccessMessage("Workspace created successfully");
        onWorkspaceAdd();
        onOpenChange();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const renameWorkspace = async () => {
    try {
      setLoading(true);
      const response = await commonService(
        `${renameEndpoint}?newWorkSpaceName=${newWorkspaceName}`,
        API_TYPES.POST,
        {}
      );
      if (response.status === 200) {
        onWorkspaceAdd();
        onOpenChange();
        showSuccessMessage(response.data.message);
        router.push(
          `${ROUTES_CONSTANT.WORKSPACE}?name=${encodeURIComponent(
            newWorkspaceName
          )}&identify=${workspaceId}` + (isTeam ? "&isTeam=true" : "")
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal className="rounded-none" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            {isRename ? "Rename workspace" : "Create new workspace"}
          </ModalHeader>
          <ModalBody>
            <TextField
              name="workspaceName"
              value={newWorkspaceName}
              placeholder="name your workspace"
              onChange={(e) => setNewWorkspaceName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <ThemedButton
              size="sm"
              variant="primary"
              onClick={onOpenChange}
              className="opacity-60 !px-4"
            >
              Cancel
            </ThemedButton>
            <ThemedButton
              disabled={!newWorkspaceName || loading}
              size="sm"
              variant="primary"
              onClick={() => {
                if (isRename) {
                  renameWorkspace();
                  return;
                }
                createNewWorkspace();
              }}
              className="!px-4"
            >
              {loading ? "Please wait.." : isRename ? "Rename" : "Create"}
            </ThemedButton>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default CreateWorkspace;
