import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import {
    CardSimple,
    HomeMiniCharts,
    HomeTransactions,
    HomeTransfer,
    TableSimple } from 'components'


export default class HomePageComponent extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    render(){
        return (
            <wrap>
                <HomeMiniCharts />
                <HomeTransfer />
                <HomeTransactions />
            </wrap>
        )
    }
}

HomePageComponent.propTypes = {
}
