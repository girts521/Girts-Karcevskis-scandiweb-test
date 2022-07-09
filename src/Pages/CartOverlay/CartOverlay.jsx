import { Component } from "react";
import CartItem from "../../Components/CartItem/CartItem";
import Color from "../../Components/Color/Color";
import Size from "../../Components/Attribute/Attribute";
import CartOverlayItem from "../../Components/CartOverlayItem/CartOverlayItem";
import GreenBtn from "../../Components/GreenBtn/GreenBtn";
import styles from './styles.module.scss'

import { connect } from "react-redux";
import {cartActions} from '../../store/cart'
import {mapStateToProps} from '../../store/index'

class CartOverlay extends Component {

    constructor() {
        super();
        this.state = {
          cart: [],
        };
      }

    componentDidMount() {
        const storedCart = this.props.cart
        this.setState({cart: storedCart})
    }

    render() {

        return (
            <div className={styles.container}>
            <h1>My bag</h1>

            <div className={styles.productsContainer}>

                {this.state.cart.length ? this.state.cart.map((item) => {
                    return <CartOverlayItem key={item.productId + Math.random()} product={item} />
                }) : 'Nothing'}

           

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

export default connect(mapStateToProps)(CartOverlay); 