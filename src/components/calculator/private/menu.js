
export function getMenu(){
    return [
        {
            name: 'STUDENT',
            icon: 'icon-graduation-cap',
            loanAmount: {
                start: 75000,
                min: 1000,
                max: 500000,
                step: 500,
                precision: null
            },
            interestRate: {
                start: 6.5,
                min: 1,
                max: 30,
                step: 0.5,
                precision: 1
            },
            loanLength: {
                start: 10,
                min: 1,
                max: 30,
                step: 1,
                precision: null
            },
            roundup: {
                start: 60,
                min: 10,
                max: 300,
                step: 10,
                precision: null
            },
        },
        {
            name: 'AUTO',
            icon: 'icon-cab',
            loanAmount: {
                start: 25000,
                min: 1000,
                max: 500000,
                step: 500,
                precision: null
            },
            interestRate: {
                start: 8.0,
                min: 1,
                max: 30,
                step: 0.5,
                precision: 1
            },
            loanLength: {
                start: 5,
                min: 1,
                max: 30,
                step: 1,
                precision: null
            },
            roundup: {
                start: 130,
                min: 10,
                max: 300,
                step: 10,
                precision: null
            },
        },
        {
            name: 'CREDIT CARDS',
            icon: 'icon-credit-card',
            loanAmount: {
                start: 20000,
                min: 1000,
                max: 500000,
                step: 500,
                precision: null
            },
            interestRate: {
                start: 19.0,
                min: 1,
                max: 30,
                step: 0.5,
                precision: 1
            },
            loanLength: {
                start: 5,
                min: 1,
                max: 30,
                step: 1,
                precision: null
            },
            roundup: {
                start: 160,
                min: 10,
                max: 300,
                step: 10,
                precision: null
            },
        },
        {
            name: 'MORTGAGE',
            icon: 'icon-home',
            loanAmount: {
                start: 250000,
                min: 1000,
                max: 500000,
                step: 500,
                precision: null
            },
            interestRate: {
                start: 4.5,
                min: 1,
                max: 30,
                step: 0.5,
                precision: 1
            },
            loanLength: {
                start: 30,
                min: 1,
                max: 30,
                step: 1,
                precision: null
            },
            roundup: {
                start: 300,
                min: 10,
                max: 300,
                step: 10,
                precision: null
            },
        },
    ]
}