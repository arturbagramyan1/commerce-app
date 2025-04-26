import { useEffect, useState } from "react";
import fetchProducts from "../../api/api";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsList.css";

import Basket from "../Basket/Basket";

function ProductsList() {
	const [products, setProducts] = useState([]);
	const [isBasketMode, toggleBasketMode] = useState(false);
	const [boughtProducts, setBoughtProducts] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);

	const calculateTotalPrice = () => {
		const total = boughtProducts.reduce((acc, product) => {
			return acc + product.price * product.count;
		}, 0);
		setTotalPrice(total);
	};

	const deleteProduct = (id) => {
		setBoughtProducts((prev) => prev.filter((item) => item.id !== id));
	};

	useEffect(() => {
		calculateTotalPrice();
	}, [boughtProducts]);

	useEffect(() => {
		fetchProducts().then((data) => {
			setProducts(data);
		});
	}, []);

	const incrementProduct = (id) => {
		setBoughtProducts((prev) =>
			prev.map((item) =>
				item.id === id ? { ...item, count: item.count + 1 } : item
			)
		);
	};

	const decrementProduct = (id) => {
		setBoughtProducts((prev) =>
			prev.map((item) =>
				item.id === id && item.count > 1
					? { ...item, count: item.count - 1 }
					: item
			)
		);
	};

	const addToBasket = (product) => {
		setBoughtProducts((prev) => {
			const found_product = prev.find((item) => item.id === product.id);
			if (found_product) {
				return prev.map((item) =>
					item.id === product.id ? { ...item, count: item.count + 1 } : item
				);
			} else {
				return [...prev, { ...product, count: 1 }];
			}
		});
	};
	console.log(boughtProducts);
	return (
		<>
			<button onClick={() => toggleBasketMode((prev) => !prev)}>
				{isBasketMode ? "View Products" : "View Basket"}
			</button>

			{isBasketMode ? (
				<>
					<h3>Total cost: {totalPrice} </h3>
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
