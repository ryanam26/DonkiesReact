/*

Calculation of monthly scheduled payment.

X = P * ( r(1 + r)**n ) / ( (1 + r)**n - 1 )

P - Initial loan amount
r - interest rate per period
n - total number of payments

Example: 

Loan:        50 000
Yearly Rate: 5%
Loan length: 10 Years.

P = 50000
r = 0.00416666  ( 5%/12/100 )
n = 120         ( 10 * 12 monthes )

Should get 530.33 monthly scheduled payment.

Then calculate everything else:
Example:

№   BALANCE     SCH.PAYMENT     PRINCIPAL   INTEREST    ENDING BALANCE
1   50000       530.33          322         208.33      49678
2   49678       530.33 etc

1st row
interest       = balance * 0,00416666  (5%/100/12)  = 208.33
principal      = 530.33 - 208.33  = 322
ending balance = 50000 - 322 = 49678

Ending balance of the 1st row is beginning balance of 2nd row.
Then apply the same algorithm until the end of loan.

When extra payment is applied to monthly payment,
the loan will be paid faster.

Scheduled payment = Scheduled payment + Extra

*/



export default class Calculator{
    constructor(loanAmount, interestRate, loanLength, roundup){
        this.loanAmount = loanAmount
        this.interestRate = interestRate
        this.loanLength = loanLength
        this.roundup = roundup

        this.rate = null
        this.periods = null
        this.scPayment = null
        this.totalPaid = null
        this.totalInterest = null
        this.totalPaidWithExtra = null
        this.totalInterestWithExtra = null
        this.totalMonthesWithExtra = null
        this.totalYearsWithExtra = null
        this.timeSavedMonthes = null
        this.amountSaved = null

        this.calculate()
    }

    calculate(){
        this.getRate()
        this.getPeriods()
        this.getScheduledPayment()
        this.getTotal()
        this.getTotalWithExtra(this.roundup)
    }

    getRate(){
        this.rate = this.interestRate/12/100
    }

    getPeriods(){
        this.periods = this.loanLength * 12
    }

    getScheduledPayment(){
        this.scPayment = this.loanAmount * (  this.rate*Math.pow((1 + this.rate), this.periods) ) / ( Math.pow((1 + this.rate), this.periods) -1 )
    }

    /**
     * Calculates total payment and total interest.
     */
    getTotal(){
        this.totalPaid = this.periods * this.scPayment
        this.totalInterest = this.totalPaid - this.loanAmount
    }

    /**
     * When we add extra payment (monthly roundup)
     * to monthly payment.
     */
    getTotalWithExtra(extra){
        let numMonthes = 0
        let beginBalance = this.loanAmount
        let totalInterest = 0
        let totalPaid = 0
        let scPayment = this.scPayment + extra

        while (beginBalance > 0){
            numMonthes += 1
            let interest = beginBalance * this.rate
            let principal = scPayment - interest
            
            totalInterest += interest
            totalPaid += scPayment    
            beginBalance -= principal
        }

        // If begin balance is less than 0
        totalPaid += beginBalance

        this.totalPaidWithExtra = totalPaid
        this.totalInterestWithExtra = totalInterest
        this.totalMonthesWithExtra = numMonthes
        this.totalYearsWithExtra = parseInt(numMonthes/12)
        this.timeSavedMonthes = this.periods - numMonthes
        this.amountSaved = this.totalPaid - this.totalPaidWithExtra

    }

    /**
     * Returns YEAR or YEARS depends on number of years
     */
    get yearString(){
        if (parseInt(this.timeSavedMonthes/12) === 1){
            return 'YEAR'
        }
        return 'YEARS'
    }

    /**
     * Returns Month or Monthes depends on number of monthes
     */
    get monthString(){
        if (this.timeSavedMonthes === 1){
            return 'Monthly payment'
        }
        return 'Monthly payments'
    }

    debug(){
        console.log(this.rate)
        console.log(this.periods)
        console.log(this.scPayment)
        console.log(this.totalInterest)
        console.log(this.totalPaid)
        console.log('---')
        console.log(this.totalPaidWithExtra)
        console.log(this.totalInterestWithExtra)
        console.log(this.totalMonthesWithExtra)
        console.log(this.timeSavedMonthes)
        console.log(this.amountSaved)        
    }

}
