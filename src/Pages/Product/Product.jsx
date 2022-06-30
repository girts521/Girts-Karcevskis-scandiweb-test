import { Component } from "react";
import styles from "./styles.module.scss";

class Product extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.sideImages}>
        <img src="/Image.png" alt="" />
        <img src="/Image.png" alt="" />
        <img src="/Image.png" alt="" />
        </div>
        <div className={styles.infoContainer}>
          
            <img className={styles.mainImage} src="/Image.png" alt="" />
          
          <div className={styles.productInfo}>
            <h1>Apollo</h1>
            <h2>Running Short</h2>
            <h3>SIZE:</h3>
            <div className={styles.size}>
              <div>XS</div>
              <div>S</div>
              <div>M</div>
              <div>L</div>
            </div>

            <h3>COLOR</h3>
            <div className={styles.color}>
              <div className={styles.gray}></div>
              <div className={styles.black}></div>
              <div className={styles.green}></div>
            </div>

            <div className={styles.price}>
              <h3>PRICE</h3>
              <p>$50.00</p>
            </div>

            <div className={styles.addToCartBtn}>ADD TO CART</div>

            <p className={styles.description}>
              Find stunning women's cocktail dresses and party dresses. Stand
              out in lace and metallic cocktail dresses and party dresses from
              all your favorite brands.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
