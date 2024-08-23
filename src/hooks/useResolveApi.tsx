/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormErrors } from "@mantine/form";
import toast from "react-hot-toast";
import { apiUrl } from "../util/environment";
import ApiResponse from "../model/ApiResponse";
import { useSession } from "../auth/SessionContext";
import { useNavigate } from "@tanstack/react-router";
import { StatusCodes } from "http-status-codes";

export const useResolveApi = () => {
  const { clearUserSession } = useSession();
  const navigate = useNavigate();
  const flavorcraftSession = localStorage.getItem("flavorcraft-session");
  function clearSession() {
    setTimeout(() => {
      clearUserSession();
      navigate({
        to: "/auth",
      });
    }, 3000);
  }
  /**
   * Get data from the API with credentials
   * You don't need to pass the full URL, just the endpoint
   * @param endpoint The endpoint to fetch from the API
   * @example getApi("recipes")
   *  */
  async function getApi(endpoint: string) {
    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${flavorcraftSession}`,
        },
      });
      const data: ApiResponse = await response.json();
      if (!response.ok) {
        if (response.status === StatusCodes.FORBIDDEN) {
          clearSession();
        }
        let errorMessage = data
          ? data.message
          : "There was an error trying to reach the server";
        if (data.message.toLowerCase().split(" ").includes("token"))
          errorMessage = "You must be logged in to access this page";
        toast.error(errorMessage, { id: "api-error" });
        navigate({
          to: "..",
        });
        return;
      }
      return data;
    } catch (err) {
      console.error("Fetch error", err);
      toast.error("There was an error trying to reach the server", {
        id: "server-error",
      });
      return;
    }
  }
  /**
   * Post data to the API with credentials
   * You don't need to pass the full URL, just the endpoint
   * @example postApi("recipes", {title: "Recipe title"})
   * @param endpoint The endpoint to post to the API
   * @param data The data to send to the API
   */
  async function postApi(endpoint: string, data: any) {
    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${flavorcraftSession}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const responseData: ApiResponse = await response.json();
      if (!response.ok) {
        if (response.status === StatusCodes.FORBIDDEN) {
          clearSession();
        }
        toast.error(responseData.message);
      }
      if (responseData.success) {
        toast.success(responseData.message);
      }
      return responseData;
    } catch (err) {
      console.error("Fetch error: ", err);
      toast.error("Server error", {
        id: "server-error",
      });
      throw err;
    }
  }
  /**
   * Update data in the API with credentials
   * You don't need to pass the full URL, just the endpoint
   * @example updateApi("recipes/123", {title: "New title"})
   * @param endpoint The endpoint to update in the API
   * @param data The data to send to the API
   */
  async function updateApi(endpoint: string, data: any) {
    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${flavorcraftSession}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const responseData: ApiResponse = await response.json();
      if (!response.ok) {
        if (response.status === StatusCodes.FORBIDDEN) {
          clearSession();
        }
        toast.error(responseData.message);
      }
      if (responseData.success) {
        toast.success(responseData.message);
      }
      return responseData;
    } catch (err) {
      console.error("Fetch error: ", err);
      toast.error("Server error", {
        id: "server-error",
      });
      throw err;
    }
  }
  /**
   * Delete data in the API with credentials
   * You don't need to pass the full URL, just the endpoint
   * @example deleteApi("recipes/123")
   * @param endpoint The endpoint to delete in the API
   */
  async function deleteApi(endpoint: string) {
    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${flavorcraftSession}`,
        },
      });
      const data: ApiResponse = await response.json();
      if (!response.ok) {
        if (response.status === StatusCodes.FORBIDDEN) {
          clearSession();
        }
        let errorMessage = "There was an error trying to reach the server";
        if (data.message.toLowerCase().split(" ").includes("token"))
          errorMessage = "You must be logged in to access this page";
        toast.error(errorMessage, { id: "api-error" });

        return;
      }
      return data;
    } catch (err) {
      console.error("Fetch error", err);
      toast.error("There was an error trying to reach the server", {
        id: "server-error",
      });
      return;
    }
  }
  /**
   * Handle Zod validation errors
   * @param errors The errors object from Zod
   * @example zodValidationErrors(errors)
   */
  function zodValidationErrors(errors: FormErrors) {
    const zodErrors = Object.values(errors);
    console.log(errors);
    for (let i = 0; i < zodErrors.length; i++) {
      if (zodErrors[i]) {
        toast.error(`${zodErrors[i]}`, {
          id: `zod-error-${i}`,
        });
      }
    }
  }
  return {
    getApi,
    postApi,
    updateApi,
    deleteApi,
    zodValidationErrors,
  };
};
