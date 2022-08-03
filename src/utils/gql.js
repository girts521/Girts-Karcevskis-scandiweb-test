import { gql } from "apollo-boost";

export const cartItemGQL = (id) => {
  return gql`
    query {
      product(id: "${id}") {
        name
        inStock
        brand 
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
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  `;
};

            // cartItemGQL(this.props.params.productId)}


export const categoryGQL = (title) => {
 return gql`
            query {
              category(input: { title: "${title}" }) {
                name
                products {
                  id
                  name
                  brand
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
          `;
};

export const currencyGQL = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
