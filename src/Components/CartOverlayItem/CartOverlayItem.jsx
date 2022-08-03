import { Component } from "react";
import styles from "./styles.module.scss";
import {cartItemGQL} from "../../utils/gql"
import { Query } from "@apollo/client/react/components";
import Attribute from "../Attribute/Attribute";
import { connect } from "react-redux";
import { mapStateToProps } from "../../store/index";
import { cartActions } from "../../store/cart";
import Loading from "../Loading/Loading";

class CartOverlayItem extends Component {
  changeQuantity(action) {
    this.props.dispatch(
      cartActions.changeQuantity({
        id: this.props.product.id,
        action: action,
      })
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <Query
          query={cartItemGQL(this.props.product.productId)}
        >
          {({ loading, data }) => {
            if (loading) return <Loading />;
            if (data.product) {
              return (
                <>
                  <div className={styles.productsInfo}>
                    <h2>{data.product.brand}</h2>
                    <h2>{data.product.name}</h2>

                    <h4>
                      {data.product.prices[this.props.selectedCurrency].currency
                        .symbol +
                        data.product.prices[this.props.selectedCurrency].amount}
                    </h4>

                    {data.product.attributes.map((attr) => {
                      if (attr.type === "text") {
                        const attributes = [];
                        attr.items.forEach((item) => {
                          
                          for (let i = 0; i < this.props.product.attributes.length; i++){
                            if(item.value === this.props.product.attributes[i].attrValue){
                              attributes.push({
                                value: item.value,
                                displayValue: item.displayValue,
                                selected: true
                              });
                              return
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
                          for (let i = 0; i < this.props.product.attributes.length; i++){
                            if(item.value === this.props.product.attributes[i].attrValue){
                              attributes.push({
                                value: item.value,
                                displayValue: item.displayValue,
                                selected: true
                              });
                              return
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

                    {/* {this.props.product.attributes.length &&
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
                      })} */}
                  </div>

                  <div className={styles.productsImg}>
                    <div className={styles.controls}>
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
                        className={styles.remove}
                      >
                        -
                      </div>
                    </div>

                    <img src={data.product.gallery[0]} alt="" />
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

export default connect(mapStateToProps)(CartOverlayItem);
