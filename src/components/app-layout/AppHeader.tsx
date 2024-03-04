"use client";

import Image from "next/image";
import ThemedButton from "../themed-components/Buttons";
import { deleteCookie } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ROUTES_CONSTANT } from "@/lib/routesConstants";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

const AppHeader: React.FC = () => {
  const router = useRouter();

  const logOut = () => {
    deleteCookie("token");
    window.location.reload();
  };

  return (
    <div className="app-header--wrapper">
      <nav className="themed-navbar px-4 fixed top-0 left-0 z-10 w-full">
        <div className="company-details flex items-center">
          <Image
            src={"/next.svg"}
            alt="company logo"
            width={"50"}
            height={"50"}
            className="cursor-pointer"
            objectFit="contain"
            onClick={() => {router.push(ROUTES_CONSTANT.ADMIN_SETTINGS)}}
          />
          <p className="ms-2 text-sm text-white font-semibold">Company Name</p>
        </div>
        <div className="ml-auto flex">
          <ThemedButton
            type="button"
            className="w-full text-sm"
            size="sm"
            variant="light"
            onClick={() => {
              router.push(ROUTES_CONSTANT.ACCOUNT_PLAN);
            }}
          >
            View Plans
          </ThemedButton>
          <div className="company-profile">
          <Dropdown>
            <DropdownTrigger>
            <Image
              src={"/next.svg"}
              alt="company logo"
              width={"50"}
              height={"50"}
              objectFit="contain"
              className="ms-3 cursor-pointer"
            />
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions">
              <DropdownItem
                key={"rename"}
                color={"default"}
                onClick={() => {
                  router.push(ROUTES_CONSTANT.ACCOUNT_SETTINGS);
                }}
              >
                Account Settings
              </DropdownItem>
              <DropdownItem
                key={"delete"}
                color={"danger"}
                className={"text-danger"}
                onClick={logOut}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppHeader;
