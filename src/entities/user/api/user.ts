import { instance } from "../../../shared/api";
import { IUser } from "../config";

export const getAllUsers = async (): Promise<IUser[]> => {
    const response = await instance.get("getUsers")

    return response.data;
}

export const addUser = async (phoneValue: string): Promise<string> => {
    const response = await instance.post(`addUsers?phone=${phoneValue}`)

    return response.data.id;
}


export const getOrders = async (userId: number) => {
    const response = await instance.post(`getOrders?user_id=${userId}`, {
        user_id: userId
    })

    return response.data;
}



