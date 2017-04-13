import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { Input2, Button2 } from 'components'
import { formToObject } from 'services/helpers'



class TestPageComponent extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            numAccounts: 1
        }
    }

    onClickPlus(){
        this.setState({numAccounts: this.state.numAccounts + 1})
    }

    onClickMinus(){
        this.setState({numAccounts: this.state.numAccounts - 1})   
    }

    /**
     * form.accounts = [{account_number: ..., additional_info: ...}, ...]
     */
    onSubmit(e){
        e.preventDefault()
        let arr = []
        let map = {}

        for (let el of e.target.elements){
            let name = el.name.replace('[]', '')
            
            if (map.hasOwnProperty(name)){
                map[name].push(el.value)
            } else {
                map[name] = [el.value]
            }

            if (name === 'account_number' && el.value.trim().length === 0){
                console.log('Account number can not be empty.')
                return
            }
        }

        for (let i=0; i<map.account_number.length; i++){
            let obj = {
                account_number: map.account_number[i],
                additional_info: map.additional_info[i],
            }
        }

        const form = {}
        form.accounts = arr
    }

    get numAccounts(){
        const { numAccounts } = this.state
        let arr = []
        for (let i=0; i<numAccounts; i++){
            arr.push(i)
        }
        return arr
    }

    render(){
        return (
            <div className="card col-lg-6">

                <div className="form-horizontal">
                    <div className="card-body card-padding">
                        
                            <form ref="form" onSubmit={this.onSubmit}>
                                <div className="add-debt">

                                {this.numAccounts.map((v, index) => {
                                    return (
                                        <div key={index} className="account-wrapper">
                                            <Input2
                                                name="account_number[]"
                                                label="Account number"
                                                placeholder="Enter your account number" />

                                            <Input2
                                                name="additional_info[]"
                                                label="Additional info to included with payment"
                                                placeholder="Any additional info to include with your payment?" />
                                        </div>
                                    )                 
                                })}
                                
                                <button
                                    onClick={this.onClickPlus}
                                    type="button"
                                    className="btn btn-primary btn-sm waves-effect">
                                    {'+'}
                                </button>

                                {this.state.numAccounts > 1 &&
                                    <button
                                        onClick={this.onClickMinus}
                                        type="button"
                                        className="btn btn-primary btn-sm waves-effect m-l-10">
                                        {'-'}
                                    </button>
                                }
                                
                                <br /><br />    

                                <Button2
                                    type="submit"
                                    text="Submit" />
                            
                                </div>
                            </form>
                    
                    </div>
                </div>
            </div>
        )
    }
}

TestPageComponent.propTypes = {
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(TestPageComponent)

