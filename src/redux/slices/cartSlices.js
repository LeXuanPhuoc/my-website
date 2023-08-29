import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalQantity: 0,

}

const cartSlices = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem:(state,action)=>{
        const newItem = action.payload
        const existingItem = state.cartItems.find(
        (item) => item.id === item.id === newItem.id
            );
            state.totalQantity++;

            if(!existingItem){
                state.cartItems.push({
                    id:newItem.id,
                    productName:newItem.productName,
                    Image:newItem.imgUrl,
                    price:newItem.price,
                    quantity:1,
                    totalPrice:newItem.price
                });
            }
            else{
                existingItem.quantity++
                existingItem.totalPrice = Number(existingItem.totalPrice)+Number
                (newItem.Price)

            }
            
            state.totalAmount = state.cartItems.reducer((total,item)=> total +
            Number(item.price) * Number(item.quantity))
    }

  }
});

export const cartActions = cartSlices.actions

export default cartSlices.reducer