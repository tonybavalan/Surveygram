"use client";

import AppHeader from "@/components/app-layout/AppHeader";
import { ROUTES_CONSTANT } from "@/lib/routesConstants";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const settingsNav = [
  {
    name: "admin",
    menus: [
      {
        name: "Admin Settings",
        link: ROUTES_CONSTANT.ADMIN_SETTINGS,
      },
      {
        name: "Org Members",
        link: ROUTES_CONSTANT.ORG_MEMBERS,
      },
    ],
  },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [menus, setMenus] = useState<any[]>([]);
  const router = useRouter();

  const isNavActive = (nav: string) => {
    return pathname === nav;
  };

  useEffect(() => {
    const currentLayout = pathname.split("/")[1];
    setMenus(settingsNav.filter((x) => x.name === currentLayout)[0]?.menus);
  }, [pathname]);

  return (
    <div className="main-app--layout">
      <div className="main-app--header">
        <AppHeader />
      </div>
      <div className="main-app--layout mt-[60px]">
        <div className="main-app--sidebar p-5">
          <h6>ORGANISATION</h6>
          <nav className="sidebar-nav mt-4">
            <ul>
              {menus.map((menu, index) => {
                return (
                  <li
                    key={`${menu.name}-${index}`}
                    className={isNavActive(menu.link) ? "active" : ""}
                    onClick={() => { router.push(menu.link) }}
                  >
                    {menu.name}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="main-app--content !p-0">{children}</div>

        {/* Workspace creation modal */}
        {/* <Modal
          className="rounded-none"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create new workspace
              </ModalHeader>
              <ModalBody>
                <TextField
                  name="workspaceName"
                  placeholder="name your workspace"
                  onChange={(e) => setNewWorkspaceName(e.target.value)}
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
                  disabled={!newWorkspaceName}
                  size="sm"
                  variant="primary"
                  className="!px-4"
                >
                  Create
                </ThemedButton>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal> */}
      </div>
    </div>
  );
};

export default AdminLayout;
