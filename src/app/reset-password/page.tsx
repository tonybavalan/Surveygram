"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ThemedButton from "@/components/themed-components/Buttons";
import { TextField } from "@/components/themed-components/Inputs";

const ResetPassword: React.FC = () => {
  return (
    <MaxWidthWrapper className="flex items-center">
      <div className="reset-password--layout max-w-sm mx-auto">
        <h4 className="text-center mb-[2.5rem]">Reset Passowrd</h4>

        <TextField
          type="password"
          label="New Password"
          className="mb-2 w-full"
        />
        <TextField
          type="password"
          label="Repeat Password"
          className="mb-2 w-full"
        />

        <ThemedButton variant="primary" size="lg" className="w-full">
          Reset Password
        </ThemedButton>
      </div>
    </MaxWidthWrapper>
  );
};

export default ResetPassword;
