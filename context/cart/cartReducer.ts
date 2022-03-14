import { ICartProduct } from "../../interfaces";
import { CartState,ShippingAddress } from "./";

type CartActionType =
  | { type: "[Cart] - LoadCart from cookies"; payload: ICartProduct[] }
  | { type: "[Cart] - Add/Update Product in cart"; payload: ICartProduct[] }
  | { type: "[Cart] - Update product quantity in cart"; payload: ICartProduct }
  | { type: "[Cart] - Remove product in cart"; payload: ICartProduct }
  | { type: "[Cart] - Get address from cookies"; payload: ShippingAddress }
  | { type: "[Cart] - Update address"; payload: ShippingAddress }


  | {
      type: "[Cart] - Update order sumary";
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies":
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };

    case "[Cart] - Add/Update Product in cart":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "[Cart] - Update product quantity in cart":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          product.quantity = action.payload.quantity;
          return action.payload;
        }),
      };

    case "[Cart] - Remove product in cart":
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            !(
              item._id === action.payload._id &&
              item.size === action.payload.size
            )
        ),
      };

      case "[Cart] - Update order sumary":
        return {
          ...state,
          ...action.payload
        }

        case "[Cart] - Get address from cookies":
        case "[Cart] - Update address":
          return {
            ...state,
            shippingAddress: action.payload
          }

    default:
      return state;
  }
};
