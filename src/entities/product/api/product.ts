import { instance } from "../../../shared/api"

export const getProducts = async () => {
    const response = await instance.get("getItems");

    return response.data;
}

export const getDiscounts = async () => {
    const response = await instance.get("getDiscount");

    return response.data;
}


export const createOrder = async (userId: number, name: string, volume: number, components: string, price: number, image: string) => {
    const response = await instance.post(`addOrders?user_id=${userId}&name=${name}&volume=${volume}&components=${components}&price=${price}&image=${image}` );

    return response.data;
}