"use client";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { useState } from "react";

import toast from "react-hot-toast";
import { API_TYPES } from "./constants";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getCookie = (cookieName: string) => {
  if (typeof document !== "undefined") {
    const cookiePairs = document.cookie
      .split(";")
      .map((pair) => pair.trim().split("="));

    const cookie = cookiePairs.find(([name]) => name === cookieName);
    return cookie ? decodeURIComponent(cookie[1]) : null;
  } else {
    return null;
  }
};

export const getUserDetail = (name: string) => {
  if (typeof document !== "undefined") {
    const cookiePairs = document.cookie
      .split(";")
      .map((pair) => pair.trim().split("="));

    const cookie = cookiePairs.find(([name]) => name === "user_profile");
    return cookie ? JSON.parse(decodeURIComponent(cookie[1]))[name] : null;
  } else {
    return null;
  }
};
export const isAuthorised = () => {
  if (typeof document !== "undefined") {
    const cookiePairs = document.cookie
      .split(";")
      .map((pair) => pair.trim().split("="));

    const cookie = cookiePairs.find(([name]) => name === "token");
    return cookie ? decodeURIComponent(cookie[1]) : null;
  } else {
    return null;
  }
};
export const deleteCookie = (name: string) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const setCookie = (
  name: string,
  value: string,
  daysToExpire: number
) => {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const showLoadingToast = (promise: any) => {
  toast.promise(promise, {
    loading: "Processing...",
    success: "Success",
    error: "Error",
  });
};

export const commonService = async (
  endpoint: string,
  type: string,
  payload?: any
) => {
  try {
    let options: any = {};
    options.Authorization = "Bearer " + isAuthorised();
    options.accept = "*/*";
    const response = await axios({
      baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
      method: type,
      url: endpoint,
      headers: options,
      data: payload,
    });

    return response;
  } catch (err: any) {
    if (err.response.status === 401) {
      showErrorMessage("Session timed out");
      setTimeout(() => {
        deleteCookie("token");
        window.location.reload();
      }, 1500);
    }
    if (err.response.status === 500) {
      showErrorMessage(err.response.data.message);
    }

    return err;
  }
};

export const useValidateForm = (form: any, validateType: any[] | null) => {
  const [errors, setErrors] = useState<any>({});

  const validateOnChange = (event: any) => {
    if (form && Object.keys(errors).length > 0) {
      let error: any = { ...errors };
      const filterValidate =
        validateType?.filter((x: any) => x.name === event.target.name) || [];
      const currentValidate =
        filterValidate?.length > 0 ? filterValidate[0] : null;

      if (
        currentValidate &&
        currentValidate.isRequired &&
        event.target.value === ""
      ) {
        error[event.target.name] = { ...error[event.target.name], empty: true };
      } else if (
        currentValidate &&
        currentValidate.matchPattern &&
        !currentValidate.matchPattern.test(event.target.value)
      ) {
        error[event.target.name] = {
          ...error[event.target.name],
          invalid: true,
        };
      } else {
        error[event.target.name] = { empty: false, invalid: false };
      }
      setErrors(error);
    }
  };

  const validateOnSubmit = () => {
    if (form) {
      console.log(form);
      let error: any = {};
      const keys = Object.keys(form);
      keys.forEach((key) => {
        const filterValidate =
          validateType?.filter((x: any) => x.name === key) || [];
        const currentValidate =
          filterValidate?.length > 0 ? filterValidate[0] : null;
        if (
          currentValidate &&
          currentValidate.isRequired &&
          (form[key] === "" || form[key] === null)
        ) {
          error[key] = { ...error[key], empty: true };
        } else if (
          currentValidate &&
          currentValidate.matchPattern &&
          !currentValidate.matchPattern.test(form[key])
        ) {
          error[key] = { ...error[key], invalid: true };
        } else {
          error[key] = { empty: false, invalid: false };
        }
      });
      setErrors(error);

      return Object.keys(error).length !== 0
        ? Object.values(error).filter((x: any) => x?.empty || x?.invalid)
            .length === 0
        : false;
    }
    return false;
  };

  return { validateOnSubmit, validateOnChange, errors };
};

export const showSuccessMessage = (msg: string) => {
  toast.success(msg, {
    style: {
      backgroundColor: "#000",
      color: "#fff",
      padding: "16px",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#000",
    },
    position: "bottom-right",
  });
};

export const showErrorMessage = (msg: string) => {
  toast.error(msg, {
    style: {
      backgroundColor: "#dc2626",
      color: "#fff",
      padding: "16px",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#dc2626",
    },
    position: "bottom-right",
  });
};

export const commonGetService = (endpoint: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await commonService(endpoint, API_TYPES.GET);

      if (response?.status === 200) {
        resolve(response.data);
      }
    } catch (err) {
      reject(err);
    }
  });
};
