const API_URL = "https://fakestoreapi.com/products";

const fetchProducts = async () => {
	const res = await fetch(API_URL);
	if (!res.ok) {
		throw new Error("Failed to fetch products");
	}
	return res.json();
};

export default fetchProducts;
