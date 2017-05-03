import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import classNames from 'classnames'
import { NoUiSlider } from 'components'
import { getMenu } from './private/menu'


class LoanCalculator extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            activeMenu: 'STUDENT'
        }
    }

    get menu(){
        return getMenu()
    }

    onUpdateInterest(value){
        console.log(value)
    }


    render(){
        const { activeMenu } = this.state

        console.log(this.menu)

        return (
            <div className="calc-container">
                <div className="calc-tab">
                    <ul id="top-menu">
                        {this.menu.map(obj => {
                            const cn = classNames('tab-item', {active: obj.name === activeMenu})
                            return (
                                <li key={obj.name} className={cn}>
                                    <a href="#">
                                        <i className={obj.icon} />
                                        <span>{obj.name}</span>
                                    </a>
                                </li>
                            )                                        
                        })}
                    </ul>
                </div>

                <div className="calc-content">
                    <div className="content-left">
                        <div className="main-panel">
                            <i className="icon-graduation-cap" />
                            <h2>{'STUDENT LOANS'}</h2>
                            <p className="main-amount">{'$75,000'}</p>
                            <div className="slider-container">
                                <div className="slider" id="student-loan" />
                            </div>
                        </div>
                        <div className="second-panel">
                            <div className="panel-col">
                                <h3>{'INTEREST RATE'}</h3>
                                <p className="sec-amount">{'6.5%'}</p>
                                <div className="slider-container">
                                    <NoUiSlider
                                        onUpdate={this.onUpdateInterest}
                                        start={6.5}
                                        min={1}
                                        max={30}
                                        step={0.1}
                                        precision={1} />

                                </div>
                            </div>
                            <div className="panel-col">
                                <h3>{'LOAN LENGTH'}</h3>
                                <p className="sec-amount">{'10 YEARS'}</p>                          
                                <div className="slider-container">
                                    <div className="slider" id="loan-length" />
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="content-right">
                        <div className="row-group">
                            <div className="row-sub-group">
                                <div className="content-row main">
                                    <div>
                                        <h3>{'ROUND UP CONTRIBUTION'}</h3>
                                    </div>
                                    <div>
                                        <p>{'$300'}</p>
                                    </div>
                                </div>
                                <div className="slider-row slider-container">
                                    <div className="slider" id="round-off" />
                                </div>              
                            </div>



                            <div className="row-sub-group">
                                <div className="subtitle-row">
                                    <h4>{'WITHOUT ROUND UP'}</h4>   
                                </div>      
                                <div className="content-row">
                                    <div>
                                        <p>{'Interest Paid'}</p>
                                    </div>
                                    <div>
                                        <p>{'$27,193'}</p>
                                    </div>                  
                                </div>
                                <div className="content-row">
                                    <div>
                                        <p>{'Amount Paid'}</p>
                                    </div>
                                    <div>
                                        <p>{'$102,193'}</p>
                                    </div>                  
                                </div>
                                <div className="subtitle-row">
                                    <h4>{'WITH ROUND UP'}</h4>          
                                </div>
                                <div className="content-row">
                                    <div>
                                        <p>{'New Interest'}</p>
                                    </div>
                                    <div>
                                        <p>{'$17,744'}</p>
                                    </div>                  
                                </div>
                                <div className="content-row">
                                    <div>
                                        <p>{'New Amount'}</p>
                                    </div>
                                    <div>
                                        <p>{'$92,744'}</p>
                                    </div>                  
                                </div>              
                                <div className="content-row margin-top">
                                    <div>
                                        <p>{'Time Saved'}</p>
                                    </div>
                                    <div>
                                        <p>{'3 YEARS'}</p>
                                    </div>                  
                                </div>
                            </div>
                        </div>

                        <div className="big-row">
                            <div>
                                <h3>{'$9,449 SAVED'}</h3>
                            </div>
                        </div>

                    </div>
                </div>

                <p className="add-info">
                    {'*Your savings may vary based on loan, interest and other factors.'}
                </p>
            </div>
        )
    }
}


LoanCalculator.propTypes = {
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(LoanCalculator)


