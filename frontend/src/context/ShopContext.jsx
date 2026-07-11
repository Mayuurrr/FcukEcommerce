import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹";
    const deliveryFee = 99;
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size");
            return;
        }

        const cartData = structuredClone(cartItems);
        cartData[itemId] = cartData[itemId] || {};
        cartData[itemId][size] = (Number(cartData[itemId][size]) || 0) + 1;
        setCartItems(cartData);
        toast.success("Added to shopping bag");

        if (token) {
            try {
                await axios.post(
                    `${backendURL}/api/cart/add`,
                    { itemId, size },
                    { headers: { token } }
                );
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        const cartData = structuredClone(cartItems);
        cartData[itemId][size] = Number(quantity);
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    `${backendURL}/api/cart/update`,
                    { itemId, size, quantity: Number(quantity) },
                    { headers: { token } }
                );
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                const qty = Number(cartItems[itemId][size]);
                if (qty > 0) {
                    totalCount++; // Count unique items in cart
                }
            }
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            const itemInfo = products.find((product) => product._id === items);
            if (!itemInfo) continue;
            for (const item in cartItems[items]) {
                const qty = Number(cartItems[items][item]);
                if (qty > 0) {
                    totalAmount += itemInfo.price * qty;
                }
            }
        }
        return totalAmount;
    };

    const getProductData = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const getUserCart = async (userToken) => {
        try {
            const response = await axios.post(
                `${backendURL}/api/cart/get`,
                {},
                { headers: { token: userToken } }
            );
            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Load initial products and auth state
    useEffect(() => {
        getProductData();
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    // Fetch user cart automatically whenever token changes (e.g. login/logout)
    useEffect(() => {
        if (token) {
            getUserCart(token);
        } else {
            setCartItems({});
        }
    }, [token]);

    const value = {
        products,
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        setCartItems,
        navigate,
        backendURL,
        setToken,
        token,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
