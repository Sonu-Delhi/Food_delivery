import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import {food_list} from '../assets/assets'
export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{
    const [cartItem,setCartItem]=useState({});
    const url = "https://food-delivery-backend-kn5g.onrender.com";
    const [token,setToken]=useState("")
    const [food_list, setFood_list]=useState([])
    const addToCart= async (itemId)=>{
        if(!cartItem[itemId]){
            setCartItem((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:token});
        }
        
    }

    const removeFromCart = async (itemId)=>{
        if(cartItem[itemId]>0){
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}));
            if(token){
                await axios.post(url+"/api/cart/remove/",{itemId},{headers:token});
            }
        }
        
    }
//     const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItem) {
//         if (cartItem[item] > 0) {
//             let itemInfo = food_list.find((product) => product._id === item);
//             if (itemInfo) {
//                 totalAmount += itemInfo.price * cartItem[item];
//             } 
//         }
//     }
//     return totalAmount;
// };

    
    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItem){
            if(cartItem[item]>0){
                let itemInfo = food_list.find((product)=>product._id===item)
                if(itemInfo){
                    totalAmount += itemInfo.price * cartItem[item];
                }
            }
        }
        // console.log(totalAmount);
        return totalAmount;
    }

    const fetchFoodList = async ()=>{
        try{
            const response = await axios.get(`${url}/api/food/list`);
            setFood_list(response.data.result);
        }
        catch(error){
            console.error("Error fetching food list",error);
        }
     }

    const loadCartData = async (token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItem(response.data.cartData)
        // console.log(cartItem)
        // console.log(response.data.cartdat)
       }

     useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
     },[])
    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
