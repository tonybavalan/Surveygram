"use client";

import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { TextField } from "./themed-components/Inputs";
import { useEffect, useState } from "react";
import { ThemedSelect } from "./themed-components/Select";
import ThemedButton from "./themed-components/Buttons";
import {
  commonService,
  showErrorMessage,
  showSuccessMessage,
} from "@/lib/utils";
import { API_ROUTES } from "@/lib/api-routes";
import { API_TYPES, surveyTypeList } from "@/lib/constants";

const CreateSurveyModal = ({
  showTemplate,
  onTemplateClose,
  workspaceId,
}: {
  showTemplate: boolean;
  onTemplateClose: () => void;
  workspaceId: string | null;
}) => {
  const { isOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState<any>({
    surveyName: "",
    surveyType: "",
  });

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const createSurvey = async () => {
    try {
      const response = await commonService(
        API_ROUTES.CREATE_SURVEY(workspaceId),
        API_TYPES.POST,
        formData
      );
      if (response.status === 200) {
        showSuccessMessage(response.data.message);
      }
    } catch (err) {
      console.log(err);
      showErrorMessage("Something went wrong");
    }
  };

  return (
    <div className="create-survey--main">
      <Modal size={"2xl"} isOpen={showTemplate} onClose={onTemplateClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Create a new form
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-3 gap-5">
              <div onClick={onOpenChange}>
                <Card className="w-[200px] shadow-none space-y-3 p-4 cursor-pointer">
                  <div className="h-24 rounded-lg bg-default-300"></div>
                  <div className="space-y-1">
                    <p className="font-medium">Start from scratch</p>
                    <p className="text-sm">
                      Jump right in and build something beautiful
                    </p>
                  </div>
                </Card>
              </div>
              <Card className="w-[200px] shadow-none space-y-3 p-4">
                <div className="h-24 rounded-lg bg-default-300"></div>
                <div className="space-y-1">
                  <p className="font-medium">Use a template</p>
                  <p className="text-sm">
                    Pick a premade form and customize it as you please
                  </p>
                </div>
              </Card>
              <Card className="w-[200px] shadow-none space-y-3 p-4">
                <div className="h-24 rounded-lg bg-default-300"></div>
                <div className="space-y-1">
                  <p className="font-medium">Create With A.I</p>
                  <p className="text-sm">Save time and create forms faster</p>
                </div>
              </Card>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onTemplateClose}>
              Close
            </Button>
            <Button color="primary">Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal size={"lg"} isOpen={isOpen} onClose={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Bring your new form to life
          </ModalHeader>
          <ModalBody>
            <TextField
              name="surveyName"
              value={formData.surveyName}
              placeholder="Enter survey name"
              onChange={handleChange}
              label="Give it a name"
              inputClassName="!p-3"
            />
            <ThemedSelect
              label="What are you creating?"
              inputClassName="!p-3"
              className="text-sm"
            >
              <option selected disabled>
                Select form type
              </option>
              {surveyTypeList.map((type, index) => {
                return (
                  <option key={`${type}-${index}`} value={type}>
                    {type}
                  </option>
                );
              })}
            </ThemedSelect>
          </ModalBody>
          <ModalFooter>
            <ThemedButton
              onClick={createSurvey}
              size="sm"
              className="!px-5"
              variant="primary"
            >
              Continue
            </ThemedButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateSurveyModal;
