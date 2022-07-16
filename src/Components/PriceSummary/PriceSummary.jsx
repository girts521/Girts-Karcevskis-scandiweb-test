import { Component } from "react";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import { mapStateToProps } from "../../store/index";
import { calculateTotal, updateAllPrices } from "../../utils/allPrices";

let priceData;

class PriceSummary extends Component {
  constructor() {
    super();
    this.state = {
      prices: [],
      total: null,
      symbol: "",
    };
  }

  async componentDidMount() {
    priceData = await updateAllPrices(
      this.props.cart,
      this.props.selectedCurrency
    );
    const total = calculateTotal(priceData.prices);

    this.setState({
      total: total,
      symbol: priceData.symbol,
      prices: priceData.prices,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.selectedCurrency != this.props.selectedCurrency ||
      prevProps.cart != this.props.cart
    ) {
      priceData = await updateAllPrices(
        this.props.cart,
        this.props.selectedCurrency
      );
      const total = calculateTotal(priceData.prices);
      this.setState({ 
        total: total,
        prices: priceData.prices,
        symbol: priceData.symbol,
      });
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          <p>Tax 21%:</p>
          <div className={styles.summaryPrice}>
            {this.state.symbol && this.state.symbol}
            {this.state.total && (this.state.total * 0.2).toFixed(2)}
          </div>
        </div>
        <div>
          <p>Quantity:</p>
          <div className={styles.summaryPrice}>
            {this.state.prices && this.state.prices.length}
          </div>
        </div>
        <div>
          <p>Total:</p>
          <div className={styles.summaryPrice}>
            {this.state.symbol && this.state.symbol}{" "}
            {this.state.total && this.state.total.toFixed(2)}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PriceSummary);
