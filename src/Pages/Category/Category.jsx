import { Component } from "react";
import styles from './styles.module.scss'

import ProductCard from "../../Components/ProductCard/ProductCard";

class Category extends Component {
    myFunc () {
        console.log('inside the func')
    }

    render() {
        return (
            <>
            <h1 onClick={this.myFunc}>Category name</h1>
            <div className={styles.productsContainer}>
            <ProductCard />
            <ProductCard />
            <ProductCard selected/>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            </div>
            </>
        )
    }
}

export default Category