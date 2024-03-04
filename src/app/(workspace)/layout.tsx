"use client";

import AppHeader from "@/components/app-layout/AppHeader";

import { ChevronDown, ChevronUp, PlusIcon, SearchIcon } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import "./dashboard.scss";
import ThemedButton from "@/components/themed-components/Buttons";
import { Skeleton, useDisclosure } from "@nextui-org/react";

import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES_CONSTANT } from "@/lib/routesConstants";
import CreateWorkspace from "@/components/createWorkspace";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllWorkspace } from "@/providers/Reducers/workspace";
import { fetchTeamWorkspaces } from "@/providers/Reducers/teamWorkspace";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceName = searchParams.get("name");
  const workspaceId = searchParams.get("identify");
  const dispatch = useDispatch();
  const {
    loading,
    data: workspaceList,
    error,
  } = useSelector((state: any) => state.workspace);

  const {
    data: teamWorkspaces,
    loading: teamLoading,
    error: teamError,
  } = useSelector((state: any) => state.teamWorkspace);

  const [activeIndex, setActiveIndex] = useState<any[]>([0]);

  const { isOpen, onOpenChange } = useDisclosure();

  const handleClick = (index: number) => {
    const indexPresent = activeIndex.indexOf(index);
    if (indexPresent > -1) {
      setActiveIndex(activeIndex.filter((x) => x !== index));
    } else {
      setActiveIndex([...activeIndex, index]);
    }
  };

  const checkActive = (index: number) => {
    return activeIndex.indexOf(index) > -1;
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchAllWorkspace());
    // @ts-ignore
    dispatch(fetchTeamWorkspaces());
  }, []);

  const navigateToWorkspace = (workspaceName: string, workspaceId: string) => {
    // router.push()
  };

  return (
    <div className="main-app--layout">
      <div className="main-app--header">
        <AppHeader />
      </div>
      <div className="main-app--layout mt-[60px]">
        <div className="main-app--sidebar p-5">
          <div className="workspace-search relative w-full">
            <div className="workspace--search-icon">
              <SearchIcon />
            </div>
            <input type="search" placeholder="Find Workspace" />
          </div>
          <div className="workspace-list--type mt-[3rem]">
            <div className="workspace-list--dropdown mb-5">
              <div className="workspace-dropdown--title">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleClick(0)}
                >
                  {checkActive(0) ? (
                    <ChevronDown className="me-3" />
                  ) : (
                    <ChevronUp className="me-3" />
                  )}
                  <span>PRIVATE</span>
                </div>
                <ThemedButton size="sm" onClick={onOpenChange} variant="light">
                  <PlusIcon />
                </ThemedButton>
              </div>
              {checkActive(0) && (
                <div className="workspace-dropdown--content  my-4 pb-4">
                  {loading ? (
                    <div className="w-full">
                      <Skeleton className="h-3  rounded-lg mb-3" />
                      <Skeleton className="h-3  rounded-lg" />
                    </div>
                  ) : (
                    workspaceList.length > 0 &&
                    workspaceList.map((workspace: any, index: any) => {
                      return (
                        <div
                          key={`${workspace.workspaceName}-${index}`}
                          onClick={() =>
                            router.push(
                              `${
                                ROUTES_CONSTANT.WORKSPACE
                              }?name=${encodeURIComponent(
                                workspace.workspaceName
                              )}&identify=${workspace.id}`
                            )
                          }
                          className="flex justify-between items-center mb-3"
                        >
                          <p className="cursor-pointer">
                            {workspace.workspaceName}
                          </p>
                          <span>0</span>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
            <div className="workspace-list--dropdown mb-5">
              <div className="workspace-dropdown--title">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleClick(1)}
                >
                  {checkActive(1) ? (
                    <ChevronDown className="me-3" />
                  ) : (
                    <ChevronUp className="me-3" />
                  )}
                  <span>TEAM</span>
                </div>
                <ThemedButton
                  onClick={() => router.push(ROUTES_CONSTANT.TEAM_WORKSPACE)}
                  size="sm"
                  variant="light"
                >
                  <PlusIcon />
                </ThemedButton>
              </div>
              {checkActive(1) && (
                <div className="workspace-dropdown--content  my-4 pb-4">
                  {teamLoading ? (
                    <div className="w-full">
                      <Skeleton className="h-3  rounded-lg mb-3" />
                      <Skeleton className="h-3  rounded-lg" />
                    </div>
                  ) : (
                    teamWorkspaces &&
                    teamWorkspaces.map((workspace: any, index: number) => {
                      return (
                        <div
                          key={`${workspace.workspaceName}-${index}`}
                          className="flex justify-between items-center mb-3"
                          onClick={() =>
                            router.push(
                              `${
                                ROUTES_CONSTANT.WORKSPACE
                              }?name=${encodeURIComponent(
                                workspace.workspaceName
                              )}&identify=${workspace.id}&isTeam=true`
                            )
                          }
                        >
                          <p className="">{workspace.workspaceName}</p>
                          <span>0</span>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="main-app--content !p-0">
          {workspaceName && workspaceId ? children : null}
        </div>
        <CreateWorkspace
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          // @ts-ignore
          onWorkspaceAdd={() => dispatch(fetchAllWorkspace())}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
