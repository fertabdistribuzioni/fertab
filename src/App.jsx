import React, { useState, useEffect, useRef } from "react"; // Aggiungi useRef
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase_config";
import "./App.css";
import HeaderBar from "./components/HeaderBar.jsx";
import LoadingEffect from "./components/LoadingEffect.jsx";
import ProductCard from "./components/ProductCard.jsx";
import FooterBar from "./components/FooterBar.jsx";
import closeIcon from "./assets/closeIcon.svg"
import searchIcon from "./assets/searchIcon.svg"

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productsRef = collection(db, "products");
      const querySnapshot = await getDocs(productsRef);
      const allProducts = querySnapshot.docs.map((doc) => doc.data());
      setProducts(allProducts);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <HeaderBar />
      <div id="products">
        <div id="searchBar">
          <input ref={inputRef} type="text" name="searchTerm" placeholder="Cerca prodotto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <div id="searchBarButton" onClick={searchTerm ? handleClearSearch : handleFocusInput}>
            <img src={searchTerm ? closeIcon : searchIcon} alt="" />
          </div>
        </div>
        <div id="productList">
          {loading ? ( <LoadingEffect /> ) : (
            filteredProducts.map((product, index) => (
              <ProductCard
                key={index}
                productImg={product.productImg}
                productName={product.productName}
                productDescription={product.productDescription}
                productPrice={product.productPrice}
                productAmount={product.productAmount}
                prodLink={product.prodLink}
              />
            ))
          )}
        </div>
      </div>
      <FooterBar />
    </>
  );
}

export default App