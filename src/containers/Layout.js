import React, { Suspense, useEffect, lazy } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/SideBar/Sidebar";
import Header from "../components/Header/Header";
import ThemedSuspense from "../components/ThemedSuspense";
import { useStateContext } from "../context/ContextProvider";
import { motion } from "framer-motion";

const Layout = ({ pageRoute, keyIndex }) => {
    const { closeSidebar } = useStateContext();

    let location = useLocation();

    useEffect(() => {
        closeSidebar();
    }, [location]);

    return (
        <div className="themeBackground bg-neutral-200 themeText flex h-screen bg-gradient-to-tl">
            <Sidebar />

            <div
                className={`flex w-full flex-1 flex-col overflow-y-auto overflow-x-hidden px-7 py-4`}
            >
                <Header />

                <motion.div
                    className="mt-6 flex w-full flex-col"
                    onClick={closeSidebar}
                    initial="initial"
                    animate="animate"
                    key={keyIndex}
                    variants={{
                        initial: {
                            opacity: 0,
                        },
                        animate: {
                            opacity: 1,
                        },
                    }}
                >
                    <Suspense fallback={<ThemedSuspense />}>
                        {pageRoute}
                    </Suspense>
                </motion.div>
            </div>
        </div>
    );
};

export default Layout;
