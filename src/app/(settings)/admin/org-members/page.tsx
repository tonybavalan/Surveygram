"use client";

import ThemedButton from "@/components/themed-components/Buttons";

const OrgMembers = () => {
  return (
    <div className="settings-layout--wrapper">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="font-medium">Organization Members</h6>
          <p>Invite People and assign organization roles</p>
        </div>
        <div>
          <ThemedButton
            size="sm"
            variant="primary"
            className="!px-4"
          >
            Add Members
          </ThemedButton>
        </div>
      </div>
    </div>
  );
};

export default OrgMembers;
