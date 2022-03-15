import { IOrder } from "../interfaces";
import {isValidObjectId} from 'mongoose'
import { Order } from "../models";
import { db } from ".";

export const getOrderById = async(id:string):Promise<IOrder | null> => {

    if(!isValidObjectId(id)){
        return null
    }

    await db.connect();

    const order = await Order.findById(id)

    await db.disconnect

    if(!order){
        return null;
    }

    return JSON.parse(JSON.stringify(order))
}