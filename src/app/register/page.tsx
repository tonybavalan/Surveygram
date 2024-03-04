"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ThemedButton from "@/components/themed-components/Buttons";
import { CheckBox, TextField } from "@/components/themed-components/Inputs";
import Tabs from "@/components/themed-components/Tabs";
import "./register.scss";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { ROUTES_CONSTANT } from "@/lib/routesConstants";
import { API_TYPES, REGEX } from "@/lib/constants";
import {
  commonGetService,
  commonService,
  setCookie,
  showErrorMessage,
  showSuccessMessage,
  useValidateForm,
} from "@/lib/utils";
import { API_ROUTES } from "@/lib/api-routes";
import { tabOptions } from "@/lib/constants";

const validateType = [
  {
    name: "name",
    isRequired: true,
  },
  {
    name: "email",
    isRequired: true,
    matchPattern: REGEX.email,
  },
  {
    name: "password",
    isRequired: true,
    matchPattern: REGEX.password,
  },
];

const Register: React.FC = () => {
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState<number>(0);
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    password: "",
  });
  const { validateOnChange, validateOnSubmit, errors } = useValidateForm(
    formData,
    validateType
  );
  const [agreedTerms, setAgreedTerms] = useState<boolean>(false);

  const [registerSuccessful, setRegisterSuccessfull] = useState<boolean>(false);

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event?.target.name]: event?.target.value });
  };

  const googleRegister = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await commonService(
          `${API_ROUTES.AUTH_GOOGLE_LOGIN}?token=${tokenResponse.access_token}`,
          API_TYPES.GET
        );
        if (response?.status === 200) {
          setCookie("token", response?.data.data.token, 20);
          setCookie("user_profile", JSON.stringify(response?.data.data), 20);
          commonGetService(API_ROUTES.GET_ALL_WORKSPACES)
            .then(async (data: any) => {
              if (
                !data.data ||
                (Array.isArray(data.data) && data.data.length === 0)
              ) {
                const createWorkspaceResponse = await commonService(
                  API_ROUTES.CREATE_WORKSPACE,
                  API_TYPES.POST,
                  { workspaceName: "My Workspace", isDisable: false }
                );

                if (createWorkspaceResponse?.status === 200) {
                  router.push(
                    `${ROUTES_CONSTANT.WORKSPACE}?identify=${
                      createWorkspaceResponse.data.data
                    }&workspaceName=${encodeURIComponent("My workspace")}`
                  );
                }
              } else {
                router.push(
                  `${ROUTES_CONSTANT.WORKSPACE}?identify=${
                    data.data[0].id
                  }&workspaceName=${encodeURIComponent(
                    data.data[0].workspaceName
                  )}`
                );
              }
            })
            .catch((err: any) => {
              console.log(err);
            });
        }
      } catch (err) {
        console.log(err);
      }
    },
    onError: (errResponse) => console.log(errResponse),
  });

  const onSubmit = async () => {
    try {
      if (validateOnSubmit()) {
        const response = await commonService(
          API_ROUTES.AUTH_REGISTER,
          API_TYPES.POST,
          formData
        );
        if (response?.status === 200) {
          showSuccessMessage(response.data.message);
          setRegisterSuccessfull(true);
        }
      }
    } catch (err) {
      console.log(err);
      showErrorMessage("Something went wrong");
    }
  };

  return (
    <MaxWidthWrapper>
      {!registerSuccessful ? (
        <div className="auth-layout--main mt-3">
          <div className="auth-header flex items-center justify-end">
            <p className="me-3">Already an user ?</p>
            <ThemedButton
              variant="outlined"
              size="sm"
              onClick={() => router.push(ROUTES_CONSTANT.LOGIN)}
              type="button"
            >
              Log in
            </ThemedButton>
          </div>
          <div className="auth-layout--main max-w-md mx-auto mt-[3rem]">
            <h4 className="text-center">Creating new account</h4>
            <p className="title text-center">
              Build your survey in few minutes
            </p>

            <div className="auth-form mt-4">
              <Tabs
                options={tabOptions}
                selected={currentTab}
                onTabChange={setCurrentTab}
                className="my-4"
              />

              <TextField
                label="Name"
                className="mb-4"
                type="text"
                placeholder="eg: Alexander"
                name="name"
                onChange={(e) => {
                  handleChange(e);
                  validateOnChange(e);
                }}
                errorMessage={errors?.name?.empty ? "Please enter name" : ""}
              />
              <TextField
                label="Email"
                className="mb-4"
                type="email"
                placeholder="example@example.com"
                name="email"
                pattern={String(REGEX.email)}
                onChange={(e) => {
                  handleChange(e);
                  validateOnChange(e);
                }}
                errorMessage={
                  errors?.email?.invalid
                    ? "Please enter valid email ID"
                    : errors?.email?.empty
                    ? "Please enter email ID"
                    : ""
                }
              />
              <TextField
                label="Password"
                type="password"
                className="mb-4"
                placeholder="At least 8 characters"
                name="password"
                onChange={(e) => {
                  handleChange(e);
                  validateOnChange(e);
                }}
                errorMessage={
                  errors?.password?.invalid
                    ? "Password must contains one uppercase one lowercase one special character"
                    : errors?.password?.empty
                    ? "Please enter password"
                    : ""
                }
              />
              <CheckBox
                className="mb-3"
                onChange={(e) => setAgreedTerms(e.target.checked)}
                label="I agree to Surveygram’s Terms of Service"
              />

              <ThemedButton
                type="button"
                variant="primary"
                className="w-full"
                size="lg"
                disabled={!agreedTerms}
                onClick={onSubmit}
              >
                Sign up
              </ThemedButton>
              <p className="my-5 text-center">Or</p>
              <ThemedButton
                onClick={() => googleRegister()}
                type="button"
                variant="outlined"
                className="w-full mb-4"
                size="lg"
              >
                Sign up with Google
              </ThemedButton>
              <ThemedButton
                type="button"
                variant="outlined"
                className="w-full"
                size="lg"
              >
                Sign up with Microsoft
              </ThemedButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="signup-success max-w-sm">
          <div>
            <h4 className="text-center mb-3">Surveygram</h4>
            <p className="text-center">
              We sent a email to <b>{formData.email}</b>. Check your inbox to
              activate your account.
            </p>
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default Register;
