import { Component } from "react";
import CartItem from "../../Components/CartItem/CartItem";
import Color from "../../Components/Color/Color";
import Size from "../../Components/Size/Size";
import styles from './styles.module.scss'

class CartOverlay extends Component {

    render() {

        return (
            <div className={styles.container}>
            <h1>My bag</h1>

            <div className={styles.productsContainer}>
                <h2>Apollo</h2>
                <h2>Running Short</h2>

                <h4>$50.00</h4>

                <Size sizes={['XS', 'S', 'M', 'L']} />
            <Color colors={['gray', 'black', 'green']} />
            </div>

            </div>
        )
    }
}

export default CartOverlay 