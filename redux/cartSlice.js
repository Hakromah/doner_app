const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			state.products.push(action.payload);
			state.quantity += 1;
			state.total += action.payload.price * action.payload.quantity;
		},
		deleteProduct: (state, action) => {
			const remainingItem = state.products.filter(
				(product) => product._id !== action.payload
			);
			state.products = remainingItem;
		},

		reset: (state) => {
			state.products = [];
			state.quantity = 0;
			state.total = 0;
		},
	},
});

export const { addProduct, reset, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
