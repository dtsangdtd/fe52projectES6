// const { default: Axios } = require("axios")
import { API_URL } from "./../config/index.js";
const callapi = (uri, method = "GET", data) => {
    return axios({
        url: API_URL + uri,
        method,
        data,
    });
};




const getListProductService = () => {
    return axios({
        url: "https://5f5c7a355e3a4d001624942d.mockapi.io/api/SanPham",
        method: 'GET',
    });
};
const deleteProductByID = (id) => {
    return axios({
        url: `https://5f5c7a355e3a4d001624942d.mockapi.io/api/SanPham/${id}`,
        method: 'DELETE',
    });
};
const addProduct = () => {
    return axios({
        url: "https://5f5c7a355e3a4d001624942d.mockapi.io/api/SanPham",
        method: 'POST',
    });
};
const getProductByID = (id) => {
    return axios({
        url: `https://5f5c7a355e3a4d001624942d.mockapi.io/api/SanPham/${id}`,
        method: 'GET',
    });
};
const updateProduct = (product) => {
    return axios({
        url: `https://5f5c7a355e3a4d001624942d.mockapi.io/api/SanPham/${product.id}`,
        method: 'PUT',
        data: product
    });
};
export { getListProductService, deleteProductByID, addProduct, getProductByID, updateProduct, callapi };