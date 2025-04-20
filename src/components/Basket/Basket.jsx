import "./Basket.css";

function Basket({ id, title, price, image, count }) {
	return (
		<div className="product-card" key={id}>
			<h3 className="product-title">{title}</h3>
			<img className="product-image" src={image} alt={`Image of ${title}`} />
			<p className="price">${price}</p>
			<p>{count}</p>
		</div>
	);
}

export default Basket;
