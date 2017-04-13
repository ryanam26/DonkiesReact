import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import classNames from 'classnames'
import DashboardColorBlock from './private/DashboardColorBlock'
import { LoadingInline } from 'components'


class HomeStat extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    render(){
        const { stat } = this.props
        if (!stat){
            return <LoadingInline />
        }

        return (
            <div className="row">
                <DashboardColorBlock
                    value={`$${stat.amount_to_stripe}`}
                    className="bgm-lightgreen"
                    title="Total Round Up"
                    content="This is the total amount that has been rounded up since registering with the app." />

                <DashboardColorBlock
                    value={`$${stat.amount_to_user}`}
                    className="bgm-purple"
                    title="Total Transfered"
                    content="This is the amount that has been transfered and applied to your debt accounts since registering with the app." />

                <DashboardColorBlock
                    value={stat.payments}
                    className="bgm-bluegray"
                    title="Payments"
                    content="This is the number of payments saved since registered with the app." />

                <DashboardColorBlock
                    value={`$${stat.amount_available}`}
                    className="bgm-orange"
                    title="Available For Transfer"
                    content="This is the amount that is available for transfer since the last time you transfered to your debt accounts." />
            </div>
        )
    }
}


HomeStat.propTypes = {
    stat: PropTypes.object
}

const mapStateToProps = (state) => ({
    stat: state.stat
})

export default connect(mapStateToProps, {
})(HomeStat)

