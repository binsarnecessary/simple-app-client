import axios from "axios";
import { config } from "../config/Config";

export const authServices = {
  loginAuth: (data) => {
    const result = axios
      .post(config.apiUrl + `api/auth`, data, { withCredentials: true }) 
      .then((response) => {
        return {
          success: response.data.success,
          message: response.data.message,
          data: response.data.data,
        };
      })
      .catch((error) => {
        return {
          success: false,
          data: error,
        };
      });

    return result;
  },

  logoutAuth: () => {
    const result = axios
      .get(config.apiUrl + "logout")
      .then((response) => {
        return {
          success: response.data.success,
          data: response.data.data,
        };
      })
      .catch((error) => {
        return {
          success: false,
          data: error,
        };
      });
    return result;
  },
};
