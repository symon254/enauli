import React, { useContext, useState, useEffect } from "react";
import { NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import User from "../../assets/Img/profile.png";
import { useStateContext } from "../../context/ContextProvider";
import { Dropdown, DropdownItem, DropdownLink } from "../Dropdown";
import { MenuIcon, OutlinePersonIcon, OutlineLogoutIcon } from "../../icons";
import { CustomSelect } from "../Input";
import { setStorageData } from "../../utils/Storage";

const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation().pathname;
    const navigate = useNavigate();
    const {
        toggleSidebar,
        currentColor,
        activeMenu,
        setActiveMenu,
        setScreenSize,
        screenSize,
        Options,
        setOptions,
    } = useStateContext();

    const AuthLogin = useSelector((state) => state.AuthLogin);
    const { userInfo } = AuthLogin;

    const AuthSaccos = useSelector((state) => state.AuthSaccos);
    const { Saccos } = AuthSaccos;

    const saccoData = () => {
        const params = {
            userId: userInfo?.data[0].userId,
        };
        dispatch.AuthSaccos.getSaccos(params);
    };
    useEffect(saccoData, [dispatch]);

    let SaccoOptions = Saccos.map((item) => {
        return {
            value: item.saccoId,
            label: item.name,
        };
    });

    let Location = location
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace("/", "")
        .toUpperCase();

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (screenSize <= 900) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    const logoutHandler = () => {
        dispatch.AuthLogout.logout();
    };

    const handleChange = (e) => {
        setOptions(e);
        setStorageData("saccoId", e ? e : "103866918007472128");
    };

    return (
        <header className={`relative w-full py-1 md:static`}>
            <div className={`flex h-full items-center justify-between px-0`}>
                <button
                    style={{ color: currentColor }}
                    className="mx-2 mr-5 -ml-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition duration-150 ease-in hover:scale-105 hover:bg-gray-100 focus:outline-none"
                    onClick={toggleSidebar}
                    aria-label="Menu"
                >
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="flex flex-1 justify-start lg:mr-32">
                    <h2 className="themeText text-xl font-normal leading-9">
                        {Location}
                    </h2>
                </div>

                <ul className="flex flex-shrink-0 items-center ">
                    <li className="relative space-x-4">
                        <CustomSelect
                            color="gray"
                            placement="bottom-start"
                            placeholder={"Select Sacco"}
                            buttonType="outline"
                            size="sm"
                            rounded={false}
                            block={false}
                            icon={false}
                            hover={false}
                            ripple="light"
                            value={Options}
                            options={SaccoOptions}
                            onChange={(e) => handleChange(e)}
                        />
                    </li>

                    <li className="relative space-x-4">
                        <Dropdown
                            color="gray"
                            placement="bottom-start"
                            buttonText={
                                <img
                                    className="h-9 w-9 rounded-full"
                                    src={User}
                                    alt="user"
                                />
                            }
                            buttonType="link"
                            size="sm"
                            rounded={false}
                            block={false}
                            icon={false}
                            hover={false}
                            ripple="light"
                        >
                            <DropdownItem ripple="light">
                                <span
                                    onClick={() => logoutHandler()}
                                    className="flex items-center"
                                >
                                    <OutlineLogoutIcon
                                        className="mr-3 h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    <span>Log out</span>
                                </span>
                            </DropdownItem>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
