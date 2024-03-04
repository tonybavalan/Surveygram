"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import ThemedButton from "./themed-components/Buttons";
import { ThemedSelect } from "./themed-components/Select";
import { commonService, showSuccessMessage } from "@/lib/utils";
import { API_ROUTES } from "@/lib/api-routes";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { API_TYPES } from "@/lib/constants";

const ShareModal = ({
  isOpen,
  onOpenChange,
  teamMembers = [],
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  teamMembers?: any[];
}) => {
  const searchParams = useSearchParams();
  const workspaceName = searchParams.get("name");
  const [loading, setLoading] = useState<boolean>(false);

  const [userInvite, setUserInvite] = useState({
    email: "",
    role: "EDIT",
  });

  const addTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await commonService(
        `${API_ROUTES.SHARE_WORKSPACE(
          workspaceName,
          userInvite.email
        )}?sharedUserRole=${userInvite.role}`,
        API_TYPES.POST
      );
      if (response.status === 200) {
        showSuccessMessage(response.data.message);
        onOpenChange();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: any) => {
    setUserInvite({ ...userInvite, [event.target.name]: event.target.value });
  };
  return (
    <Modal
      size="xl"
      className="rounded-none"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 border-b-1">
            Adding users to workspaces
          </ModalHeader>
          <ModalBody className="p-0 py-2">
            <div className="share-input--main flex items-center gap-2 py-5 border-b-1 px-6">
              <div className="share-input w-full flex">
                <input
                  type="email"
                  className="w-full"
                  name="email"
                  onChange={handleChange}
                  placeholder="Add workspace member by email"
                />
                <select onChange={handleChange} name="role">
                  <option value={"EDII"}>Can edit</option>
                  <option value={"VIEW"}>Can view</option>
                </select>
              </div>
              <ThemedButton
                size="sm"
                variant="primary"
                className="text-sm !px-3"
                disabled={loading}
                onClick={addTeamMembers}
              >
                {loading ? "Please wait..." : "Invite"}
              </ThemedButton>
            </div>
            <div className="flex justify-between px-6 border-b-1 pb-3">
              <p className="font-medium">Workspace members (1)</p>
              <select>
                <option disabled selected>
                  Role
                </option>
                <option>Admin</option>
                <option>Owner</option>
              </select>
            </div>
            <div className="shared-people--list  pb-5">
              {teamMembers &&
                teamMembers.map((team: any, index: number) => {
                  return (
                    <div key={team.user.id} className="shared-people py-5 flex items-center justify-between border-b-1 px-6">
                      <div className="flex items-center">
                        <div
                          style={{
                            backgroundColor: "#000",
                            height: 30,
                            width: 30,
                          }}
                          className="me-3"
                        ></div>
                        <div className="grid">
                          <p>{team.user.name}</p>
                          <span>{team.user.email}</span>
                        </div>
                      </div>
                      <ThemedSelect className="text-sm">
                        <option>Owner</option>
                        <option>Admin</option>
                      </ThemedSelect>
                    </div>
                  );
                })}
            </div>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
