import { createContext, useState } from "react";
import { products } from '../assets/assets.js'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = '₹';
    const deliveryFee = 499;
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);

    const value = {
        products, currency, deliveryFee,
        search,setSearch,showSearch,setShowSearch
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;