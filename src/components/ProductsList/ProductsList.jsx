import { useContext, useEffect } from "react";
import fetchProducts from "../../api/api";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsList.css";
import Basket from "../Basket/Basket";
import {
	ACTIONS,
	ShoppingCartContext,
} from "../../Context/ShoppingCartContext";

function ProductsList() {
	const { state, dispatch } = useContext(ShoppingCartContext);
	const { products, isBasketMode, boughtProducts, totalPrice } = state;

	useEffect(() => {
		fetchProducts().then((data) => {
			dispatch({ type: ACTIONS.SET_PRODUCTS, payload: data });
		});
	}, []);

	const toggleBasket = () => {
		dispatch({ type: ACTIONS.TOGGLE_BASKET });
	};

	const addToBasket = (product) => {
		dispatch({ type: ACTIONS.ADD_TO_BASKET, payload: product });
	};

	const incrementProduct = (id) => {
		dispatch({ type: ACTIONS.INCREMENT_PRODUCT, payload: id });
	};

	const decrementProduct = (id) => {
		dispatch({ type: ACTIONS.DECREMENT_PRODUCT, payload: id });
	};

	const deleteProduct = (id) => {
		dispatch({ type: ACTIONS.DELETE_PRODUCT, payload: id });
	};

	return (
		<>
			<button onClick={toggleBasket}>
				{isBasketMode ? "View Products" : "View Basket"}
			</button>

			{isBasketMode ? (
				<>
					<h3>Total cost: {totalPrice}</h3>
					<div>
						{boughtProducts.map((boughtProd) => (
							<Basket
								{...boughtProd}
								key={boughtProd.id}
								decrementProduct={decrementProduct}
								incrementProduct={incrementProduct}
								deleteProduct={deleteProduct}
							/>
						))}
					</div>
				</>
			) : (
				<div className="products-container">
					{products.map((prod) => (
						<ProductCard
							addToBasket={addToBasket}
							key={prod.id}
							id={prod.id}
							title={prod.title}
							price={prod.price}
							image={prod.image}
						/>
					))}
				</div>
			)}
		</>
	);
}

export default ProductsList;
