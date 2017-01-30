import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import { TableSimple } from 'components'


export default class ProfileCompleted extends Component{
    constructor(props){
        super(props)
        autoBind(this)
    }

    getData(){
        const { user } = this.props

        const fields = [
            ['First Name', 'first_name'],
            ['Last Name', 'last_name'],
            ['Phone', 'phone'],
            ['Address1', 'address1'],
            ['Address2', 'address2'],
            ['City', 'city'],
            ['State', 'state'],
            ['Postal Code', 'postal_code'],
            ['Date Of Birth', 'date_of_birth'],
            ['SSN', 'ssn']
        ]

        let data = {}
        data.id = 'profile'
        data.header = null
        data.rows = []

        for (let arr of fields){
            let row = {}
            row.cols = []
            row.cols.push({value: arr[0]})
            row.cols.push({value: user[arr[1]]})
            data.rows.push(row)    
        }
        return data
    }


    render(){
        return (
            <div className="card">
                <div className="card-header">
                    <h2>{'User profile'}
                        <small>
                            {'Your profile is completed. To edit profile please contact support.'}
                        </small>
                    </h2>
                </div>

                <div className="card-body card-padding">
                    <TableSimple data={this.getData()} />
                </div>
            </div>

        )
    }
}


ProfileCompleted.propTypes = {
    user: PropTypes.object
}
