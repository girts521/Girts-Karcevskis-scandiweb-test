import { Component } from "react";
import styles from './styles.module.scss'

class GreenBtn extends Component {

    render() {

        return (
            <div className={styles.btn}>{this.props.text}</div>
        )
    }
}

export default GreenBtn