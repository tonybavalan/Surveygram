"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import share from "../../../../public/icons/others/share.svg";
import Image from "next/image";
import { ArrowUpDown, Grid3x3Icon, List, MoreHorizontal } from "lucide-react";
import ThemedButton from "@/components/themed-components/Buttons";
import { TextField } from "@/components/themed-components/Inputs";
import ShareModal from "@/components/ShareModel";
import { useRouter, useSearchParams } from "next/navigation";
import CreateWorkspace from "@/components/createWorkspace";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllWorkspace } from "@/providers/Reducers/workspace";
import {
  commonService,
  showErrorMessage,
  showSuccessMessage,
} from "@/lib/utils";
import { ROUTES_CONSTANT } from "@/lib/routesConstants";
import { API_ROUTES } from "@/lib/api-routes";
import { API_TYPES, SURVEY_TAB_LIST } from "@/lib/constants";
import { useEffect, useState } from "react";
import { fetchTeamWorkspaces } from "@/providers/Reducers/teamWorkspace";
import SurveyGrid from "@/components/SurveyGrid";
import CreateSurveyModal from "@/components/createSurveyModal";

const Workspace = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpenChange } = useDisclosure();
  const { isOpen: openShareModal, onOpenChange: onOpenShareChange } =
    useDisclosure();
  const { isOpen: openRenameModal, onOpenChange: onOpenRenameChange } =
    useDisclosure();
  const { isOpen: openWorkspace, onOpenChange: onOpenWorkspace } =
    useDisclosure();
  const router = useRouter();
  const [selectedSurvey, setSelectedSurvey] = useState<any>(null);
  const searchParams = useSearchParams();
  const workspaceName = searchParams.get("name");
  const workspaceId = searchParams.get("identify");
  const isTeamWorkspace = searchParams.get("isTeam");
  const [confirmName, setConfirmName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showInGrid, setShowInGrid] = useState<boolean>(false);
  const [showCreateSurveyModal, setShowCreateSurveyModal] =
    useState<boolean>(false);
  const [surveyList, setSurveyList] = useState<any[]>([]);
  const [activeSurvey, setActiveSurvey] = useState<string>("DRAFT");
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const { data: teamWorkspaces, error: teamError } = useSelector(
    (state: any) => state.teamWorkspace
  );

  const deleteWorkspace = async (isTeam: string | null) => {
    try {
      setLoading(true);
      const response = await commonService(
        `${
          isTeam
            ? API_ROUTES.DELETE_TEAM_WORKSPACE
            : API_ROUTES.DELETE_WORKSPACE
        }${workspaceId}`,
        API_TYPES.DELETE
      );
      if (response.status === 200) {
        showSuccessMessage(response.data.message);
        if (!isTeam) {
          // @ts-ignore
          dispatch(fetchAllWorkspace());
        } else {
          // @ts-ignore
          dispatch(fetchTeamWorkspaces());
        }
        onOpenChange();
        router.push(ROUTES_CONSTANT.WORKSPACE);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getTeamMemberList = (id: any) => {
    if (isTeamWorkspace) {
      const members = teamWorkspaces.filter((x: any) => x.id === +id);
      if (members.length > 0) {
        return members[0].teamMembers;
      }
    }
    return [];
  };

  const getAllSurveys = async () => {
    try {
      const response = await commonService(
        API_ROUTES.GET_ALL_SURVEYS(workspaceId, 1, 10),
        API_TYPES.GET
      );
      if (response.status === 200) {
        setSurveyList(response.data.surveyRecordSummary);
      }
    } catch (err) {
      console.log(err);
      showErrorMessage("Something went wrong!");
    }
  };

  const toggleSurveyView = () => setShowInGrid(!showInGrid);
  const handleToggleModal = () =>
    setShowCreateSurveyModal(!showCreateSurveyModal);

  const renameSurvey = async () => {
    try {
      const response = await commonService(
        API_ROUTES.RENAME_SURVEY(
          workspaceId,
          selectedSurvey?.id,
          selectedSurvey.surveyName
        ),
        API_TYPES.PUT
      );
      if (response.status === 200) {
        getAllSurveys();
        showSuccessMessage(response.data.message);
        onOpenRenameChange();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSurvey = async (survey: any) => {
    try {
      setDeleteLoading(true);
      const response = await commonService(
        API_ROUTES.DELETE_SURVEY(workspaceId, survey.id),
        API_TYPES.PUT
      );
      if (response.status === 200) {
        showSuccessMessage(response.data.message);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    getAllSurveys();
  }, []);

  const setActiveTab = (active: string) => {
    setActiveSurvey(active);
  };

  return (
    <div className="workspace-main--wrapper">
      <div className="workspace-main--header flex items-center justify-between w-full p-4">
        <div className="flex items-center">
          <p className="me-3">{workspaceName}</p>
          <Button variant="light" className="px-2" onClick={onOpenShareChange}>
            <Image src={share} alt="share" width={15} height={15} />
            Share
          </Button>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" className="!px-2 gap-unit-0">
                <MoreHorizontal />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions">
              <DropdownItem
                key={"rename"}
                onClick={onOpenWorkspace}
                color={"default"}
              >
                Rename Workspace
              </DropdownItem>
              <DropdownItem
                onClick={onOpenChange}
                key={"delete"}
                color={"danger"}
                className={"text-danger"}
              >
                Delete Workspace
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          <ThemedButton
            onClick={handleToggleModal}
            size="sm"
            className="!px-5"
            variant="primary"
          >
            Create Survey
          </ThemedButton>
        </div>
      </div>
      <div className="workspace-main--survey-container">
        <div className="workspace-main--survey-header flex !px-5">
          <ul>
            {SURVEY_TAB_LIST.map((type: any, index: number) => {
              return (
                <li
                  key={`${type.name}-${index}`}
                  onClick={() => setActiveTab(type.type)}
                  className={activeSurvey === type.type ? "font-medium" : ""}
                >
                  {type.name}
                </li>
              );
            })}
          </ul>
          <div className="survey-list--view-options ms-auto flex">
            <div className="flex me-2">
              <label className="flex me-1 items-center">
                <ArrowUpDown width={15} className="me-1" />
                Sort By:
              </label>
              <select className="bg-transparent">
                <option>Newest first</option>
                <option>Oldest first</option>
              </select>
            </div>
            <Button
              variant="light"
              onClick={toggleSurveyView}
              className="!px-2 gap-unit-0"
            >
              <Grid3x3Icon className="me-2" />
              Grid
            </Button>
            <Button
              onClick={toggleSurveyView}
              variant="light"
              className="!px-2 gap-unit-0"
            >
              <List className="me-2" />
              List
            </Button>
          </div>
        </div>
        <div className="workspace-main--survey-content p-5">
          <SurveyGrid
            showGrid={showInGrid}
            surveyData={surveyList}
            onRename={(survey) => {
              setSelectedSurvey(survey);
              onOpenRenameChange();
            }}
            workspaceId={workspaceId}
            onDelete={(survey) => deleteSurvey(survey)}
            surveyType={activeSurvey}
          />
        </div>
      </div>

      {/* Share Workspace Modal */}
      <ShareModal
        isOpen={openShareModal}
        teamMembers={getTeamMemberList(workspaceId)}
        onOpenChange={onOpenShareChange}
      />
      {/* Delete Workspace Modal */}
      <Modal
        className="rounded-none"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Delete this workspace
          </ModalHeader>
          <ModalBody>
            <p>You’ll lose access to all surveygram in it</p>
            <p className="font-bold">{workspaceName}</p>
            <p>We can’t recover them-they’ll be gone forever</p>
            <TextField
              name="workspaceName"
              placeholder="Workspace name"
              onChange={(e) => setConfirmName(e.target.value)}
              label="Enter the workspace name to confirm"
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
              disabled={confirmName !== workspaceName || loading}
              size="sm"
              variant="primary"
              className="!px-4"
              onClick={() => deleteWorkspace(isTeamWorkspace)}
            >
              {loading ? "Please wait.." : "Delete"}
            </ThemedButton>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <CreateWorkspace
        isOpen={openWorkspace}
        isRename={true}
        isTeam={isTeamWorkspace}
        onOpenChange={onOpenWorkspace}
        onWorkspaceAdd={() => {
          if (isTeamWorkspace) {
            // @ts-ignore
            dispatch(fetchTeamWorkspaces());
          } else {
            // @ts-ignore
            dispatch(fetchAllWorkspace());
          }
        }}
      />

      <Modal size={"lg"} isOpen={openRenameModal} onClose={onOpenRenameChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Bring your new form to life
          </ModalHeader>
          <ModalBody>
            <TextField
              name="surveyName"
              value={selectedSurvey?.surveyName || ""}
              placeholder="Enter survey name"
              onChange={(e) =>
                setSelectedSurvey({
                  ...selectedSurvey,
                  surveyName: e.target.value,
                })
              }
              label="Give it a name"
              inputClassName="!p-3"
            />
          </ModalBody>
          <ModalFooter>
            <ThemedButton
              size="sm"
              onClick={renameSurvey}
              className="!px-5"
              variant="primary"
            >
              Continue
            </ThemedButton>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Create Survey */}
      <CreateSurveyModal
        showTemplate={showCreateSurveyModal}
        onTemplateClose={() => setShowCreateSurveyModal(false)}
        workspaceId={workspaceId}
      />
    </div>
  );
};

export default Workspace;
