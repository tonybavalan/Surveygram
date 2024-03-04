"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ThemedButton from "@/components/themed-components/Buttons";
import { TextField } from "@/components/themed-components/Inputs";
import { API_ROUTES } from "@/lib/api-routes";
import { API_TYPES, REGEX } from "@/lib/constants";
import { commonService } from "@/lib/utils";
import { useState } from "react";

const ForgotPassword: React.FC = () => {
  const [resetLinkSent, setResetLinkSent] = useState<boolean>(false);
  const [email, setEmail] = useState("");

  const sendResetMail = async () => {
    try {
      const response = await commonService(
        `${API_ROUTES.SEND_RESET_MAIL}?emailId=${email}`,
        API_TYPES.POST
      );

      if (response?.status === 200) {
        setResetLinkSent(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <MaxWidthWrapper className="flex items-center">
      {resetLinkSent ? (
        <div className="max-w-sm mx-auto text-center">
          <h4 className="mb-3">Password Reset</h4>
          <p className="title">
            Password reset instructions have been emailed to you, follow the
            link in the email to continue.
          </p>
        </div>
      ) : (
        <div className="forgot-password--layout max-w-sm mx-auto">
          <h4 className="text-center mb-[2.5rem]">Surveygram</h4>
          <TextField
            type="text"
            label="Email"
            placeholder="example@example.com"
            className="mb-2 w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="title mb-5">
            Type the address linked to your account and we’ll send you password
            reset instructions
          </p>
          <ThemedButton
            variant="primary"
            size="lg"
            disabled={!email || !REGEX.email.test(email)}
            onClick={sendResetMail}
            className="w-full"
          >
            Send
          </ThemedButton>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default ForgotPassword;
