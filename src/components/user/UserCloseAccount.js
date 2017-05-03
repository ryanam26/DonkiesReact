import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { closeDonkiesAccount } from 'actions'
import { CardSimple, Modal } from 'components'


class CloseAccount extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            showRemoveModal: false
        }
    }

    onClickCloseAccount(){
        this.setState({showRemoveModal: true})
    }

    onClickConfirm(){
        this.props.closeDonkiesAccount()
    }

    onClickCloseModal(){
        this.setState({showRemoveModal: false})
    }

    render(){
        const { showRemoveModal } = this.state

        return (
            <wrap>

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

                {showRemoveModal &&
                    <Modal
                        onClickClose={this.onClickCloseModal}
                        visible
                        title="Are you sure?">
                        
                        <wrap>
                            <button
                                onClick={this.onClickConfirm}
                                className="btn bgm-red btn-icon-text btn-sm waves-effect m-r-5">
                                
                                <i className="zmdi zmdi-delete" />
                                {'Yes'}
                            </button>

                            <button
                                onClick={this.onClickCloseModal}
                                className="btn btn-primary btn-sm waves-effect m-r-5">
                                
                                {'No'}
                            </button>
                        </wrap>

                            
                    </Modal>  
                }


            </wrap>
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