import { Component } from "react";
import styles from './styles.module.scss'

class Attribute extends Component {

    render() {
        return(
            <div className={styles.container}>
            <h3>{this.props.name}</h3>
            <div className={styles.size}>
            {this.props.text && this.props.items.map((item) => { 
               return <div onClick={this.props.func} key={item.value}>{item.displayValue}</div>
            })}

            {this.props.swatch && this.props.items.map((item) => {
                return <div onClick={this.props.func} key={item.value} style={{backgroundColor: item.displayValue}}></div>
            })}

            </div> 
            </div>
        )
    }
}

export default Attribute