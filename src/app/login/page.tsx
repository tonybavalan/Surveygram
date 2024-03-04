"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ThemedButton from "@/components/themed-components/Buttons";
import { TextField } from "@/components/themed-components/Inputs";
import "./login.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES_CONSTANT } from "@/lib/routesConstants";
import {
  commonGetService,
  commonService,
  setCookie,
  showErrorMessage,
  useValidateForm,
} from "@/lib/utils";
import { API_ROUTES } from "@/lib/api-routes";
import { API_TYPES, REGEX } from "@/lib/constants";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

const validateType = [
  {
    name: "username",
    isRequired: true,
    matchPattern: REGEX.email,
  },
  {
    name: "password",
    isRequired: true,
  },
];

const Login: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { validateOnChange, validateOnSubmit, errors } = useValidateForm(
    formData,
    validateType
  );

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await commonService(
          `${API_ROUTES.AUTH_GOOGLE_LOGIN}?token=${tokenResponse.access_token}`,
          API_TYPES.GET
        );
        if (response?.status === 200) {
          setCookie("token", response?.data.data.token, 20);
          setCookie("user_profile", JSON.stringify(response?.data.data), 20);
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    },
    onError: (errResponse) => console.log(errResponse),
  });

  const onLogin = async () => {
    try {
      if (validateOnSubmit()) {
        const response = await commonService(
          API_ROUTES.AUTH_LOGIN,
          API_TYPES.POST,
          formData
        );

        if (response?.status === 200 && response.data.data) {
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
        } else {
          showErrorMessage(response?.data.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
    // setCookie("token", "asdsdasdsda", 20);
    // window.location.reload();
  };

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event?.target.name]: event?.target.value });
  };

  return (
    <MaxWidthWrapper>
      <div className="auth-layout--main mt-3">
        <div className="auth-header flex items-center justify-end">
          <p className="me-3">{`Don't have an account ?`}</p>
          <ThemedButton
            variant="outlined"
            size="sm"
            onClick={() => router.push(ROUTES_CONSTANT.REGISTER)}
            type="button"
          >
            Sign up
          </ThemedButton>
        </div>
        <div className="auth-layout--main max-w-md mx-auto mt-[3rem]">
          <h4>Log in to Surveygram</h4>
          <p className="title">Build your survey in few minutes</p>

          <div className="auth-form mt-4">
            <TextField
              label="Email"
              className="mb-4"
              type="email"
              name="username"
              onChange={(e) => {
                handleChange(e);
                validateOnChange(e);
              }}
              placeholder="example@example.com"
              errorMessage={
                errors?.username?.invalid
                  ? "Please enter valid email ID"
                  : errors?.username?.empty
                  ? "Please enter email ID"
                  : ""
              }
            />
            <TextField
              label="Password"
              name="password"
              onChange={(e) => {
                handleChange(e);
                validateOnChange(e);
              }}
              type="password"
              className="mb-4"
              placeholder="At least 8 characters"
              errorMessage={
                errors?.password?.empty ? "Please enter password" : ""
              }
            />

            <Link
              href={ROUTES_CONSTANT.FORGOT_PASSWORD}
              className="float-end mb-8 title"
            >
              Forgot Password?
            </Link>
            <ThemedButton
              type="button"
              variant="primary"
              className="w-full"
              size="lg"
              onClick={onLogin}
            >
              Log in
            </ThemedButton>
            <p className="my-5 text-center">Or</p>
            <ThemedButton
              type="button"
              variant="outlined"
              className="w-full mb-4"
              size="lg"
              onClick={() => googleLogin()}
            >
              Log in with Google
            </ThemedButton>
            <ThemedButton
              type="button"
              variant="outlined"
              className="w-full"
              size="lg"
            >
              Log in with Microsoft
            </ThemedButton>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Login;
