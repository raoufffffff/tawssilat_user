import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    card: [],
    price: 0,
    resourstorId: 0,
    location: {},
    ride: 0,
}

const StoreCard = createSlice({
    name: 'card',
    initialState, // Corrected the spelling here
    reducers: {
        add: (state, { payload }) => {
            state.card = [...state.card, payload];
        },
        getreide: (state, { payload }) => {
            state.ride = payload
        },
        newRest: (state, { payload }) => {
            state.resourstorId = payload
        },
        newPrice: (state, { payload }) => {
            state.price = payload
        },
        getlocarion: (state, { payload }) => {
            state.location = payload
        },
        remove: (state, { payload }) => {
            state.card = state.card.filter(e => e.id != payload);
        },
        clear: (state) => {
            state.card = [];
            state.price = 0; // Updated to modify state.price
            state.resourstorId = 0
            state.ried = 0
        }
    }
});

export const { add, remove, clear, newPrice, newRest, getlocarion, getreide } = StoreCard.actions; // Updated to use StoreCard.actions
export default StoreCard.reducer;
