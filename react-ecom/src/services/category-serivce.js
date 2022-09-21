import {http, privateHttp} from "./axios-helper";

export const loadCategories = () => {
    return http.get(`/categories/`).then((response) => response.data);
};

export function addCategory(cat) {
    return privateHttp.post(`/categories/`, cat).then(res => res.data)
}

export function deleteCategory(catId) {
    return privateHttp.delete(`/categories/${catId}`).then(res => res.data)
}