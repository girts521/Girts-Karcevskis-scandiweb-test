import { Component } from "react";
import CartItem from "../../Components/CartItem/CartItem";
import Color from "../../Components/Color/Color";
import Size from "../../Components/Attribute/Attribute";
import CartOverlayItem from "../../Components/CartOverlayItem/CartOverlayItem";
import GreenBtn from "../../Components/GreenBtn/GreenBtn";
import styles from './styles.module.scss'

class CartOverlay extends Component {

    render() {

        return (
            <div className={styles.container}>
            <h1>My bag</h1>

            <div className={styles.productsContainer}>

            <CartOverlayItem />
            <CartOverlayItem />
            <CartOverlayItem />
            <CartOverlayItem />
            <CartOverlayItem />
            <CartOverlayItem />
            </div>

            <div className={styles.total}>
            <p>Total</p>
            <p className={styles.totalPrice}>$200.00</p>
            </div>

            <div className={styles.btns}>
                {/* <div className={styles.whiteBtn}>VIEW BAG</div> */}
                <GreenBtn text={'VIEW BAG'} />
                <GreenBtn text={'CHECK OUT'} />

            </div>

            </div>
        )
    }
}

export default CartOverlay 