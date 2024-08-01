import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./index.module.css";

function Product() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`https://cars-pagination.onrender.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, [id]);

  function handleCanel() {
    navigate("/");
  }

  const [counterState, setCounterState] = useState(0);

  function PlusClick() {
    setCounterState(counterState + 1);
  }

  function MinusClick() {
    if(counterState > 0) {
      setCounterState(counterState - 1);
    }
  }

  function saveClick() {
    const productToSave = {
      ...product,
      count: counterState,
    };
    localStorage.setItem("product", JSON.stringify(productToSave));
    alert("Product saved successfully!");
  }

  return (
    <div className={styles.details}>
      <img src={product.image} alt="picture" />
      <div className={styles.wrap}>
        <h1>{product.name}</h1>
        <p className={styles.comment}>comments({product.comments})</p>
        <span>
          <p className={styles.new}>{product.newPrice / 1000}₽</p>
          <p className={styles.price}>{product.oldPrice / 1000}₽</p>
        </span>
        <h3> Category:{product.category}</h3>
        <div className={styles.counter}>
          <span>
            <button onClick={PlusClick}>count+</button>
            <button onClick={MinusClick}>count-</button>
          </span>
          <h2>{counterState}</h2>
        </div>
      </div>

      <button className={styles.save}  onClick={saveClick}>SAVE</button>

      <button className={styles.canel} onClick={handleCanel}>
        Back{" "}
      </button>
    </div>
  );
}

export default Product;
