import { Component } from "react";
import styles from './styles.module.scss'

class Notification extends Component {

    render() {
        return(
            <div className={styles.container}>
                <div>{this.props.text}</div>
            </div>
        )
    }
}

export default Notification