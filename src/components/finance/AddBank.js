import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { navigate } from 'actions'
import { Alert, Button2, Loading, PlaidLink } from 'components'


class AddBank extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            showSuccess: false
        }
    }

    componentWillReceiveProps(nextProps){
        if (this.props.triggerItemCreated !== nextProps.triggerItemCreated){
            this.setState({showSuccess: true})
            setTimeout(() => {this.props.navigate('/accounts')}, 5000)
        }
    }

    render(){
        const { settings } = this.props
        const { showSuccess } = this.state

        if (!settings){
            return <Loading />
        }

        return (
            <div className="card col-lg-6">

                <div className="form-horizontal">
                    <div className="card-header">
                        <h2>{'Add bank account'}</h2>
                    </div>

                    <div className="card-body card-padding">
                        {!showSuccess &&
                            <PlaidLink>
                                <Button2
                                    type="button"
                                    text="Create bank account" />
                            </PlaidLink>
                        }

                        {showSuccess &&
                            <Alert
                                type="success"
                                value={'Bank account created!'} />}
                    </div>
                </div>
            </div>
        )
    }
}


AddBank.propTypes = {
    navigate: PropTypes.func,
    settings: PropTypes.object,
    triggerItemCreated: PropTypes.number
}

const mapStateToProps = (state) => ({
    triggerItemCreated: state.items.triggerItemCreated,
    settings: state.settings
})

export default connect(mapStateToProps, {
    navigate
})(AddBank)