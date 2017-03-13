import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { closeDonkiesAccount } from 'actions'
import { CardSimple } from 'components'


class CloseAccount extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    onClickCloseAccount(){
        this.props.closeDonkiesAccount()
    }

    render(){
        return (
            <CardSimple
                header={'Close account in Donkies \u0026 Refund All Change'}
                headerClass="m-b-20"
                isContentToBody={false}>

                <button
                    onClick={this.onClickCloseAccount}
                    className="btn bgm-red btn-icon-text btn-sm waves-effect m-r-5">
                    
                    <i className="zmdi zmdi-delete" />
                    {'Remove and Refund'}
                </button>
            </CardSimple>
        )
    }
}


CloseAccount.propTypes = {
    closeDonkiesAccount: PropTypes.func        
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
    closeDonkiesAccount
})(CloseAccount)