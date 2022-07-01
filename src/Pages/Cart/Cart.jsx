import { Component } from "react";
import styles from './styles.module.scss'
import CartItem from "../../Components/CartItem/CartItem";
import GreenBtn from "../../Components/GreenBtn/GreenBtn";

class Cart extends Component {

    render() {

        return(
            <div className={styles.container}>
            <h1>Cart</h1>

            <div className={styles.productsContaner}>
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            </div>

            <div className={styles.cartSummary}>
            <div>
                <p>Tax 21%:</p>
                <div className={styles.summaryPrice}>$42.00</div>
            </div>

            <div>
                <p>Quantity</p>
                <div className={styles.summaryPrice}>3</div>
            </div>

            <div>
                <p>Total</p>
                <div className={styles.summaryPrice}>$200.00</div>
            </div>

            <GreenBtn text={'ORDER'} />
            </div>
            </div>
        )
    }
}

export default Cart