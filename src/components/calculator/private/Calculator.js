
export default class Calculator{
    constructor(loanAmount, interestRate, loanLength, roundup){
        this.loanAmount = loanAmount
        this.interestRate = interestRate
        this.loanLength = loanLength
        this.roundup = roundup

        // set later
        // In years
        this.timeSaved = 0
        this.amountSaved = 0
    }

    get interestPaid(){
        let loanAmount = this.loanAmount
        let interestAmount = 0
        let amountPerYear = this.amountPerYear

        for (let i=0; i<this.loanLength; i++){
            let payThisYear = loanAmount * (this.interestRate/100)
            interestAmount += payThisYear
            loanAmount -= amountPerYear
        }
        return interestAmount
    }

    get totalPaid(){
        return this.loanAmount + this.interestPaid
    }

    get interestPaidWithRoundup(){
        let loanAmount = this.loanAmount
        let interestAmount = 0
        let amountPerYear = this.amountPerYear + (this.roundup * 12)

        let countYears = 0
        while (loanAmount > 0){
            countYears += 1
            let payThisYear = loanAmount * (this.interestRate/100)
            interestAmount += payThisYear
            loanAmount -= amountPerYear
        }

        this.timeSaved = this.loanLength - countYears
        this.amountSaved = this.interestPaid - interestAmount
        return interestAmount   
    }

    get totalPaidWithRoundup(){
        return this.loanAmount + this.interestPaidWithRoundup
    }

    /**
     * Amount without interest rate.
     * Split equally per all loanLength
     */
    get amountPerYear(){
        return this.loanAmount / this.loanLength
    }

    /**
     * Returns YEAR or YEARS depends on number of years
     */
    get yearsString(){
        if (this.timeSaved === 1){
            return 'YEAR'
        }
        return 'YEARS'
    }


}