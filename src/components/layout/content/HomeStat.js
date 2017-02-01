import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import classNames from 'classnames'
import DashboardColorBlock from './private/DashboardColorBlock'


class HomeStat extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    render(){
        return (
            <div className="row">
                <DashboardColorBlock
                    value={'$100'}
                    className="bgm-lightgreen"
                    title="Total Round Up"
                    content="This is the total amount that has been rounded up since registering with the app." />

                <DashboardColorBlock
                    value={'$100'}
                    className="bgm-purple"
                    title="Total Transfered"
                    content="This is the amount that has been transfered and applied to your debt accounts since registering with the app." />

                <DashboardColorBlock
                    value={100}
                    className="bgm-bluegray"
                    title="Payments"
                    content="This is the number of payments saved since registered with the app." />
            </div>
        )
    }
}


HomeStat.propTypes = {
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(HomeStat)

