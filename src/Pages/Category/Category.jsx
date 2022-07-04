import { Component } from "react";
import styles from "./styles.module.scss";
import { WithRouter } from "../../utils/withRouter";

import { gql } from "apollo-boost";
import { Query } from "@apollo/client/react/components";

import ProductCard from "../../Components/ProductCard/ProductCard";

class Category extends Component {

  render() {
    return (
      <>
        <h1>
          {this.props.params.categoryName
            ? this.props.params.categoryName
            : "All"}
        </h1>
        <div className={styles.productsContainer}>
          <Query
            query={gql`
            query {
              category(input: { title: "${
                this.props.params.categoryName
                  ? this.props.params.categoryName
                  : ""
              }" }) {
                name
                products {
                  id
                  name
                  inStock
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
            }
          `}
          >
            {({ loading, data }) => {
              if (loading) return "Loading...";
              if (data.category) {
                return data.category.products.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                });
              }
              if(!data.category){
                //TODO: Style a propper error message 
                return <h1>Sorry category not found</h1>
              }
            }}
          </Query>
        </div>
      </>
    );
  }
}

export default WithRouter(Category);
