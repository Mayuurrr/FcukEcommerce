import { createContext } from "react";
import { products } from '../assets/assets.js'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = '₹';
    const deliveryFee = 499;

    const value = {
        products, currency, deliveryFee
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;