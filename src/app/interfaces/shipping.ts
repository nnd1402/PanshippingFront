import { IProduct } from "./product";
import { IUser } from "./user";

export interface IShipping {
    id: string,
    start: Date,
    end: Date,
    user: IUser,
    product: IProduct
}