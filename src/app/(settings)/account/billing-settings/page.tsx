"use client";

import ThemedButton from "@/components/themed-components/Buttons";
import { ROUTES_CONSTANT } from "@/lib/routesConstants";
import { useRouter } from 'next/navigation';
import Link from "next/link";


const AccountPlan = () => {
    const router = useRouter();

    return (
        <div className="flex-col flex items-center py-16">
            <div className="font-medium mb-6">
                <h6>Plan & Billing</h6>
                <p>Change your plan, update your billing info and download your invoices.</p>
            </div>

            <div className="w-636 user-settings-content p-4 mb-6">
                <div className="mb-4">
                    <p className="font-semibold">Surveygram Free</p>
                    <p className="pb-2">
                        {`You’ve been on this plan for less than a day. `}
                        <Link
                            href={ROUTES_CONSTANT.ACCOUNT_PLAN}
                        >
                            See all features in my plan
                        </Link>
                    </p>
                    <ThemedButton
                        type="button"
                        variant="primary"
                        className="w-auto"
                        size="md"
                        onClick={() => { router.push(ROUTES_CONSTANT.ACCOUNT_PLAN) }}
                    >
                        Upgrade
                    </ThemedButton>
                </div>
                <hr />
                <div className="pt-4 pb-4">
                    <p className="font-semibold">Billing Details</p>
                    <p className="pb-2">{`You’ haven’t added any billing information yet`}</p>
                    <ThemedButton
                        type="button"
                        variant="primary"
                        className="w-auto"
                        size="md"
                    >
                        Edit Billing Details
                    </ThemedButton>
                </div>
                <hr />
                <div className="pt-4">
                    <p className="font-semibold">Payment method</p>
                    <p className="pb-2">{`You’ haven’t added any billing information yet`}</p>
                    <ThemedButton
                        type="button"
                        variant="primary"
                        className="w-auto"
                        size="md"
                    >
                        Edit Payment method
                    </ThemedButton>
                </div>
            </div>

            <div className="w-636 invoice-content p-4">
                <p className="font-semibold">Invoices</p>
                <p className="font-semibold text-center">{`You don't have any invoices yet`}</p>
            </div>
        </div>
    );
};

export default AccountPlan;
