import { Component } from "react";
import styles from './styles.module.scss'

class Size extends Component {

    render() {
        return(
            <div className={styles.container}>
            <h3>{this.props.name}</h3>
            <div className={styles.size}>
            {this.props.items.map((item) => { 
               return <div key={item}>{item}</div>
            })}
            </div>
            </div>
        )
    }
}

export default Size