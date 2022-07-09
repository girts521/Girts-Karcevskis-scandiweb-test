import { Component } from "react";
import styles from "./styles.module.scss";

import { gql } from "apollo-boost";
import { Query } from "@apollo/client/react/components";
import { WithRouter } from "../../utils/withRouter";
import parse from 'html-react-parser';

import Attribute from "../../Components/Attribute/Attribute";
import GreenBtn from "../../Components/GreenBtn/GreenBtn";
import { connect } from "react-redux";
import {cartActions} from '../../store/cart'
import {mapStateToProps} from '../../store/index'

class Product extends Component {

  constructor() {
    super();
    this.state = {
      mainPhoto: '',
      cart: '',
      attributes: []
    };
  }

  setMainPhoto(e){
    this.setState({mainPhoto: e.target.src})
  }

  addToCart() {
    this.props.dispatch(cartActions.addToCart({
      productId: this.props.params.productId,
      attributes: this.state.attributes,
      quantity: 1
    }))
    this.setState({attributes: []})
  }

  selectedAttr(e) {
    let attr
    if(e.target.innerText === ''){
       attr = {
        attrName: e.target.parentNode.previousElementSibling.innerText,
        attrValue: e.target.style.backgroundColor,
        attrType: 'swatch'
      }
    }else if(e.target.innerText.length > 0){
       attr = {
        attrName: e.target.parentNode.previousElementSibling.innerText,
        attrValue: e.target.innerText,
        attrType: 'text'
      }
    }

    if(attr){
      const foundAttr = this.state.attributes.find((item) => item.attrName === attr.attrName)
      if(!foundAttr){
        console.log('found nothing', foundAttr)
        this.state.attributes.push(attr)
      }else{
        console.log('found something', foundAttr)
        const index = this.state.attributes.indexOf(foundAttr)
        console.log(this.state.attributes, index)
         this.state.attributes.splice(index, 1)
        console.log('new state after splice', this.state.attributes)
        this.state.attributes.push(attr)
      }
    }

  }

  render() {

    return (
      <div className={styles.container}>
        <button onClick={() => (console.log(this.props.cart))}>test</button>
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
              return (
                <>
                  <div className={styles.sideImages}>
                    {data.product.gallery.map((photo)=> {
                      return <img key={photo} onClick={this.setMainPhoto.bind(this)} src={photo} alt={data.product.name} />
                    })}
                  </div>
                  <div className={styles.infoContainer}>
                    <img className={styles.mainImage} src={this.state.mainPhoto || data.product.gallery[0]} alt="" />

                    <div className={styles.productInfo}>
                      <h1>{data.product.brand}</h1>
                      <h2>{data.product.name}</h2>

                      {data.product.attributes && data.product.attributes.map((attr) => {
                        if(attr.type === 'text'){
                          return <Attribute func={this.selectedAttr.bind(this)} key={attr.name} text name={attr.name} items={attr.items} />
                        }
                        else if(attr.type === 'swatch'){
                          return <Attribute func={this.selectedAttr.bind(this)} key={attr.name} swatch  name={attr.name} items={attr.items} />
                        }
                      })}

                      <div className={styles.price}>
                        <h3>PRICE</h3>
                        <p>{`${data.product.prices[0].currency.symbol} ${data.product.prices[0].amount}`}</p>
                      </div>

                      <GreenBtn func={this.addToCart.bind(this)} text={"ADD TO CART!!!"} />

                      {parse(data.product.description)}

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



export default connect(mapStateToProps)(WithRouter(Product));
