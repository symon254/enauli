import React from "react";
import { Slide, toast, ToastContainer } from "react-toastify";

const contextClass = {
  success: "bg-green-100 text-green-900",
  error: "bg-red-100 text-red-900",
  info: "bg-blue-100 text-blue-900",
  warning: "bg-yellow-100 text-yellow-900",
  default: "bg-indigo-600",
  dark: "bg-gray-300 font-gray-300",
};

export const Alert = (type, message) => {
  switch (type) {
    case "warning":
      return toast.warning(message);
    case "error":
      return toast.error(message);
    case "success":
      return toast.success(message);
    case "info":
      return toast.info(message);
    case "dark":
      return toast.dark(message);
    default:
      return toast(message);
  }
};

export const ToastNotification = () => {
  return (
    <ToastContainer
      toastClassName={({ type }) =>
        contextClass[type || "default"] +
        " relative mb-2 p-1 flex h-fit shadow-xl rounded-md justify-between overflow-hidden cursor-pointer"
      }
      bodyClassName={() =>
        "flex items-center gap-3 text-sm p-4 pr-12 border-0 rounded-lg relative transform opacity-100 translate-y-0 transition-all duration-500"
      }
      position="top-right"
      autoClose={3000}
      limit={3}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
    />
  );
};
