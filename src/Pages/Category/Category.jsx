import { Component } from "react";
import styles from "./styles.module.scss";
import { WithRouter } from "../../utils/withRouter";
import { categoryGQL } from "../../utils/gql";
import { Query } from "@apollo/client/react/components";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Notification from "../../Components/Notification/Notification";
import Loading from "../../Components/Loading/Loading";

class Category extends Component {
  constructor() {
    super();
    this.state = {
      notification: false,
      notificationText: "",
    };
  }

  setNotification(state, text) {
    this.setState({ notification: state, notificationText: text });
  }

  render() {
   const title = this.props.params.categoryName
    return (
      <>
        {this.state.notification && (
          <Notification text={this.state.notificationText} />
        )}
        <h1>
          {this.props.params.categoryName
            ? this.props.params.categoryName
            : "All"}
        </h1>
        <div className={styles.productsContainer}>
          <Query query={categoryGQL(title)}>
            {({ loading, data }) => {
              if (loading) return <Loading />;
              if (data.category) {
                return data.category.products.map((product) => {
                  return (
                    <ProductCard
                      setNotification={this.setNotification.bind(this)}
                      key={product.id}
                      product={product}
                    />
                  );
                });
              }
              if (!data.category) {
                return <Notification text={"Sorry category not found"} />;
              }
            }}
          </Query>
        </div>
      </>
    );
  }
}

export default WithRouter(Category);
