import { Component } from "react";
import styles from "./styles.module.scss";
import { cartItemGQL } from "../../utils/gql";
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
      outOfStock: false,
    };
  }

  setMainPhoto(e) {
    this.setState({ mainPhoto: e.target.src });
  }

  addToCart(length, inStock) {
    if (inStock === false) {
      this.setState({ outOfStock: true });
      setTimeout(() => {
        this.setState({ outOfStock: false });
      }, 3000);
      return;
    }
    if (
      (this.state.attributes.length &&
        this.state.attributes.length !== length) ||
      this.state.attributes.length === 0
    ) {
      this.setState({ missingAttribute: true });
      setTimeout(() => {
        this.setState({ missingAttribute: false });
      }, 2000);
      return;
    }

    const attributes = this.state.attributes;

    this.props.dispatch(
      cartActions.addToCart({
        id: this.props.params.productId + Math.random(),
        productId: this.props.params.productId,
        attributes: attributes,
        quantity: 1,
      })
    );
    this.setState({ showNotification: true });
    setTimeout(() => {
      this.setState({ showNotification: false });
    }, 3000);
  }

  selectedAttr(e, selectedAttr) {
    const children = e.target.parentNode.children;

    if (e.target.innerText.length > 0) {
     e.target.classList.add("selectedTextAttribute")
    } else if (e.target.innerText === "") {
      e.target.classList.add("selectedSwatchAttribute")
    }

    for (let i = 0; i < children.length; i++) {
      if (children[i] != e.target) {
        children[i].classList.remove("selectedTextAttribute", "selectedSwatchAttribute")
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
        const attributeArray = [...this.state.attributes];
        attributeArray.push(attr);
        this.setState({ attributes: attributeArray });
      } else {
        const index = this.state.attributes.indexOf(foundAttr);
        const attributeArray = [...this.state.attributes];
        attributeArray.splice(index, 1);
        attributeArray.push(attr);
        this.setState({ attributes: attributeArray });
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
        query={cartItemGQL(this.props.params.productId)}
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
                          this.addToCart(
                            data.product.attributes.length,
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
