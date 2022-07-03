import { Component } from "react";
import styles from "./styles.module.scss";

import { gql } from "apollo-boost";
import { Query } from "@apollo/client/react/components";

import ProductCard from "../../Components/ProductCard/ProductCard";

const productsQuery = gql`
query {
	category (input: {title: ""})
  {
	name
    products{
      id
      name
      inStock
      gallery
      prices{
        currency{
          label
          symbol
        }
        amount
      }
    }
  }
}
`;



class Category extends Component {


    // componentDidMount() {
    //     const { categoryName } = this.props.match.params
    //     console.log('mounted', categoryName)

    // }

    test() {
        console.log(this.props)
    }


  render() {

    return (
      <>
        <h1 onClick={this.test.bind(this)}>categoryName</h1>
        <div className={styles.productsContainer}>
          <Query query={productsQuery}>
            {({ loading, data }) => {
              if (loading) return "Loading...";
              if (data) {
                console.log(data.category.products);
                return data.category.products.map((product) => {
                    return <ProductCard product={product} />
                });
              }
            }}
          </Query>
          {/* <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard discount={"-50%"} />
          <ProductCard />
          <ProductCard outOfStock /> */}
        </div>
      </>
    );
  }
}

export default Category;
