import { Component } from "react";
import styles from "./styles.module.scss";
import Attribute from "../Attribute/Attribute";
import { gql } from "apollo-boost";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import {mapStateToProps} from '../../store/index'
import {cartActions} from '../../store/cart'


//TODO:
//seems to have a lot in common with cart overlay item so should be considered to combine them?

class CartItem extends Component {
  constructor() {
    super();
    this.state = {
      photoIndex: 0,
    };
  }

  componentDidMount(){
    console.log(this.props)
  }

  changeQuantity(action){
   this.props.dispatch(cartActions.changeQuantity({
    id: this.props.product.id,
    action: action
   }))
  }

  nextPhoto(length) {
    console.log(length);
    this.setState((prevState) => {
      if (prevState.photoIndex === length - 1) {
        return { photoIndex: 0 };
      }
      return { photoIndex: prevState.photoIndex + 1 };
    });
  }

  render() {
    return (
      <div className={styles.cartItem}>
        <Query
          query={gql`
            query {
              product(id: "${this.props.product.productId}") {
                name
                brand 
                gallery
                prices {
                  currency {
                    label
                    symbol
                  }
                  amount
                }
              }
            }
          `}
        >
          {({ loading, data }) => {
            if (loading) return "Loading...";
            if (data.product) {
              return (
                <>
                  <div className={styles.productDescription}>
                    <h2>{data.product.brand}</h2>
                    <h4>{data.product.name}</h4>

                    <div className={styles.price}>
                      {data.product.prices[0].currency.symbol +
                        data.product.prices[0].amount}
                    </div>

                    {/* it does repeat between cart overlay item and this, so could be made into a seperate component */}
                    {this.props.product.attributes.length &&
                      this.props.product.attributes.map((attr) => {
                        if (attr.attrType === "text") {
                          return (
                            <div
                              key={attr.attrValue + Math.random()}
                              className={styles.attribute}
                            >
                              <Attribute
                                text
                                name={attr.attrName}
                                items={[
                                  {
                                    value: attr.attrValue,
                                    displayValue: attr.attrValue,
                                  },
                                ]}
                              />
                            </div>
                          );
                        }
                        if (attr.attrType === "swatch") {
                          return (
                            <Attribute
                              key={attr.attrValue + Math.random()}
                              swatch
                              name={attr.attrName}
                              items={[
                                {
                                  value: attr.attrValue,
                                  displayValue: attr.attrValue,
                                },
                              ]}
                            />
                          );
                        }
                      })}
                  </div>

                  <div className={styles.productImg}>
                    <div className={styles.btns}>
                      <div onClick={() => {this.changeQuantity('add')}} className={styles.add}>+</div>
                      <div className={styles.quantity}>
                        {this.props.product.quantity}
                      </div>
                      <div onClick={() => {this.changeQuantity('remove')}} className={styles.delete}>-</div>
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

export default  connect(mapStateToProps)(CartItem);
