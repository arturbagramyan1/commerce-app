import { useEffect, useState } from "react";
import fetchProducts from "../../api/api";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsList.css";

import Basket from "../Basket/Basket";

function ProductsList() {
	const [products, setProducts] = useState([]);
	const [isBasketMode, toggleBasketMode] = useState(false);
	const [boughtProducts, setBoughtProducts] = useState([]);
    
	useEffect(() => {
		fetchProducts().then((data) => {
			setProducts(data);
		});
	}, []);

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
				<div>
					{boughtProducts.map((boughtProd) => (
						<Basket {...boughtProd} key={boughtProd.id} />
					))}
				</div>
			) : (
				<div className="products-container">
					{products.map((prod) => (
						<ProductCard
							buyProduct={addToBasket}
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
