import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'


export default class NoUiSlider extends Component{
    static get defaultProps() {
        return {
            precision: null,
        }
    }

    constructor(props){
        super(props)
        autoBind(this)
    }

    componentDidMount(){
        const { start, min, max, step } = this.props

        let slider = this.refs.slider
        
        let options = {
            start: [start],
            connect: true,
            range: {
                min: min,
                max: max
            },
            step: step
        }

        noUiSlider.create(slider, options)
        slider.noUiSlider.on('update', this.onUpdate)
    }

    componentWillUnmount(){
        let slider = this.refs.slider
        slider.noUiSlider.off()

    }

    onUpdate(values, handle, unencoded, tap, positions){
        const { precision } = this.props
        let value = unencoded[0]
        if (precision){
            value = value.toFixed(precision)
        }
        this.props.onUpdate(value)
    }

    render(){
        return (
            <div
                className="slider"
                ref="slider" />
        )
    }
}


NoUiSlider.propTypes = {
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    // Callback to parent with updated value
    onUpdate: PropTypes.func.isRequired,
    precision: PropTypes.number,
    start: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
}
