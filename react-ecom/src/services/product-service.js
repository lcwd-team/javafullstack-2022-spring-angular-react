import { http } from "./axios-helper";

export const loadProducts = (
  pageNumber = "0",
  pageSize = "9",
  sortBy = "productId",
  sortDir = "desc"
) => {
  return http
    .get(
      `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortBy}`
    )
    .then((response) => response.data);
};

export const loadProductsByCategory = (
  categoryId,
  pageNumber = "0",
  pageSize = "9",
  sortBy = "productId",
  sortDir = "desc"
) => {
  return http
    .get(
      `/categories/${categoryId}/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortBy}`
    )
    .then((response) => response.data);
};

export const getProduct = (productId) => {
  return http.get(`/products/${productId}`).then((res) => res.data);
};
