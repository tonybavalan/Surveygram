"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { ROUTES_CONSTANT } from "@/lib/routesConstants";

const PlanHeader: React.FC = () => {
    const router = useRouter();

    return (
        <div className="app-header--wrapper">
            <nav className="themed-navbar px-4 fixed top-0 left-0 z-10 w-full text-white flex justify-between">
                <a>Surveygram</a>
                <div className="flex justify-between space-x-8">
                    <a>1. Choose a Plan</a>
                    <a>2. Payment</a>
                    <a>3. Confirmation</a>
                </div>
                <div>
                    <Image
                        src={"/images/close.png"}
                        alt="close"
                        width={"24"}
                        height={"24"}
                        objectFit="contain"
                        className="ms-3"
                        onClick={() => router.push(ROUTES_CONSTANT.WORKSPACE)}
                    />
                </div>
            </nav>
        </div>
    );
};

export default PlanHeader;