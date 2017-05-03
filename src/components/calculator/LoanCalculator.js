import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'
import classNames from 'classnames'
import { thousandSeparator } from 'services/helpers'
import { NoUiSlider } from 'components'
import { getMenu } from './private/menu'
import Calculator from './private/Calculator'


class LoanCalculator extends Component{
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            activeMenuId: null,
            isShowSlider: true,
        }
    }

    componentWillMount(){
        this.changeMenu(1)   
    }

    onClickMenu(id, e){
        e.preventDefault()
        this.changeMenu(id)
    }

    onUpdateLoanAmount(value){
        this.setState({loanAmountValue: value})   
    }

    onUpdateInterestRate(value){
        this.setState({interestRateValue: value})   
    }

    onUpdateLoanLength(value){
        this.setState({loanLengthValue: value})   
    }

    onUpdateRoundup(value){
        this.setState({roundupValue: value})   
    }
    
    get menu(){
        return getMenu()
    }

    getActiveMenuItem(id){
        for (let item of this.menu){
            if (item.id === id){
                return item
            }
        }
        return null
    }

    changeMenu(id, e){
        let item = this.getActiveMenuItem(id)

        let sliders = ['loanAmount', 'interestRate', 'loanLength', 'roundup']
        let newState = {activeMenuId: id}

        for (let name of sliders){
            let key = name + 'Value'
            newState[key] = item[name]['start']
        }
        this.setState(newState)
        
        // Rerender slider with new values
        this.setState({isShowSlider: false})
        setTimeout(() => {this.setState({isShowSlider: true})}, 100)
        
    }    

    /**
     * Add thousand separator and round to int.
     */
    formatValue(value){
        return thousandSeparator(parseInt(value), ',')
    }

    render(){
        const {
            activeMenuId,
            isShowSlider,
            loanAmountValue,
            interestRateValue,
            loanLengthValue,
            roundupValue } = this.state
        
        if (activeMenuId === null){
            return null
        }

        let item = this.getActiveMenuItem(activeMenuId)

        let calc = new Calculator(
            loanAmountValue,
            interestRateValue,
            loanLengthValue,
            roundupValue
        )
        
        return (
            <div className="calc-container">
                <div className="calc-tab">
                    <ul id="top-menu">
                        {this.menu.map(obj => {
                            const cn = classNames('tab-item', {active: obj.id === activeMenuId})
                            return (
                                <li key={obj.name} className={cn}>
                                    <a href="#" onClick={this.onClickMenu.bind(null, obj.id)}>
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
                            <i className={item.icon} />
                            <h2>{item.title}</h2>
                            <p className="main-amount">{'$'}{thousandSeparator(loanAmountValue, ',')}</p>
                            <div className="slider-container">
                                {isShowSlider &&
                                    <NoUiSlider
                                        onUpdate={this.onUpdateLoanAmount}
                                        start={item.loanAmount.start}
                                        min={item.loanAmount.min}
                                        max={item.loanAmount.max}
                                        step={item.loanAmount.step}
                                        precision={item.loanAmount.precision} />
                                }
                            </div>
                        </div>
                        <div className="second-panel">
                            <div className="panel-col">
                                <h3>{'INTEREST RATE'}</h3>
                                <p className="sec-amount">{interestRateValue.toFixed(1)}{'%'}</p>
                                <div className="slider-container">
                                    <NoUiSlider
                                        onUpdate={this.onUpdateInterestRate}
                                        start={item.interestRate.start}
                                        min={item.interestRate.min}
                                        max={item.interestRate.max}
                                        step={item.interestRate.step}
                                        precision={item.interestRate.precision} />

                                </div>
                            </div>
                            <div className="panel-col">
                                <h3>{'LOAN LENGTH'}</h3>
                                <p className="sec-amount">{loanLengthValue}{' YEARS'}</p>                          
                                <div className="slider-container">
                                    <NoUiSlider
                                        onUpdate={this.onUpdateLoanLength}
                                        start={item.loanLength.start}
                                        min={item.loanLength.min}
                                        max={item.loanLength.max}
                                        step={item.loanLength.step}
                                        precision={item.loanLength.precision} />
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
                                        <p>{'$'}{roundupValue}</p>
                                    </div>
                                </div>
                                <div className="slider-row slider-container">
                                    <NoUiSlider
                                        onUpdate={this.onUpdateRoundup}
                                        start={item.roundup.start}
                                        min={item.roundup.min}
                                        max={item.roundup.max}
                                        step={item.roundup.step}
                                        precision={item.roundup.precision} />
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
                                        <p>{'$'}{this.formatValue(calc.interestPaid)}</p>
                                    </div>                  
                                </div>
                                <div className="content-row">
                                    <div>
                                        <p>{'Amount Paid'}</p>
                                    </div>
                                    <div>
                                        <p>{'$'}{this.formatValue(calc.totalPaid)}</p>
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
                                        <p>{'$'}{this.formatValue(calc.interestPaidWithRoundup)}</p>
                                    </div>                  
                                </div>
                                <div className="content-row">
                                    <div>
                                        <p>{'New Amount'}</p>
                                    </div>
                                    <div>
                                        <p>{'$'}{this.formatValue(calc.totalPaidWithRoundup)}</p>
                                    </div>                  
                                </div>              
                                <div className="content-row margin-top">
                                    <div>
                                        <p>{'Time Saved'}</p>
                                    </div>
                                    <div>
                                        <p>{calc.timeSaved}{' '}{calc.yearsString}</p>
                                    </div>                  
                                </div>
                            </div>
                        </div>

                        <div className="big-row">
                            <div>
                                <h3>
                                    {`$ ${this.formatValue(calc.amountSaved)} SAVED`}
                                </h3>
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


