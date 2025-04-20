import "./Basket.css";

function Basket({
	id,
	title,
	price,
	image,
	count,
	incrementProduct,
	decrementProduct,
}) {
	return (
		<div className="product-card" key={id}>
			<h3 className="product-title">{title}</h3>
			<img className="product-image" src={image} alt={`Image of ${title}`} />
			<p className="price">${price}</p>
			<p className="count">{count}</p>
			<button onClick={() => incrementProduct(id)}>+</button>
			<button onClick={() => decrementProduct(id)}>-</button>
		</div>
	);
}

export default Basket;
