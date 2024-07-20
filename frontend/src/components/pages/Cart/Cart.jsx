import React, { useContext } from 'react'
import './cart.css'
import { StoreContext } from '../../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const {cartItem,food_list,removeFromCart,getTotalCartAmount,url}=useContext(StoreContext)
  const nevigate = useNavigate();
  return (
    <div className='cart'>
      <div className='cart-itmes'>
        <div className='cart-items-title'>
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {/* {
          food_list.map((item,index)=>{
            if(cartItem[item._id]>0){
              return(
                <>
                <div key={index} className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt='' />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${item.price*cartItem[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
                </>
              )
            }
          })
        } */}
        {
    food_list.map((item) => {
        if (cartItem[item._id] > 0) {
            return (
                <div key={item._id} className='cart-items-title cart-items-item'>
                    <img src={url + "/images/" + item.image} alt='' />
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{cartItem[item._id]}</p>
                    <p>${item.price * cartItem[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                    <hr />
                </div>
            );
        } else {
            return null; // or handle cases where cartItem[item._id] <= 0
        }
    })
}

      </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
            <button onClick={()=>nevigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='Enter promo code' />
              <button>APPLY</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
