import { Component } from "react";
import styles from "./styles.module.scss";

import { gql } from "apollo-boost";
import { Query } from "@apollo/client/react/components";
import { WithRouter } from "../../utils/withRouter";
import parse from 'html-react-parser';

import Size from "../../Components/Size/Size";
import Color from "../../Components/Color/Color";
import GreenBtn from "../../Components/GreenBtn/GreenBtn";

class Product extends Component {

  constructor() {
    super();
    this.state = {
      mainPhoto: ''
    };
  }

  setMainPhoto(e){
    console.log(e.target.src)
    this.setState({mainPhoto: e.target.src})
  }

  render() {
    return (
      <div className={styles.container}>
        <Query
          query={gql`
            query {
              product(id: "${this.props.params.productId}") {
                name
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
            if (loading) return "Loading...";
            if (data.product) {
              console.log(data.product);
        
              return (
                <>
                  <div className={styles.sideImages}>
                    {data.product.gallery.map((photo)=> {
                      return <img onClick={this.setMainPhoto.bind(this)} src={photo} alt={data.product.name} />
                    })}
                  </div>
                  <div className={styles.infoContainer}>
                    <img className={styles.mainImage} src={this.state.mainPhoto || data.product.gallery[0]} alt="" />

                    <div className={styles.productInfo}>
                      <h1>{data.product.brand}</h1>
                      <h2>{data.product.name}</h2>

                      <Size sizes={["XS", "S", "M", "L"]} />

                      <Color colors={["gray", "black", "green"]} />

                      <div className={styles.price}>
                        <h3>PRICE</h3>
                        <p>{`${data.product.prices[0].currency.symbol} ${data.product.prices[0].amount}`}</p>
                      </div>

                      <GreenBtn text={"ADD TO CART"} />

                      {parse(data.product.description)}

                      {/* <p className={styles.description}>
                        Find stunning women's cocktail dresses and party
                        dresses. Stand out in lace and metallic cocktail dresses
                        and party dresses from all your favorite brands.
                      </p> */}
                    </div>
                  </div>
                </>
              );
            }
            if (!data.product) {
              //TODO IN NEED OF THAT ERROR MESSAGE
              return <h1>Sorry product not found</h1>;
            }
          }}
        </Query>
      </div>
    );
  }
}

export default WithRouter(Product);
