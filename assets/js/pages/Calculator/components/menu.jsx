export function getMenu() {
  return [
    {
      id: 1,
      name: "STUDENT",
      title: "STUDENT LOANS",
      icon: "icon-graduation-cap",
      loanAmount: {
        start: 75000,
        min: 1000,
        max: 500000,
        step: 500,
        precision: 0
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
        precision: 0
      },
      roundup: {
        start: 60,
        min: 10,
        max: 300,
        step: 10,
        precision: 0
      }
    },
    {
      id: 2,
      name: "AUTO",
      title: "AUTO LOANS",
      icon: "icon-cab",
      loanAmount: {
        start: 25000,
        min: 1000,
        max: 500000,
        step: 500,
        precision: 0
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
        precision: 0
      },
      roundup: {
        start: 130,
        min: 10,
        max: 300,
        step: 10,
        precision: 0
      }
    },
    {
      id: 3,
      name: "CREDIT CARDS",
      title: "CREDIT CARDS",
      icon: "icon-credit-card",
      loanAmount: {
        start: 20000,
        min: 1000,
        max: 500000,
        step: 500,
        precision: 0
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
        precision: 0
      },
      roundup: {
        start: 160,
        min: 10,
        max: 300,
        step: 10,
        precision: 0
      }
    },
    {
      id: 4,
      name: "MORTGAGE",
      title: "MORTGAGE",
      icon: "icon-home",
      loanAmount: {
        start: 250000,
        min: 1000,
        max: 500000,
        step: 500,
        precision: 0
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
        precision: 0
      },
      roundup: {
        start: 300,
        min: 10,
        max: 300,
        step: 10,
        precision: 0
      }
    }
  ];
}
