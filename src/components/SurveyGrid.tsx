"use client";

import { API_ROUTES } from "@/lib/api-routes";
import { API_TYPES } from "@/lib/constants";
import { commonService, showSuccessMessage } from "@/lib/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
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
  useDropdown,
} from "@nextui-org/react";
import { ArrowRight, ChevronRight, MoreHorizontal } from "lucide-react";
import moment from "moment";
import { useRef, useState } from "react";
import ThemedButton from "./themed-components/Buttons";

interface SurveyGrid {
  showGrid: boolean;
  surveyData: any[];
  onRename: (obj: any) => void;
  onDelete: (id: string | null) => void;
  workspaceId: string | null;
  surveyType: string;
}

const SurveyGrid = ({
  showGrid,
  surveyData = [],
  onRename,
  onDelete,
  workspaceId,
  surveyType,
}: SurveyGrid) => {
  const [selectedSurvey, setSelectedSurvey] = useState<any>(null);
  const { isOpen, onOpenChange } = useDisclosure();

  const getFilteredSurvey = (survey: any[]) => {
    return survey.filter((x) => x.surveyRecordStatus === surveyType);
  };

  const numberOfDropdowns = getFilteredSurvey(surveyData).length; // For example, 3 dropdowns

  // Initialize dropdown states using useDropdown hook
  // const dropdowns = Array.from({ length: numberOfDropdowns }, () =>
  //   useDropdown(DropD)
  // );

  const duplicateSurvey = async (surveyId: string | null) => {
    try {
      const response = await commonService(
        API_ROUTES.CREATE_DUPLICATE_SURVEY(workspaceId, surveyId),
        API_TYPES.POST
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getDisabledKeys = () => {
    if (surveyType === "DELETED") {
      return ["delete", "duplicate", "share", "result", "rename", "open"];
    }
    return [];
  };
  return (
    <div className="survey-grid-list--content">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Delete this survey ?
          </ModalHeader>
          <ModalBody>
            <p>
              You’re about to delete{" "}
              <span className="font-medium inline-block">
                {selectedSurvey?.surveyName || ""}
              </span>
            </p>
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
              size="sm"
              variant="primary"
              className="!px-4"
              onClick={() => onDelete(selectedSurvey)}
            >
              Delete
            </ThemedButton>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {!showGrid ? (
        <table className="survey-list--table w-full">
          <thead>
            <tr>
              <th className="w-[55%] text-start">Surveys</th>
              <th>Questions</th>
              <th>Responses</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {getFilteredSurvey(surveyData) &&
              getFilteredSurvey(surveyData).length > 0 &&
              getFilteredSurvey(surveyData).map((survey, index) => {
                return (
                  <tr className="mb-3" key={`${survey.surveyName}-${index}`}>
                    <td>
                      <div className="survey-list--media flex items-center">
                        <div className="media">A</div>
                        <div className="leading-[18px] ms-3">
                          <p>{survey.surveyName}</p>
                          <span>
                            Created:{" "}
                            {moment(survey.createdDate).format("DD MMM YYYY")}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{survey.numberOfQuestions}</td>
                    <td>{survey.numberOfResponses}</td>
                    <td>{moment(survey.updatedDate).format("DD MMM YYYY")}</td>
                    <td>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="light" className="!px-2 gap-unit-0">
                            <MoreHorizontal />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          variant="faded"
                          aria-label="Dropdown menu with description"
                          disabledKeys={getDisabledKeys()}
                        >
                          <DropdownItem key="open" showDivider>
                            Open
                          </DropdownItem>
                          <DropdownItem key="result">Results</DropdownItem>
                          <DropdownItem key="share">Share</DropdownItem>
                          <DropdownItem
                            key="rename"
                            onClick={() => onRename(survey)}
                          >
                            Rename
                          </DropdownItem>
                          <DropdownItem
                            key="duplicate"
                            onClick={() => duplicateSurvey(survey.id)}
                          >
                            Duplicate
                          </DropdownItem>
                          <DropdownItem
                            key="move_to"
                            //  onPress={() => dropdowns[index].toggle()}
                            showDivider
                          >
                            <div className="flex justify-between">
                              Move to <ChevronRight className="w-[20px]" />
                            </div>
                          </DropdownItem>
                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            onClick={() => {
                              setSelectedSurvey(survey);
                              onOpenChange();
                            }}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            variant="light"
                            ref={(ref) => {
                              //@ts-ignore
                              dropdownRef.current[index] = ref;
                            }}
                          ></Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem key="new">New file</DropdownItem>
                          <DropdownItem key="copy">Copy link</DropdownItem>
                          <DropdownItem key="edit">Edit file</DropdownItem>
                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                          >
                            Delete file
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <div className="survey-grid--content">
          <div className="grid grid-cols-4 gap-4">
            {getFilteredSurvey(surveyData) &&
              getFilteredSurvey(surveyData).length > 0 &&
              getFilteredSurvey(surveyData).map((survey, index) => {
                return (
                  <div className="survey-grid-box" key={`${survey.surveyName}-${index}`}>
                    <Card
                      key={`${survey.surveyName}-${index}`}
                      className="max-w-[400px]"
                    >
                      <CardBody className="h-[100px] flex items-center justify-center">
                        <p>{survey.surveyName}</p>
                      </CardBody>
                      <Divider />
                      <CardFooter className="p-2 px-4 flex justify-between">
                        <p className="grid-footer-response">0 Response</p>
                        <Button variant="light" className="!px-2 gap-unit-0">
                          <MoreHorizontal />
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
export default SurveyGrid;
