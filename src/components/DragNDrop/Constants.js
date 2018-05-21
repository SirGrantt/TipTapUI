// @flow
export const colors = {
    blue: {
      deep: 'rgb(0, 121, 191)',
      light: 'lightblue',
      lighter: '#d9fcff',
      soft: '#E6FCFF',
      steel: '#4682b4',
    },
    black: '#4d4d4d',
    shadow: 'rgba(0,0,0,0.2)',
    grey: {
      darker: '#C1C7D0',
      dark: '#E2E4E6',
      medium: '#DFE1E5',
      N30: '#EBECF0',
      light: '#F4F5F7',
    },
    green: 'rgb(185, 244, 188)',
    white: 'white',
    purple: 'rebeccapurple',
  };
  
  export const grid: number = 8;
  
  export const borderRadius: number = 2;

  export const defaultCheckout: { 
  staffMemberName: string,
  id: string,
  apiId: number,
  nonTipOutBarSales: number,
  numberOfBottlesSold: number,
  lunchOrDinner: string,
  sales: number,
  grossSales: number,
  barSales: number,
  ccTips: number,
  cashTips: number,
  ccAutoGrat: number,
  cashAutoGrat: number,
  hours: number,
  staffMemberId: number,
  jobWorkedTitle: string,
  stringDate: string }
  = { staffMemberName: "",
    id: "",
    apiId: 0,
    nonTipOutBarSales: 0,
    numberOfBottlesSold: 0,
    lunchOrDinner: "dinner",
    sales: 0,
    grossSales: 0,
    barSales: 0,
    ccTips: 0,
    cashTips: 0,
    ccAutoGrat: 0,
    cashAutoGrat: 0,
    hours: 0,
    staffMemberId: 0,
    jobWorkedTitle: "",
    stringDate: "",
  };