import {FC,useEffect,useReducer} from 'react'
import { ICartProduct } from '../../interfaces'
import {CartContext, cartReducer} from './'
import Cookie from 'js-cookie'


export interface CartState {
    cart: ICartProduct[] 
}

const CART_INITIAL_STATE: CartState = {
    cart:[]
}

export const CartProvider:FC = ({children}) => {

    const [state,dispatch] = useReducer(cartReducer,CART_INITIAL_STATE);

    useEffect(()=>{

        try{
            const cookiesFromProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            dispatch({type:'[Cart] - LoadCart from cookies',payload:cookiesFromProducts})

        }
        catch(error){
            dispatch({type:'[Cart] - LoadCart from cookies',payload:[]})

        }
    },[])

    useEffect(() => {
        Cookie.set('cart',JSON.stringify(state.cart))
    }, [state.cart])
    

    const addProductToCart = (product:ICartProduct) => {

        //Verificar si existe un producto con ese ID en el carrito

        const productInCart = state.cart.some(item => item._id === product._id)
        if(!productInCart) return dispatch({type:'[Cart] - Add/Update Product in cart',payload:[...state.cart,product]})

        const productInCartButDifferentSize = state.cart.some(item => item._id === product._id && item.size === product.size)
        if(!productInCartButDifferentSize) return dispatch({type:'[Cart] - Add/Update Product in cart',payload:[...state.cart,product]})

        //si llegamos aquí es porque el producto existe con la misma talla
        const updatedProducts = state.cart.map(item => {
            if(item._id !== product._id) return item;
            if(item.size !== product.size) return item;
            
            //Actualizar la cantidad

            item.quantity += product.quantity;
            
            return item
        })

        dispatch({type:'[Cart] - Add/Update Product in cart',payload:updatedProducts})

    }


    const updateCartQuantity = (product:ICartProduct) => {
        dispatch({type:"[Cart] - Update product quantity in cart",payload:product})
    }

    

    const removeProductInCart = (product:ICartProduct) => {
        dispatch({type:"[Cart] - Remove product in cart",payload:product})
    }

    return (
        <CartContext.Provider value={{
            ...state,
            addProductToCart,
            updateCartQuantity,
            removeProductInCart,
        }}>

            {children}
        </CartContext.Provider>
    )

}