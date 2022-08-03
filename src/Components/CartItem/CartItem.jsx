import { Component } from "react";
import styles from "./styles.module.scss";
import Attribute from "../Attribute/Attribute";
import Loading from "../Loading/Loading";
import {cartItemGQL} from "../../utils/gql"
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import { mapStateToProps } from "../../store/index";
import { cartActions } from "../../store/cart";

//TODO:
//seems to have a lot in common with cart overlay item so should be considered to combine them?

class CartItem extends Component {
  constructor() {
    super();
    this.state = {
      photoIndex: 0,
    };
  }

  componentDidMount() {
    console.log(this.props.product.attributes);
  }

  changeQuantity(action) {
    this.props.dispatch(
      cartActions.changeQuantity({
        id: this.props.product.id,
        action: action,
      })
    );
  }

  nextPhoto(length) {
    this.setState((prevState) => {
      if (prevState.photoIndex === length - 1) {
        return { photoIndex: 0 };
      }
      return { photoIndex: prevState.photoIndex + 1 };
    });
  }

  render() {
    console.log(cartItemGQL(this.props.product.productId))
    return (
      <div className={styles.cartItem}>
        <Query
          query={cartItemGQL(this.props.product.productId)}
        >
          {({ loading, data }) => {
            if (loading) return <Loading />;
            if (data.product) {
              return (
                <>
                  <div className={styles.productDescription}>
                    <h2>{data.product.brand}</h2>
                    <h4>{data.product.name}</h4>

                    <div className={styles.price}>
                      {data.product.prices[this.props.selectedCurrency].currency
                        .symbol +
                        data.product.prices[this.props.selectedCurrency].amount}
                    </div>

                    {/* it does repeat between cart overlay item and this, so could be made into a seperate component */}

                    {data.product.attributes.map((attr) => {
                      if (attr.type === "text") {
                        const attributes = [];
                        attr.items.forEach((item) => {
                          for (
                            let i = 0;
                            i < this.props.product.attributes.length;
                            i++
                          ) {
                            if (
                              item.value ===
                              this.props.product.attributes[i].attrValue
                            ) {
                              attributes.push({
                                value: item.value,
                                displayValue: item.displayValue,
                                selected: true,
                              });
                              return;
                            }
                          }
                          attributes.push({
                            value: item.value,
                            displayValue: item.displayValue,
                          });
                        });
                        return (
                          <div
                            key={attr.name + Math.random()}
                            className={styles.attribute}
                          >
                            <Attribute
                              text
                              name={attr.name}
                              items={attributes}
                            />
                          </div>
                        );
                      }
                      if (attr.type === "swatch") {
                        const attributes = [];
                        attr.items.forEach((item) => {
                          for (
                            let i = 0;
                            i < this.props.product.attributes.length;
                            i++
                          ) {
                            if (
                              item.value ===
                              this.props.product.attributes[i].attrValue
                            ) {
                              attributes.push({
                                value: item.value,
                                displayValue: item.displayValue,
                                selected: true,
                              });
                              return;
                            }
                          }
                          attributes.push({
                            value: item.value,
                            displayValue: item.displayValue,
                          });
                        });
                        return (
                          <div
                            key={attr.name + Math.random()}
                            className={styles.attribute}
                          >
                            <Attribute
                              swatch
                              name={attr.name}
                              items={attributes}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>

                  <div className={styles.productImg}>
                    <div className={styles.btns}>
                      <div
                        onClick={() => {
                          this.changeQuantity("add");
                        }}
                        className={styles.add}
                      >
                        +
                      </div>
                      <div className={styles.quantity}>
                        {this.props.product.quantity}
                      </div>
                      <div
                        onClick={() => {
                          this.changeQuantity("remove");
                        }}
                        className={styles.delete}
                      >
                        -
                      </div>
                    </div>
                    {data.product.gallery.length > 1 && (
                      <div className={styles.arrows}>
                        <div className={styles.arrowLeft}>
                          <svg
                            width="18"
                            height="19"
                            viewBox="0 0 18 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.25 4.06857L5.625 9.6876L11.25 15.3066"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>

                        <div
                          onClick={() => {
                            this.nextPhoto(data.product.gallery.length);
                          }}
                          className={styles.arrowRight}
                        >
                          <svg
                            width="18"
                            height="19"
                            viewBox="0 0 18 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.25 4.06857L5.625 9.6876L11.25 15.3066"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                    <img
                      src={data.product.gallery[this.state.photoIndex]}
                      alt=""
                    />
                  </div>
                </>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CartItem);
