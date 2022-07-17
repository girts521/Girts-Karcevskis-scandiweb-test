import { Component } from "react";
import CartOverlayItem from "../../Components/CartOverlayItem/CartOverlayItem";
import GreenBtn from "../../Components/GreenBtn/GreenBtn";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import { mapStateToProps } from "../../store/index";
import { WithRouter } from "../../utils/withRouter";
import { updateAllPrices, calculateTotal } from "../../utils/allPrices";

class CartOverlay extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      symbol: "",
      prices: [],
      total: 0,
    };
  }

  async componentDidMount() {
    const storedCart = this.props.cart;
    this.setState({ cart: storedCart });
    const priceData = await updateAllPrices(
      this.props.cart,
      this.props.selectedCurrency
    );
    const total = calculateTotal(priceData.prices);
    this.setState({
      symbol: priceData.symbol,
      total,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.selectedCurrency != this.props.selectedCurrency ||
      prevProps.cart != this.props.cart
    ) {
      const priceData = await updateAllPrices(
        this.props.cart,
        this.props.selectedCurrency
      );
      const total = calculateTotal(priceData.prices);
      this.setState({
        symbol: priceData.symbol,
        total,
      });
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>My bag</h1>

        <div className={styles.productsContainer}>
          {this.state.cart.length
            ? this.props.cart.map((item) => {
                return (
                  <CartOverlayItem
                    key={item.productId + Math.random()}
                    product={item}
                  />
                );
              })
            : "Nothing here yet..."}
        </div>

        <div className={styles.total}>
          <p>Total</p>
          <p className={styles.totalPrice}>
            {this.state.symbol && this.state.symbol}
            {this.state.total && this.state.total.toFixed(2)}
          </p>
        </div>

        <div className={styles.btns}>
          <GreenBtn
            func={() => {
              this.props.navigate("/cart");
            }}
            text={"VIEW BAG"}
          />
          <GreenBtn text={"CHECK OUT"} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(WithRouter(CartOverlay));
