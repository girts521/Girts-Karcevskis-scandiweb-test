import { Component } from "react";
import styles from "./styles.module.scss";
import { WithRouter } from "../../utils/withRouter";

import { gql } from "apollo-boost";
import { Query } from "@apollo/client/react/components";

import ProductCard from "../../Components/ProductCard/ProductCard";
import Notification from "../../Components/Notification/Notification";
import Loading from "../Loading/Loading";

class Category extends Component {

  constructor() {
    super();
    this.state = {
      notification: false,
      notificationText: ''
    };
  }

  setNotification(state, text) {
    console.log(state)
    this.setState({notification: state, notificationText: text})
  }

  render() {
    return (
      <>
      {this.state.notification && <Notification text={this.state.notificationText}/>}
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
                  attributes{
                    name
                    type
                    items{
                      value
                    }
                  }
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
              if (loading) return <Loading /> ;
              if (data.category) {
                return data.category.products.map((product) => {
                  return <ProductCard setNotification={this.setNotification.bind(this)} key={product.id} product={product} />;
                });
              }
              if(!data.category){
                //TODO: Style a propper error message 
                return <Notification text={'Sorry category not found'} />
              }
            }}
          </Query>
        </div>
      </>
    );
  }
}

export default WithRouter(Category);
