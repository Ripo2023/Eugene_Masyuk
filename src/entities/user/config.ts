export enum UserKeys {
    IS_FIRST_ENTRANCE = "IS_FIRST_ENTRANCE",
    PHONE_NUMBER = "PHONE_NUMBER",
    USER_ID = "USER_ID"
}

export interface IUser {
    phone: string;
    id: number;
}

export interface IOrder {
    id: number;
    name: string;
    volume: string;
    components: string;
    price: number;
    image: string;
    user_id: number;
}