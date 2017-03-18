import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'

import {
    apiCall2,
    apiCall3,
    CREDENTIALS_LIVE_BY_ID_URL,
    MEMBERS_URL } from 'services/api'

import { formToObject } from 'services/helpers'
import { Button2, Input2, LoadingInline } from 'components'


/**
 * Second step of add bank form.
 * On init fetches credentials for institution.
 * Then user submit credentials.
 * Then fetches server until it get completed status of member
 * and send callback to parent with updated status.
 * If member got status DENIED - it will be deleted.
 * If we receive 404 error, it means member was deleted,
 * show user "Incorrect credentials".
 *
 * @param {object} institution: {id: ..., name: ...}
 *
 * Flow:
 * 1) Fetch credentials (on mount)
 * 2) Submit credentials to server
 * 3) Request server for every 5 seconds until completed status
 * 4) As soon as member is completed, call onCompleteMember(member)
 *
 */ 
class Credentials extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            credentials: null,
            errorSubmit: null,
            isFetchingMember: false,
            isSubmittingCredentials: false
        }
    }

    componentWillMount(){
        this.fetchCredentials()
    }

    /**
     * Fetch from server data to render credentials.
     */
    async fetchCredentials(){
        let { institution } = this.props
        const url = CREDENTIALS_LIVE_BY_ID_URL + '/' + institution.id

        let response = await apiCall2(url, true) 
        let arr = await response.json()

        this.setState({credentials: arr})
    }

    onSubmit(e){
        e.preventDefault()
        const { institution } = this.props

        this.setState({errorSubmit: null})
        const form = formToObject(e.target)
        const data = {institution_code: institution.code}

        data.credentials = []
        for (let key in form){
            if (key.length === 0){
                continue
            }

            if (form[key].trim().length === 0){
                this.setState({errorSubmit: `Please fill ${key}`})
                return
            }

            let obj = {guid: this.getGuid(key), value: form[key].trim()}
            data.credentials.push(obj)
        }
        this.submitCredentials(data)
    }

    /**
     * Submit to server user's filled credentials.
     * (create member)
     */
    async submitCredentials(data){
        this.setState({isSubmittingCredentials: true})
        let response = await apiCall3(MEMBERS_URL, data, true) 
        this.setState({isSubmittingCredentials: false})

        if (response.status === 201){
            let member = await response.json()
            this.props.onUpdateMember(member)
            this.setState({'isFetchingMember': true})
            this.fetchMemberUntilCompleted(member)
        } else {
            this.setState({
                errorSubmit: 'Can not create account. Please try again later.'})
        }
    }

    /**
     * Request MemberDetail endpoint every 5 seconds until 
     * get completed status.
     * But if member will get DENIED status, it will be deleted
     * from Atrium and db. In that case we get 404
     * and pass "null" to onCompleteMember.
     */
    async fetchMemberUntilCompleted(member){
        const url = MEMBERS_URL + '/' + member.identifier

        let response = await apiCall2(url, true) 
        if (response.status === 404){
            this.props.onCompleteMember(null)
            return
        }

        member = await response.json()

        if (member.status_info.is_completed){
            this.setState({isFetchingMember: false})
            this.props.onCompleteMember(member)
        } else {
            setTimeout(() => this.fetchMemberUntilCompleted(member), 5000)
        }
    }

    /**
     * @returns {string} - guid by fieldName
     */
    getGuid(fieldName){
        const { credentials } = this.state
        for (let obj of credentials){
            if (obj.field_name === fieldName){
                return obj.guid
            }
        }
        return null
    }

    render(){
        const {
            credentials,
            isFetchingMember,
            isSubmittingCredentials,
            errorSubmit } = this.state
        
        if (!credentials){
            return <LoadingInline />
        }

        if (isFetchingMember){
            return <LoadingInline message="Please wait. It may take up to 2-3 minutes." />
        }

        return (
            <form onSubmit={this.onSubmit}>
                {credentials.map((obj, index) => {
                    const type = obj.type.toLowerCase() === 'password' ? 'password' : 'text'
                    return (
                        <Input2
                            key={index}
                            type={type}
                            name={obj.field_name}
                            label={obj.label}
                            placeholder={obj.label} />
                    )                                
                })}
            
                <Button2
                    disabled={isSubmittingCredentials} />

                {errorSubmit && <p className="custom-errors">{errorSubmit}</p>}

            </form>
        )
    }
}


Credentials.propTypes = {
    institution: PropTypes.object,
    member: PropTypes.object,
    onCompleteMember: PropTypes.func,
    onUpdateMember: PropTypes.func

}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(Credentials)