import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

function Home() {
  const [products, setProduct] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const Navigate = useNavigate();
  const minPriceRef = useRef('');
  const maxPriceRef = useRef('');

  async function GetData(url) {
    try {
      const response = await fetch(url);
      let data = [];
      if (response.status == 200) {
        data = await response.json();
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetData("https://cars-pagination.onrender.com/products")
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleClick(event) {
    Navigate(`/product/${event}`);
  }

  useEffect(() => {
    GetData("https://cars-pagination.onrender.com/products")
      .then((data) => {
        setProduct(data);
        setFilterProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleSelect(event) {
    if (event.target.value === "all") {
      setFilterProducts(products);
    } else {
      const filter = products.filter(
        (product) => product.category === event.target.value
      );
      setFilterProducts(filter);
    }
  }

  function handlePriceFilter(event) {
    event.preventDefault()

    const minPrice = parseFloat(minPriceRef.current.value) * 100 || 0;
    const maxPrice = parseFloat(maxPriceRef.current.value) * 100 || Infinity;

    const filtered = products.filter(product => {
      return product.newPrice >= minPrice && product.newPrice <= maxPrice;
    });

    setFilterProducts(filtered);
    
  }

  return (
    <div className={styles.container}>
      <h1>WELCOME HOME PAGE</h1>
      <header>
        <h2>Products information</h2>

        <span>
          <form>
            <input ref={minPriceRef} type="number" placeholder="Min price" />
            <input ref={maxPriceRef} type="number" placeholder="Max price" />
            <button onClick={handlePriceFilter}>filter</button>
          </form>
        </span>

        <select id={styles.select} onChange={handleSelect}>
          <option value="all">Kategory</option>
          <option value="не популярен">не популярен</option>
          <option value="известный">известный</option>
          <option value="средний">средний</option>
        </select>
      </header>

      <div className={styles.wrapper}>
        {filterProducts.length > 0 &&
          filterProducts.map(function (product, index) {
            return (
              <div
                key={index}
                onClick={() => handleClick(product.id)}
                className={styles.card}
              >
                <img src={product.image} alt="picture" />
                <span>
                  <h5>{product.newPrice / 100 + "$"}</h5>
                  <h5>{product.oldPrice / 100 + "$"}</h5>
                </span>
                <h3>{product.name}</h3>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
