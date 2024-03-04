"use client";

import ThemedButton from "@/components/themed-components/Buttons";
import { TextField } from "@/components/themed-components/Inputs";
import { API_ROUTES } from "@/lib/api-routes";
import { API_TYPES } from "@/lib/constants";
import { commonService, showSuccessMessage } from "@/lib/utils";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ROUTES_CONSTANT } from "@/lib/routesConstants";

const VerifyAccount = () => {
  const router = useRouter();
  const queryParams = useSearchParams();
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const email = queryParams.get("email");

  const activateAccount = async () => {
    try {
      setLoading(true);
      const response = await commonService(
        `${API_ROUTES.VERIFY_ACCOUNT}/${email}?verificationCode=${code}`,
        API_TYPES.POST
      );
      if (response?.status === 200) {
        showSuccessMessage(response.data.message);
        setTimeout(() => {
          router.push(ROUTES_CONSTANT.LOGIN);
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(true);
    }
  };

  return (
    <div className="verify-account--main">
      <div className="signup-success max-w-md">
        <div>
          <h4 className="text-center mb-3">Surveygram</h4>
          <p className="text-center mb-3">
            Please enter verification code which you received in your email
            account.
          </p>
          <TextField
            label="Verification Code"
            className="mb-4"
            type="text"
            name="code"
            onChange={(e) => setCode(e.target.value)}
          />
          <ThemedButton
            type="button"
            variant="primary"
            className="w-full"
            size="lg"
            disabled={loading}
            onClick={activateAccount}
          >
            {loading ? "Please wait.." : "Verify"}
          </ThemedButton>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
