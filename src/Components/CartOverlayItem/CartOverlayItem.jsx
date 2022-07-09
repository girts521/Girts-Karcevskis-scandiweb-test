import { Component } from "react";
import styles from "./styles.module.scss";
import { gql } from "apollo-boost";
import { Query } from "@apollo/client/react/components";
import Attribute from '../Attribute/Attribute'

class CartOverlayItem extends Component {
  componentDidMount() {
    console.log(this.props.product);
  }

  render() {
    return (
      <div className={styles.container}>
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
              console.log(data.product);
              return (
                <>
                  <div className={styles.productsInfo}>
                    <h2>{data.product.brand}</h2>
                    <h2>{data.product.name}</h2>

                    <h4>
                      {data.product.prices[0].currency.symbol +
                        data.product.prices[0].amount}
                    </h4>

                    {this.props.product.attributes.length &&
                      this.props.product.attributes.map((attr) => {
                        if (attr.attrType === "text") {
                          return (
                            <div className={styles.attribute}>
                             <Attribute text  name={attr.attrName} items={[{value: attr.attrValue, displayValue: attr.attrValue}]} />
                            </div>
                          );
                        }
                        if (attr.attrType === "swatch") {
                          return (
                            <>
                             <Attribute swatch  name={attr.attrName} items={[{value: attr.attrValue, displayValue: attr.attrValue}]} />
                            </>
                          );
                        }
                      })}

                    
                  </div>

                  <div className={styles.productsImg}>
                    <div className={styles.controls}>
                      <div className={styles.add}>+</div>
                      <div className={styles.quantity}>
                        {this.props.product.quantity}
                      </div>
                      <div className={styles.remove}>-</div>
                    </div>

                    <img src="/Image.png" alt="" />
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

export default CartOverlayItem;
