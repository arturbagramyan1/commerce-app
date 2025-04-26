import "./App.css";
import ProductsList from "./components/ProductsList/ProductsList";
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";

function App() {
	return (
		<ShoppingCartProvider>
			<ProductsList />
		</ShoppingCartProvider>
	);
}

export default App;
