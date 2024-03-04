"use client";

import CreateWorkspace from "@/components/createWorkspace";
import ThemedButton from "@/components/themed-components/Buttons";
import { API_ROUTES } from "@/lib/api-routes";
import { API_TYPES } from "@/lib/constants";
import { ROUTES_CONSTANT } from "@/lib/routesConstants";
import { commonService, getUserDetail, showSuccessMessage } from "@/lib/utils";
import { fetchTeamWorkspaces } from "@/providers/Reducers/teamWorkspace";

import { Button, Skeleton, useDisclosure } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddTeamWorkspace = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceName = searchParams.get("name");
  const {
    data: teamWorkspaces,
    loading,
    error,
  } = useSelector((state: any) => state.teamWorkspace);

  const dispatch = useDispatch();
  const { isOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchTeamWorkspaces());
  }, []);

  const joinWorkspace = async (workspace: string) => {
    try {
      const response = await commonService(
        `${API_ROUTES.JOIN_WORKSPACE(
          workspace,
          getUserDetail("email")
        )}?joinedUserRole=EDIT`,
        API_TYPES.POST
      );
      if (response.status === 200) {
        showSuccessMessage(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkIsMember = (team: any) => {
    console.log(getUserDetail("email"));
    const isExist = team.findIndex(
      (x: any) => x.user.email === getUserDetail("email")
    );
    return isExist > -1 ? true : false;
  };

  return (
    <div className="add-teamworkspace--wrapper">
      <div className="template--nav">
        <Button
          variant="light"
          onClick={() => router.push(ROUTES_CONSTANT.WORKSPACE)}
          className="px-2 text-white"
        >
          <ArrowLeft width={18} />
          Workspace
        </Button>
      </div>
      <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 min-h-screens mt-[3rem]">
        <h4>Add a new workspace</h4>
        <p className="mb-5">
          Collaborate on surveygrams by joining existing workspaces, or creating
          a new one.
        </p>
        <ThemedButton variant="primary" onClick={onOpenChange} size="md">
          Create Workspace
        </ThemedButton>

        <div className="team-workspace--grid mt-[4rem]">
          <div className=" grid grid-cols-3 gap-4">
            {loading &&
              [...new Array(5)].map((_, index) => {
                return (
                  <div className="workspace--card" key={index}>
                    <div className="flex justify-between mb-3">
                      <div
                        style={{
                          backgroundColor: "#000",
                          width: 30,
                          height: 30,
                        }}
                      ></div>
                      <Skeleton className="w-[45px] h-[40px]" />
                    </div>

                    <p>
                      <Skeleton className=" h-3 rounded-lg" />
                    </p>
                    <p className="text-xs">
                      Owners: <Skeleton className=" h-2 rounded-lg" />
                    </p>

                    <div className="contributors-list mt-5">
                      <div className="contributors bg-transparent">
                        <Skeleton className="h-[30px] w-[30px] rounded-large" />
                      </div>
                      <div className="contributors">
                        <Skeleton className="h-[30px] rounded-large w-[30px]" />
                      </div>
                      <div className="contributors">
                        <Skeleton className="h-[30px] rounded-large w-[30px]" />
                      </div>
                      <div className="contributors">
                        <Skeleton className="h-[30px] rounded-large w-[30px]" />
                      </div>
                      <div className="contributors">
                        <Skeleton className="h-[30px] rounded-large w-[30px]" />
                      </div>
                    </div>
                  </div>
                );
              })}

            {!loading &&
              teamWorkspaces?.length > 0 &&
              teamWorkspaces?.map((workspace: any, index: number) => {
                return (
                  <div
                    className="workspace--card"
                    key={`${workspace.workspaceName}-${index}`}
                  >
                    <div className="flex justify-between mb-3">
                      <div
                        style={{
                          backgroundColor: "#000",
                          width: 30,
                          height: 30,
                        }}
                      ></div>
                      {!checkIsMember(workspace.teamMembers) && (
                        <ThemedButton
                          onClick={() => joinWorkspace(workspace.workspaceName)}
                          variant="primary"
                          size="sm"
                        >
                          Join
                        </ThemedButton>
                      )}
                    </div>

                    <p>{workspace.workspaceName}</p>
                    <p className="text-xs">Owners: {workspace.ownerName}</p>

                    <div className="contributors-list mt-5">
                      {workspace.teamMembers &&
                        workspace.teamMembers.length > 0 &&
                        workspace.teamMembers.map(
                          (team: any, index: number) => {
                            if (index < 6) {
                              return (
                                <div
                                  key={`${team.user.name}-${index}`}
                                  className="contributors"
                                >
                                  {`${team.user.name
                                    .split(" ")[0]
                                    .split("")[0]
                                    .toUpperCase()}${team.user.name
                                    .split(" ")[1]
                                    .split("")[0]
                                    .toUpperCase()}
                                    `}
                                </div>
                              );
                            }
                          }
                        )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <CreateWorkspace
        isOpen={isOpen}
        isRename={false}
        isTeam={"true"}
        onOpenChange={onOpenChange}
        onWorkspaceAdd={() => {
          // @ts-ignore
          dispatch(fetchTeamWorkspaces());
        }}
      />
    </div>
  );
};

export default AddTeamWorkspace;
