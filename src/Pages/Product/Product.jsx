import { Component } from "react";
import styles from "./styles.module.scss";
import { gql } from "apollo-boost";
import { Query } from "@apollo/client/react/components";
import { WithRouter } from "../../utils/withRouter";
import parse from "html-react-parser";
import Attribute from "../../Components/Attribute/Attribute";
import GreenBtn from "../../Components/GreenBtn/GreenBtn";
import Notification from "../../Components/Notification/Notification";
import { connect } from "react-redux";
import { cartActions } from "../../store/cart";
import { mapStateToProps } from "../../store/index";
import Loading from "../../Components/Loading/Loading";

class Product extends Component {
  constructor() {
    super();
    this.state = {
      mainPhoto: "",
      cart: "",
      attributes: [],
      defaultAttributes: [],
      showNotification: false,
      missingAttribute: false,
      outOfStock: false
    };
  }

  setMainPhoto(e) {
    this.setState({ mainPhoto: e.target.src });
  }

  addToCart(defaultAttributes, inStock) {
    if (inStock === false) {
      this.setState({outOfStock: true})
      setTimeout(() => {
        this.setState({ outOfStock: false });
      }, 3000);
      return
    };
    if (
      this.state.attributes.length &&
      this.state.attributes.length != defaultAttributes.length
    ) {
      this.setState({ missingAttribute: true });
      setTimeout(() => {
        this.setState({ missingAttribute: false });
      }, 2000);
      return;
    }

    const attributes = this.state.attributes.length
      ? this.state.attributes
      : defaultAttributes;

    this.props.dispatch(
      cartActions.addToCart({
        id: this.props.params.productId + Math.random(),
        productId: this.props.params.productId,
        attributes: attributes,
        quantity: 1,
      })
    );
    this.setState({ attributes: [] });
    this.setState({ showNotification: true });
    setTimeout(() => {
      this.setState({ showNotification: false });
    }, 3000);
  }

  selectedAttr(e, selectedAttr) {
    const children = e.target.parentNode.children;
    let style = "";

    if (e.target.innerText.length > 0) {
      e.target.style = "background-color: black; color: white";
    } else if (e.target.innerText === "") {
      style = `background-color: ${e.target.style.backgroundColor};`;
      e.target.style = `${style}; border: 1px solid rgba(94, 206, 123, 1)`;
    }

    for (let i = 0; i < children.length; i++) {
      if (children[i] != e.target) {
        style =
          e.target.innerText === ""
            ? `background-color: ${children[i].style.backgroundColor}`
            : "";
        children[i].style = style;
      }
    }
    let attr;
    if (e.target.innerText === "") {
      attr = {
        attrName: e.target.parentNode.previousElementSibling.innerText,
        attrValue: selectedAttr,
        attrType: "swatch",
      };
    } else if (e.target.innerText.length > 0) {
      attr = {
        attrName: e.target.parentNode.previousElementSibling.innerText,
        attrValue: e.target.innerText,
        attrType: "text",
      };
    }

    if (attr) {
      const foundAttr = this.state.attributes.find(
        (item) => item.attrName === attr.attrName
      );
      if (!foundAttr) {
        this.state.attributes.push(attr);
      } else {
        const index = this.state.attributes.indexOf(foundAttr);
        this.state.attributes.splice(index, 1);
        this.state.attributes.push(attr);
      }
    }
  }

  render() {
    return (
      <div className={styles.container}>
        {this.state.showNotification && (
          <Notification
            text={"Thank you! The product has been added to the cart."}
          />
        )}
        {this.state.outOfStock && (
          <Notification
            text={"Sorry, the product is currently out of stock."}
          />
        )}
        {this.state.missingAttribute && (
          <Notification text={"Please select all attributes"} />
        )}

        <Query
          query={gql`
            query {
              product(id: "${this.props.params.productId}") {
                name
                inStock
                gallery
                description
                attributes {
                  name
                  type
                  items {
                    displayValue
                    value
                  }
                }
                brand
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
            if (loading) return <Loading size={"30%"} />;
            if (data.product) {
              return (
                <>
                  <div className={styles.sideImages}>
                    {data.product.gallery.map((photo) => {
                      return (
                        <img
                          key={photo}
                          onClick={this.setMainPhoto.bind(this)}
                          src={photo}
                          alt={data.product.name}
                        />
                      );
                    })}
                  </div>
                  <div className={styles.infoContainer}>
                    <img
                      className={styles.mainImage}
                      src={this.state.mainPhoto || data.product.gallery[0]}
                      alt=""
                    />

                    <div className={styles.productInfo}>
                      <h1>{data.product.brand}</h1>
                      <h2>{data.product.name}</h2>

                      {data.product.attributes &&
                        data.product.attributes.map((attr) => {
                          if (attr.type === "text") {
                            return (
                              <Attribute
                                func={this.selectedAttr.bind(this)}
                                key={attr.name}
                                text
                                name={attr.name}
                                items={attr.items}
                              />
                            );
                          } else if (attr.type === "swatch") {
                            return (
                              <Attribute
                                func={this.selectedAttr.bind(this)}
                                key={attr.name}
                                swatch
                                name={attr.name}
                                items={attr.items}
                              />
                            );
                          }
                        })}

                      <div className={styles.price}>
                        <h3>PRICE</h3>
                        <p>{`${
                          data.product.prices[this.props.selectedCurrency]
                            .currency.symbol
                        } ${
                          data.product.prices[this.props.selectedCurrency]
                            .amount
                        }`}</p>
                      </div>

                      <GreenBtn
                        func={() => {
                          const defaultAttributes = [];
                          data.product.attributes.forEach((attr) => {
                            defaultAttributes.push({
                              attrName: attr.name,
                              attrValue: attr.items[0].value,
                              attrType: attr.type,
                            });
                          });
                          this.addToCart(
                            defaultAttributes,
                            data.product.inStock
                          );
                        }}
                        text={"ADD TO CART"}
                      />

                      {parse(data.product.description)}
                    </div>
                  </div>
                </>
              );
            }
            if (!data.product) {
              return <Notification text={"Sorry product not found"} />;
            }
          }}
        </Query>
      </div>
    );
  }
}

export default connect(mapStateToProps)(WithRouter(Product));
