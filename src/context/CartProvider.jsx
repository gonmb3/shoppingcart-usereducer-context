import { createContext, useEffect, useState, useContext, useReducer } from "react"
import { cartReducer, productReducer } from "./reducers";

import products from './../data'; /* DATA */


const CartContext = createContext();

const CartProvider = ({children}) => {
  
                // cart reducer
    const [state, dispatch] = useReducer(cartReducer,{
        products: products,
        cart:[]    
    })
            // products filter reducer
    const [productState, productDispatch] = useReducer(productReducer,{
        byStock: false,
        byFastDelivery:[],
        byRating:0,
        searchQuery:"",
    })


    return(
        <CartContext.Provider
        value={{
           state,
           dispatch,
           productState,
           productDispatch
        }}
        >
            {children}
        </CartContext.Provider>
    )
}

export {CartProvider}

export default CartContext


export const useCartContext = () => {
    return useContext(CartContext)
}


