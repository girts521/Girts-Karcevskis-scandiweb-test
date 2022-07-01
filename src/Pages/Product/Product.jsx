import { Component } from "react";
import styles from "./styles.module.scss";

import Size from "../../Components/Size/Size";
import Color from "../../Components/Color/Color";
import GreenBtn from "../../Components/GreenBtn/GreenBtn";

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

          <Size sizes={['XS', 'S', 'M', 'L']} />

          <Color colors={['gray', 'black', 'green']} />

            <div className={styles.price}>
              <h3>PRICE</h3>
              <p>$50.00</p>
            </div>

            <GreenBtn text={'ADD TO CART'} />

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
