import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase_config";
import "./App.css";
import HeaderBar from "./components/HeaderBar.jsx";
import LoadingEffect from "./components/LoadingEffect.jsx";
import ProductCard from "./components/ProductCard.jsx";
import FooterBar from "./components/FooterBar.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carica tutti i prodotti al montaggio del componente
    const fetchProducts = async () => {
      setLoading(true);
      const productsRef = collection(db, "products");
      const querySnapshot = await getDocs(productsRef);
      const allProducts = querySnapshot.docs.map((doc) => doc.data());
      setProducts(allProducts); // Salva tutti i prodotti nello stato
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <HeaderBar />
      <div id="productList">
        { loading ? <LoadingEffect /> :
        products.map((product, index) => (
          <ProductCard
            key={index}
            productImg={product.productImg}
            productName={product.productName}
            productDescription={product.productDescription}
            productPrice={product.productPrice}
            productAmount={product.productAmount}
            prodLink={product.prodLink} />
        ))}
      </div>
      <FooterBar />
    </>
  );
}

export default App;


// import { addDoc } from "firebase/firestore";

// const addTestProducts = async () => {
//   // Collezione di prodotti
//   const productsRef = collection(db, "products");

//   // Crea un array con 12 oggetti di esempio
//   const products = [
//     { productImg: "https://via.placeholder.com/150", productName: "Vite", productDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi architecto impedit commodi, molestiae similique autem.", productPrice: "$10.00", productAmount: "Al pezzo", prodLink: "https://raw.githubusercontent.com/emanueleciotola/FertabProdottiImmagini/main/vite.jpg" },
//     { productImg: "https://via.placeholder.com/150", productName: "Cane cane", productDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi architecto impedit commodi, molestiae similique autem. 2", productPrice: "$12.00", productAmount: "8 pezzi", prodLink: "https://raw.githubusercontent.com/emanueleciotola/FertabProdottiImmagini/main/vite.jpg" },
//     { productImg: "https://via.placeholder.com/150", productName: "Barbabietola", productDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi architecto impedit commodi, molestiae similique autem. 3", productPrice: "$15.00", productAmount: "Al pezzo", prodLink: "https://raw.githubusercontent.com/emanueleciotola/FertabProdottiImmagini/main/vite.jpg" },
//     { productImg: "https://via.placeholder.com/150", productName: "Tostapane", productDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi architecto impedit commodi, molestiae similique autem. 4", productPrice: "$8.00", productAmount: "8 pezzi", prodLink: "https://raw.githubusercontent.com/emanueleciotola/FertabProdottiImmagini/main/vite.jpg" },
//     { productImg: "https://via.placeholder.com/150", productName: "Penna", productDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi architecto impedit commodi, molestiae similique autem. 5", productPrice: "$11.00", productAmount: "Al pezzo", prodLink: "https://raw.githubusercontent.com/emanueleciotola/FertabProdottiImmagini/main/vite.jpg" },
//     { productImg: "https://via.placeholder.com/150", productName: "Orco", productDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi architecto impedit commodi, molestiae similique autem. 6", productPrice: "$9.00", productAmount: "8 pezzi", prodLink: "https://raw.githubusercontent.com/emanueleciotola/FertabProdottiImmagini/main/vite.jpg" },
//     { productImg: "https://via.placeholder.com/150", productName: "Disegno", productDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi architecto impedit commodi, molestiae similique autem. 7", productPrice: "$20.00", productAmount: "Al pezzo", prodLink: "https://raw.githubusercontent.com/emanueleciotola/FertabProdottiImmagini/main/vite.jpg" },
//     { productImg: "https://via.placeholder.com/150", productName: "Microfono", productDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi architecto impedit commodi, molestiae similique autem. 8", productPrice: "$13.00", productAmount: "8 pezzi", prodLink: "https://raw.githubusercontent.com/emanueleciotola/FertabProdottiImmagini/main/vite.jpg" },
//     { productImg: "https://via.placeholder.com/150", productName: "Patate", productDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi architecto impedit commodi, molestiae similique autem. 9", productPrice: "$17.00", productAmount: "Al pezzo", prodLink: "https://raw.githubusercontent.com/emanueleciotola/FertabProdottiImmagini/main/vite.jpg" },
//     { productImg: "https://via.placeholder.com/150", productName: "Legno", productDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi architecto impedit commodi, molestiae similique autem. 10", productPrice: "$25.00", productAmount: "8 pezzi", prodLink: "https://raw.githubusercontent.com/emanueleciotola/FertabProdottiImmagini/main/vite.jpg" },
//     { productImg: "https://via.placeholder.com/150", productName: "Sandali", productDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi architecto impedit commodi, molestiae similique autem. 11", productPrice: "$30.00", productAmount: "Al pezzo", prodLink: "https://raw.githubusercontent.com/emanueleciotola/FertabProdottiImmagini/main/vite.jpg" },
//     { productImg: "https://via.placeholder.com/150", productName: "Pesto", productDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi architecto impedit commodi, molestiae similique autem. 12", productPrice: "$18.00", productAmount: "8 pezzi", prodLink: "https://raw.githubusercontent.com/emanueleciotola/FertabProdottiImmagini/main/vite.jpg" }
//   ];

//   // Aggiungi ogni prodotto nel database
//   try {
//     for (let i = 0; i < products.length; i++) {
//       const product = products[i];
//       await addDoc(productsRef, product);
//       console.log(`Prodotto ${i + 1} aggiunto con successo!`);
//     }
//   } catch (e) {
//     console.error("Errore nell'aggiunta dei prodotti: ", e);
//   }
// };

// // Chiamata alla funzione per aggiungere i prodotti
// addTestProducts();
