import { Component } from "react";
import styles from './styles.module.scss'

class CartOverlayItem extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.productsInfo}>
          <h2>Apollo</h2>
          <h2>Running Short</h2>

          <h4>$50.00</h4>

          <p>SIZE:</p>
          <div className={styles.sizes}>
            <div className={`${styles.size} ${styles.chosenSize}`}>XS</div>
            <div className={styles.size}>S</div>
            <div className={styles.size}>M</div>
            <div className={styles.size}>L</div>
          </div>

          <p>COLOR:</p>
          <div className={styles.colors}>
            <div className={styles.gray}></div>
            <div className={styles.black}></div>
            <div className={styles.green}></div>
          </div>
        </div>

        <div className={styles.productsImg}>
          <div className={styles.controls}>
            <div className={styles.add}>+</div>
            <div className={styles.quantity}>1</div>
            <div className={styles.remove}>-</div>
          </div>

          <img src="/Image.png" alt="" />
        </div>
      </div>
    );
  }
}

export default CartOverlayItem
