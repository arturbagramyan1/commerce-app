import { createContext, useContext, useReducer, useEffect } from "react";

export const ShoppingCartContext = createContext(null);

export const ACTIONS = {
	SET_PRODUCTS: "SET_PRODUCTS",
	TOGGLE_BASKET: "TOGGLE_BASKET",
	ADD_TO_BASKET: "ADD_TO_BASKET",
	INCREMENT_PRODUCT: "INCREMENT_PRODUCT",
	DECREMENT_PRODUCT: "DECREMENT_PRODUCT",
	DELETE_PRODUCT: "DELETE_PRODUCT",
};

const getInitialState = () => {
	const savedState = localStorage.getItem("shoppingCart");
	return savedState
		? JSON.parse(savedState)
		: {
				products: [],
				isBasketMode: false,
				boughtProducts: [],
				totalPrice: 0,
		  };
};

const cartReducer = (state, action) => {
	let newState;

	switch (action.type) {
		case ACTIONS.SET_PRODUCTS:
			newState = { ...state, products: action.payload };
			break;

		case ACTIONS.TOGGLE_BASKET:
			newState = { ...state, isBasketMode: !state.isBasketMode };
			break;

		case ACTIONS.ADD_TO_BASKET:
			const existingProduct = state.boughtProducts.find(
				(item) => item.id === action.payload.id
			);
			const updatedProducts = existingProduct
				? state.boughtProducts.map((item) =>
						item.id === action.payload.id
							? { ...item, count: item.count + 1 }
							: item
				  )
				: [...state.boughtProducts, { ...action.payload, count: 1 }];

			newState = {
				...state,
				boughtProducts: updatedProducts,
				totalPrice: updatedProducts
					.reduce((sum, item) => sum + item.price * item.count, 0)
					.toFixed(2),
			};
			break;

		case ACTIONS.INCREMENT_PRODUCT:
			const incrementedProducts = state.boughtProducts.map((item) =>
				item.id === action.payload ? { ...item, count: item.count + 1 } : item
			);
			newState = {
				...state,
				boughtProducts: incrementedProducts,
				totalPrice: incrementedProducts
					.reduce((sum, item) => sum + item.price * item.count, 0)
					.toFixed(2),
			};
			break;

		case ACTIONS.DECREMENT_PRODUCT:
			const decrementedProducts = state.boughtProducts.map((item) =>
				item.id === action.payload && item.count > 1
					? { ...item, count: item.count - 1 }
					: item
			);
			newState = {
				...state,
				boughtProducts: decrementedProducts,
				totalPrice: decrementedProducts
					.reduce((sum, item) => sum + item.price * item.count, 0)
					.toFixed(2),
			};
			break;

		case ACTIONS.DELETE_PRODUCT:
			const filteredProducts = state.boughtProducts.filter(
				(item) => item.id !== action.payload
			);
			newState = {
				...state,
				boughtProducts: filteredProducts,
				totalPrice: filteredProducts
					.reduce((sum, item) => sum + item.price * item.count, 0)
					.toFixed(2),
			};
			break;

		default:
			return state;
	}

	localStorage.setItem("shoppingCart", JSON.stringify(newState));
	return newState;
};

export const ShoppingCartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, getInitialState());

	useEffect(() => {
		localStorage.setItem("shoppingCart", JSON.stringify(state));
	}, []);

	return (
		<ShoppingCartContext.Provider value={{ state, dispatch }}>
			{children}
		</ShoppingCartContext.Provider>
	);
};
