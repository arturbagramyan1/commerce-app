import "./ProductCard.css";

function ProductCard({ id, title, price, image, addToBasket }) {
	return (
		<div className="product-card">
			<h3 className="product-title">{title}</h3>
			<img className="product-image" src={image} alt={`Image of ${title}`} />
			<p className="price">${price}</p>
			<button onClick={() => addToBasket({ id, title, price, image })}>
				Add to Basket
			</button>
		</div>
	);
}

export default ProductCard;
