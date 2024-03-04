"use client";

import AppHeader from "@/components/app-layout/AppHeader";
import { ROUTES_CONSTANT } from "@/lib/routesConstants";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const settingsNav = [
  {
    name: "account",
    menus: [
      {
        name: "Your Settings",
        link: ROUTES_CONSTANT.ACCOUNT_SETTINGS,
      },
      {
        name: "Plan & Billing",
        link: ROUTES_CONSTANT.BILLING_SETTINGS,
      },
    ],
  },
];

const AccountLayout = ({ children }: { children: ReactNode }) => {
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
          <h6>ACCOUNT</h6>
          <nav className="sidebar-nav mt-4">
            <ul>
              {menus.map((menu, index) => {
                return (
                  <li
                    key={`${menu.name}-${index}`}
                    className={isNavActive(menu.link) ? "active" : ""}
                    onClick={() => {router.push(menu.link)}}
                  >
                    {menu.name}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="main-app--content !p-0">{children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;
