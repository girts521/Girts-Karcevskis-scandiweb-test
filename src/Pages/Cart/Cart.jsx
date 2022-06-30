import { Component } from "react";
import styles from './styles.module.scss'

class Cart extends Component {

    render() {

        return(
            <div className={styles.container}>
            <h1>Cart</h1>

            <div className={styles.cartItem}>
            <h2>Apollo</h2>
            <h3>Running Short</h3>

            <div className={styles.price}>$50.00</div>
            
            </div>
            </div>
        )
    }
}

export default Cart