import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'


export default class Checkbox extends Component{
    static get defaultProps() {
        return {
            disabled: false,
            isCheckedDefault: false
        }
    }

    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            isChecked: false
        }
    }

    componentWillMount(){
        this.setState({isChecked: this.props.isCheckedDefault})   
    }

    onClick(){
        this.setState({isChecked: !this.state.isChecked})   
    }
    
    render(){
        const { title, name } = this.props

        return (
            <div className="checkbox" onClick={this.onClick}>
                <label>
                    <input
                        name={name}
                        type="checkbox"
                        onChange={this.onClick}
                        checked={this.state.isChecked}
                        disabled={this.props.disabled} />
                    <i className="input-helper" />
                    {title}
                </label>
            </div>
        )
    }
}


Checkbox.propTypes = {
    disabled: PropTypes.bool,
    isCheckedDefault: PropTypes.bool,
    name: PropTypes.string,
    title: PropTypes.string
}

