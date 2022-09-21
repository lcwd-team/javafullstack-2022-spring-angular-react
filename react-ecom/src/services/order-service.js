import {privateHttp} from "./axios-helper";

export const createOrder = (orderDetail) => {
    return privateHttp
        .post(`/orders/`, orderDetail)
        .then((response) => response.data);
};

export const getOrders = () => {
    return privateHttp.get(`/orders/`).then(res => res.data);
};

export const getAllOrders = () => {
    return privateHttp.get(`/orders/all`).then(res => res.data);
};
