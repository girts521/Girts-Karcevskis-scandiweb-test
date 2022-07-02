import { Component } from "react";
import styles from './styles.module.scss'

class Size extends Component {

    render() {
        return(
            <div className={styles.container}>
            <h3>SIZE:</h3>
            <div className={styles.size}>
            {this.props.sizes.map((size) => { 
               return <div key={size}>{size}</div>
            })}
            </div>
            </div>
        )
    }
}

export default Size