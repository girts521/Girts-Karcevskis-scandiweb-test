import { Component } from "react";
import styles from './styles.module.scss'
import CartItem from "../../Components/CartItem/CartItem";
import GreenBtn from "../../Components/GreenBtn/GreenBtn";
import { connect } from "react-redux";
import {mapStateToProps} from '../../store/index'


class Cart extends Component {

    componentDidMount() {
        console.log(this.props.cart)
    }

    render() {

        return(
            <div className={styles.container}> 
            <h1>Cart</h1>

            <button onClick={() => console.log(this.props.cart)}>test</button>
 
            <div className={styles.productsContaner}>
            {this.props.cart ? this.props.cart.map((item) =>{
                return   <CartItem key={item.productId + Math.random()} product={item} />
            }) : 'loading'}

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

export default  connect(mapStateToProps)(Cart); 