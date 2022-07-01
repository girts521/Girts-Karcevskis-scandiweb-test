import { Component } from "react";
import styles from './styles.module.scss'

class Color extends Component {

    render() {

        return (
            <>
            <h3>COLOR</h3>
            <div className={styles.color}>
             {this.props.colors.map((color) => {
                return <div key={color}  style={{backgroundColor: color}}></div>
             })}
            </div>
            </>
        )
    }
}

export default Color