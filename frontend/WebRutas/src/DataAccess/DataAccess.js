import axios from "axios";

const BASE_URL = "http://vanellussoftware-001-site1.ctempurl.com/api";

const getData = async (method, empresa, controller, endPoint, data = null) => {
  const token = sessionStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    let response;
    switch (method) {
      case 'get':
        response = await axios.get(`${BASE_URL}/${empresa}/${controller}/${endPoint}`, config);
        break;
      case 'post':
        response = await axios.post(`${BASE_URL}/${empresa}/${controller}/${endPoint}`, data, config);
        break;
      case 'put':
        response = await axios.put(`${BASE_URL}/${empresa}/${controller}/${endPoint}`, data, config);
        break;
      case 'delete':
        response = await axios.delete(`${BASE_URL}/${empresa}/${controller}/${endPoint}`, config);
        break;
      default:
        throw new Error('Unsupported HTTP method');
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const DataAccess = {
  get: async (empresa, controller, endPoint) => getData('get', empresa, controller, endPoint),

  post: async (empresa, controller, endPoint, data) => getData('post', empresa, controller, endPoint, data),

  put: async (empresa, controller, endPoint, data) => getData('put', empresa, controller, endPoint, data),

  delete: async (empresa, controller, endPoint) => getData('delete', empresa, controller, endPoint),

  loginGet: async (empresa, controller, endPoint) => {
    try {
      const response = await axios.get(`${BASE_URL}/${empresa}/${controller}/${endPoint}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default DataAccess;
