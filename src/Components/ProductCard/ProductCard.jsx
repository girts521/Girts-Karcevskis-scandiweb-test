import { Component } from "react";
import { WithRouter } from "../../utils/withRouter";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import {currencyActions} from '../../store/currency'
import {mapStateToProps} from '../../store/index'

class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      cartVisible: false,
    };
  }

  componentDidMount() {
// console.log(this.props.product.prices[this.props.selectedCurrency])
console.log(this.props.product.prices[this.props.selectedCurrency].currency.symbol)
  }

  showCart() {
    this.setState({ cartVisible: true });
  }

  hideCart() {
    this.setState({ cartVisible: false });
  }

  navigateToProduct(){
    this.props.navigate(`/product/${this.props.product.id}`)
  }

  render() {
    return (
      <div
        onMouseEnter={this.showCart.bind(this)}
        onMouseLeave={this.hideCart.bind(this)}
        className={`${styles.container} `} 
        onClick={this.navigateToProduct.bind(this)}
      >
        {this.props.product.inStock ? '' : <div className={styles.outOfStock}>OUT OF STOCK</div> }
        {this.props.discount && <div className={styles.discount}>{this.props.discount}</div>}
        <img src={this.props.product.gallery[0]} alt="" />
        <div className={styles.text}>
          <p className={styles.name}>{this.props.product.name}</p>


          <p className={styles.price}> { `${this.props.product.prices[this.props.selectedCurrency].currency.symbol}${this.props.product.prices[this.props.selectedCurrency].amount}`}</p>
        </div>

        {this.state.cartVisible && !this.props.outOfStock &&(
          <>
            <div className={styles.cartIcon}>
              <svg
                width="74"
                height="74"
                viewBox="0 0 74 74"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_150_263)">
                  <circle cx="37" cy="33" r="26" fill="#5ECE7B" />
                  <path
                    d="M48.4736 26.8484C48.0186 26.2925 47.3109 25.9546 46.5785 25.9546H31.1907L30.711 24.1669C30.4326 23.1277 29.4732 22.4028 28.3608 22.4028H25.7837C25.3544 22.4028 25 22.7407 25 23.1523C25 23.5628 25.3534 23.9017 25.7837 23.9017H28.3608C28.7398 23.9017 29.0685 24.1433 29.1692 24.5058L32.2517 36.2494C32.53 37.2886 33.4894 38.0135 34.6018 38.0135H44.6833C45.7947 38.0135 46.7808 37.2886 47.0335 36.2494L48.9286 28.807C49.1053 28.1293 48.9543 27.4044 48.4736 26.8485L48.4736 26.8484ZM47.3879 28.4671L45.4928 35.9095C45.3921 36.272 45.0634 36.5136 44.6844 36.5136H34.6018C34.2228 36.5136 33.8941 36.272 33.7935 35.9095L31.5953 27.4772H46.5796C46.8323 27.4772 47.085 27.598 47.237 27.7915C47.388 27.984 47.463 28.2257 47.388 28.4673L47.3879 28.4671Z"
                    fill="white"
                  />
                  <path
                    d="M35.1332 38.9778C33.6932 38.9778 32.5059 40.1132 32.5059 41.4902C32.5059 42.8672 33.6933 44.0027 35.1332 44.0027C36.5733 44.0036 37.7606 42.8682 37.7606 41.491C37.7606 40.1137 36.5732 38.9775 35.1332 38.9775V38.9778ZM35.1332 42.4814C34.5519 42.4814 34.0968 42.0463 34.0968 41.4903C34.0968 40.9344 34.5519 40.4993 35.1332 40.4993C35.7146 40.4993 36.1696 40.9344 36.1696 41.4903C36.1687 42.0227 35.689 42.4814 35.1332 42.4814Z"
                    fill="white"
                  />
                  <path
                    d="M43.8251 38.978C42.3851 38.978 41.1978 40.1135 41.1978 41.4905C41.1978 42.8675 42.3852 44.0029 43.8251 44.0029C45.2651 44.0029 46.4525 42.8675 46.4525 41.4905C46.4279 40.1143 45.2651 38.978 43.8251 38.978ZM43.8251 42.4816C43.2438 42.4816 42.7887 42.0465 42.7887 41.4906C42.7887 40.9346 43.2438 40.4995 43.8251 40.4995C44.4065 40.4995 44.8615 40.9346 44.8615 41.4906C44.8615 42.0229 44.3809 42.4816 43.8251 42.4816Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_150_263"
                    x="0"
                    y="0"
                    width="74"
                    height="74"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="5.5" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.113725 0 0 0 0 0.121569 0 0 0 0 0.133333 0 0 0 0.1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_150_263"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_150_263"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <div className={styles.heart}> 
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99956 19C9.81618 19 9.6328 18.9421 9.48018 18.8262L9.03771 18.4902C4.97368 15.4106 2.52097 13.5512 1.0932 11.0705C-0.275664 8.69999 -0.111231 6.82761 0.266186 5.67502C0.726411 4.27427 1.76165 3.14698 3.18376 2.50051C3.91494 2.16915 4.70999 2 5.54409 2C7.30812 2 8.93845 2.73572 9.99974 3.94875C11.061 2.73572 12.6902 2 14.4554 2C15.2895 2 16.0834 2.168 16.8145 2.49936C18.2367 3.14585 19.2731 4.27202 19.7333 5.67387C20.1119 6.8255 20.2752 8.6977 18.9063 11.0693C17.4771 13.5499 15.021 15.4118 10.9521 18.4959L10.5202 18.8261C10.3664 18.9419 10.183 19 9.99956 19ZM5.54391 3.6637C4.95708 3.6637 4.40339 3.77956 3.89701 4.00897C2.91029 4.45734 2.19449 5.22898 1.88217 6.18364C1.48818 7.3828 1.72718 8.79049 2.57073 10.2527C3.82247 12.4274 6.02082 14.1017 9.99823 17.1175C13.9759 14.1029 16.1742 12.4265 17.4257 10.2539C18.2705 8.79058 18.5083 7.38289 18.1155 6.18364C17.8019 5.23013 17.0862 4.45734 16.0994 4.00897C15.5942 3.77957 15.0406 3.6637 14.4537 3.6637C12.8601 3.6637 11.3789 4.53034 10.7683 5.81983C10.6299 6.11412 10.3282 6.30181 9.99807 6.30181C9.66679 6.30181 9.36748 6.11412 9.22785 5.81983C8.61855 4.53031 7.13757 3.6637 5.54391 3.6637Z"
                  fill="#43464E"
                />
              </svg>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(WithRouter(ProductCard));
