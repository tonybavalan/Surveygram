"use client";

import PlanHeader from "@/components/PlanHeader";
import { Button } from "@nextui-org/react";

const AccountPlan: React.FC = () => {
    return (
        <div className="main-app--layout">
            <div className="main-app--header">
                <PlanHeader />
            </div>
            <div className="main-app--content" style={{ marginTop: "40px" }}>
                <div className="mb-6">
                    <label className="inline-flex items-center cursor-pointer">
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Monthly</span>
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Yearly</span>
                    </label>
                </div>

                <div>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="border border-black p-4">
                            <h5>Business</h5>
                            <p>100 USD</p>
                        </div>
                        <div className="border border-black p-4">
                            <h5>Basic</h5>
                            <p>100 USD</p>
                        </div>
                        <div className="border border-black p-4">
                            <h5>Free</h5>
                            <p>100 USD</p>
                        </div>
                        <div className="border border-black p-4">
                            <p>Your new plan</p>
                            <p>Business (monthly)</p>
                            <p>Total 100 USD</p>
                            <p>{`You’ll pay 100 USD now, which is prorated for the current billing period.`}</p>
                            <p>{`Your plan is billed monthly and will renew  for 100 USD on Sep 12, 2023.`}</p>
                            <p>{`You can cancel any time before this date.`}</p>
                            <Button>Continue</Button>
                        </div>
                    </div>
                </div>

                <div>
                    <h3>The Page is under construction. Please click the close at top right</h3>
                </div>
            </div>
        </div>
    );
};
export default AccountPlan;