import { IProduct } from "./product";
import { IUser } from "./user";

export interface IShipping {
    id: string,
    start: string,
    end: string,
    user: IUser,
    product: IProduct
}