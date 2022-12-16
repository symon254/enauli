import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Toggle } from "../../components/Button";
import { Alert, Message } from "../../components/Alert";
import Moment from "react-moment";
import moment from "moment";
import DataTable from "../../components/Table/DataTable";
import Pagination from "../../components/Table/Pagination";
import SectionTitle from "../../components/Typography/SectionTitle";
import { useStateContext } from "../../context/ContextProvider";
import comma from "../../components/commaSeparator";
import Loader from "../../components/Loader";
import Add from "./Add";
import Update from "./Update";

const StatusPill = ({ value }) => {
    const [toggle, setToggle] = useState(value);

    const handleClick = () => {
        setToggle(!toggle);
        if (toggle) {
            Alert("error", "Status InActive");
        } else {
            Alert("success", "Status Active");
        }
        console.log(!toggle);
    };

    return (
        <div className="flex items-center py-1">
            <Toggle
                name="status"
                id="status"
                checked={toggle}
                onChange={handleClick}
                text={["Active", "InActive"]}
            />
        </div>
    );
};

const Vehicles = () => {
    const dispatch = useDispatch();
    const { currentColor, Options, setOptions } = useStateContext();

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const pageSizes = [10, 25, 50, 100, 250, 500];

    const [searchTerm, setsearchTerm] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentData, setCurrentData] = useState({});

    const vehicleStatus = useSelector((state) => state.vehicleStatus);
    const { error: StatusError, success: StatusSuccess } = vehicleStatus;

    const getVehicles = useSelector((state) => state.getVehicles);
    const { loading, error, vehicles, totalCount } = getVehicles;

    const tableData = () => {
        if (StatusSuccess || StatusError) {
            dispatch.vehicleStatus.RESET();
        }
        const params = {
            page: page - 1,
            pageSize: pageSize,
            saccoId: Options,
        };

        dispatch.getVehicles.Get(params);
    };
    useEffect(tableData, [
        dispatch,
        Options,
        StatusError,
        StatusSuccess,
        page,
        pageSize,
    ]);

    const OnRefresh = () => {
        tableData();
        setsearchTerm("");
    };

    const handleShow = (item) => {
        setShowEditModal(true);
        setCurrentData(item);
    };

    function handlePageSizeChange(e) {
        setPage(page);
        setPageSize(e.target.value);
    }

    const Columns = useMemo(
        () => [
            {
                Header: "sacco",
                accessor: "saccoName",
            },
            {
                Header: "plate Number",
                accessor: "plateNumber",
            },
            {
                Header: "seating Capacity",
                accessor: "seatingCapacity",
            },

            {
                Header: "created-At",
                accessor: "createdAt",
                Cell: ({ value }) => {
                    return (
                        <Moment format="DD-MMM-YYYY hh:mm a">
                            {moment.utc(value)}
                        </Moment>
                    );
                },
            },

            {
                Header: "Status",
                accessor: "isActive",
                Cell: ({ column, row, value }) => {
                    const item = row.original;
                    const [toggle, setToggle] = useState(value);

                    const handleClick = async () => {
                        setToggle(!toggle);
                        const params = {
                            vehicleId: item.vehicleId,
                            status: !toggle,
                        };
                        console.log(params);
                        await dispatch.vehicleStatus.UpdateStatus(params);
                        tableData();
                    };

                    return (
                        <div className="flex items-center py-1">
                            <Toggle
                                name="status"
                                id="status"
                                checked={toggle}
                                onChange={handleClick}
                                text={["Active", "InActive"]}
                            />
                        </div>
                    );
                },
            },

            {
                Header: "Action",
                accessor: "action",
                Cell: ({ value, column, row }) => {
                    const item = row.original;
                    return (
                        <div className="flex items-center space-x-4">
                            <Button
                                color="cyan"
                                buttonType="fill"
                                size="sm"
                                rounded={false}
                                block={false}
                                iconOnly={true}
                                ripple="light"
                                title="Edit Vehicle"
                                onClick={() => handleShow(item)}
                            >
                                <i className="bx bxs-edit text-xl"></i>
                            </Button>
                        </div>
                    );
                },
            },
        ],
        []
    );

    return (
        <main className="flex flex-col">
            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                {StatusSuccess && Alert("success", `${StatusSuccess}`)}
                {StatusError && Alert("error", `${StatusError}`)}
                <div>
                    <SectionTitle>Manage Vehicles</SectionTitle>
                    <DataTable
                        loading={
                            loading ? <Loader /> : <Message>{error}</Message>
                        }
                        columns={Columns}
                        data={vehicles}
                        ColumnVisible={true}
                        tableTopSelect={
                            <select
                                className="w-15 h-10 max-w-sm cursor-pointer rounded-lg px-1 py-1 text-sm leading-3 text-gray-800 shadow-md  focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
                                onChange={(e) => handlePageSizeChange(e)}
                                value={pageSize}
                            >
                                {pageSizes.map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        }
                        tableFilter={
                            <>
                                <Button
                                    color="blueGray"
                                    buttonType="link"
                                    size="regular"
                                    rounded={false}
                                    block={false}
                                    iconOnly={true}
                                    ripple="dark"
                                    title="Refresh Table"
                                    onClick={OnRefresh}
                                >
                                    <i className="bx bx-refresh text-2xl" />
                                </Button>
                                <Button
                                    type="button"
                                    color="green"
                                    size="sm"
                                    ripple="light"
                                    buttonType="outline"
                                    className="w-fit h-10 font-semibold"
                                    rounded={false}
                                    block={false}
                                    hover={true}
                                    iconOnly={false}
                                    title="Add Vehicle"
                                    onClick={() => setShowModal(true)}
                                >
                                    <i className="bx bx-plus text-xl font-bold" />
                                    Add Vehicle
                                </Button>

                                <div className="mx-auto flex h-10 max-w-md items-center rounded-lg bg-white shadow-md ">
                                    <div className="w-full rounded-lg shadow-sm hover:shadow-gray-400 ">
                                        <input
                                            id="SearchUser"
                                            type="search"
                                            name="search"
                                            placeholder="Search..."
                                            // value={searchTerm}
                                            // onChange={(e) => setsearchTerm(e.target.value)}
                                            required
                                            className=" w-full rounded-full px-4 py-2 text-gray-800 focus:rounded focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 "
                                        />
                                    </div>
                                    <div>
                                        <button
                                            style={{
                                                backgroundColor: currentColor,
                                            }}
                                            type="button"
                                            form="SearchUser"
                                            // onClick={onSearch}
                                            className={`flex h-10 w-10 items-center justify-center rounded-r-lg bg-[${currentColor}] text-gray-200 duration-200  ease-in hover:scale-105 hover:cursor-pointer `}
                                        >
                                            <i className="bx bx-search fill-current text-xl transition-all duration-200  ease-in hover:scale-110 hover:cursor-pointer" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        }
                        Paging={
                            <div className="themeText flex flex-col justify-between text-xs sm:flex-row ">
                                <span className="flex items-center font-semibold uppercase tracking-wide">
                                    Showing {comma(page)} - {pageSize} of{" "}
                                    {comma(totalCount)}
                                </span>
                                <div className="mt-2 flex sm:mt-auto sm:justify-end">
                                    <Pagination
                                        className="text-2xl"
                                        currentPage={page}
                                        totalCount={totalCount}
                                        pageSize={pageSize}
                                        onPageChange={(e) => setPage(e)}
                                    />
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>

            <Add
                tableData={tableData}
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <Update
                tableData={tableData}
                currentData={currentData}
                showModal={showEditModal}
                setShowModal={setShowEditModal}
            />
        </main>
    );
};
export default Vehicles;
