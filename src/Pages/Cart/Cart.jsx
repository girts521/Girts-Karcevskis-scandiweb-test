import { Component } from "react";
import styles from "./styles.module.scss";
import CartItem from "../../Components/CartItem/CartItem";
import GreenBtn from "../../Components/GreenBtn/GreenBtn";
import { connect } from "react-redux";
import { mapStateToProps } from "../../store/index";
import Notification from "../../Components/Notification/Notification";
import Loading from "../Loading/Loading";
import PriceSummary from "../../Components/PriceSummary/PriceSummary";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      isEmpty: false,
    };
  }

  componentDidMount() {
    if (this.props.cart.length === 0) {
      this.setState({ isEmpty: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    if (prevProps.cart.length != this.props.cart.length) {
      if (this.props.cart.length === 0) {
        this.setState({ isEmpty: true });
      } else {
        this.setState({ isEmpty: false });
      }
    }
  }

  render() {
    return (
      <>
        {this.state.isEmpty && (
          <Notification
            text={
              "Sorry, but the cart is empty. Feel free to browse our products :)"
            }
          />
        )}

        <div className={styles.container}>
          <h1>Cart</h1>

          <div className={styles.productsContaner}>
            {this.props.cart ? (
              this.props.cart.map((item) => {
                return (
                  <CartItem
                    key={item.productId + Math.random()}
                    product={item}
                  />
                );
              })
            ) : (
              <Loading />
            )}
          </div>

          {!this.state.isEmpty && (
            <div className={styles.cartSummary}>
              <PriceSummary />
              <GreenBtn text={"ORDER"} />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(Cart);

//I need:
//selected currency from redux state
// the items in the cart
// price of each item
//then I can go over each item
