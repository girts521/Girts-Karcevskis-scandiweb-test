import { Component } from "react";
import styles from './styles.module.scss'
import Attribute from "../Attribute/Attribute";

class CartItem extends Component {

    render() {
        return (
            <div className={styles.cartItem}>
            <div className={styles.productDescription}>
            <h2>Apollo</h2>
            <h4>Running Short</h4>

            <div className={styles.price}>$50.00</div>

            <Attribute text name={'Size'} items={['XS', 'S', 'M', 'L']} />
            <Attribute swatch name={'Colors'} items={['gray', 'black', 'green']} />
            </div>

            <div className={styles.productImg}>
                <div className={styles.btns}>
                    <div className={styles.add}>+</div>
                    <div className={styles.quantity} >1</div>
                    <div className={styles.delete}>-</div>
                </div>
                <img src="/Image.png" alt="" />
            </div>
            </div>
        )
    }
}

export default CartItem