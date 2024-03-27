import axios from "axios";
import { config } from "../config/Config";

const CategoryServices = {
  getAllCategory: () => {
    const result = axios
      .get(config.apiUrl + "api/category")
      .then((response) => {
        return {
          success: response.data.success,
          data: response.data.data,
          message: response.data.message,
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

  getCategoryById: (id) => {
    const result = axios
      .get(config.apiUrl + `api/category/${id}`)
      .then((response) => {
        return {
          success: response.data.success,
          data: response.data.data,
          message: response.data.message,
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

  createCategory: (data) => {
    const result = axios
      .post(config.apiUrl + `api/category`, data)
      .then((response) => {
        return {
          success: response.data.success,
          data: response.data.data,
          message: response.data.message,
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

  editCategory: (data) => {
    const result = axios
      .put(config.apiUrl + `api/category/${data._id}`, data)
      .then((response) => {
        return {
          success: response.data.success,
          data: response.data.data,
          message: response.data.message,
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

  softDeleteCategory: (data) => {
    const result = axios
      .put(config.apiUrl + `api/delete/category/${data._id}`, data)
      .then((response) => {
        return {
          success: response.data.success,
          data: response.data.data,
          message: response.data.message,
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

  hardDeleteCategory: (id) => {
    const result = axios
      .delete(config.apiUrl + `api/category/${id}`)
      .then((response) => {
        return {
          success: response.data.success,
          data: response.data.data,
          message: response.data.message,
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

export default CategoryServices;
