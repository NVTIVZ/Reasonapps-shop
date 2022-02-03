import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface stateProps {
  items: {
    name: string;
    id: string;
    quantity: number;
    price: string;
    image: string;
    description: string;
    slug: string;
    categories: [];
  }[];
  amount: number;
}

const initialState: stateProps = {
  items: [],
  amount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        name: string;
        id: string;
        quantity: number;
        price: string;
        image: string;
        description: string;
        slug: string;
        categories: [];
      }>
    ) => {
      const findItem = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (findItem >= 0) {
        state.items[findItem].quantity += 1;
        state.amount += parseInt(action.payload.price);
      } else {
        const itemCount = { ...action.payload, quantity: 1 };
        state.items.push(itemCount);
        state.amount += parseInt(action.payload.price);
      }
    },
    removeFromCart: (state, action) => {
      const findItem = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (action.payload.quantity > 1) {
        state.amount -= parseInt(action.payload.price);
        state.items[findItem].quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.amount -=
          parseInt(action.payload.price) * action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.amount = 0;
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
