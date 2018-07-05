export function checkoutFormIsValid(checkout){
    let isValid = true;
    let errors = {};

    if(checkout.staffMemberId === -1){
        errors.staffMember = 'You must select a staff member';
        isValid = false;
    }

    if (parseFloat(checkout.grossSales) === 0){
        errors.grossSales = 'Gross Sales is required';
        isValid = false;
    }

    if (parseFloat(checkout.barSales) > checkout.grossSales){
        errors.barSales = 'Your bar sales cannot be greater than your gross sales';
        isValid = false;
    }

    if (parseFloat(checkout.numberOfBottlesSold) > 0 && parseFloat(checkout.nonTipOutBarSales) == 0){
        errors.nonTipOutBarSales = 'You must provide the value of the bottles sold';
        isValid = false;
    }

    if(parseFloat(checkout.ccTips) === 0 && parseFloat(checkout.cashTips) === 0){
        errors.tips = 'You must enter the tips earned';
        isValid = false;
    }

    let errorList = { isValid: isValid, errors: errors};
    return errorList;
    
}

export function shouldAlertUser(checkout){
    let shouldAlert = false;
    let alerts = {};
    let twentyFivePercent = parseFloat(checkout.grossSales) * .25;

    if (parseFloat(checkout.grossSales) > 2000){
        alerts.grossSales = `Just double checking this.`;
        shouldAlert = true;
    }

    if (parseFloat(checkout.nonTipOutBarSales) > 0 && parseFloat(checkout.numberOfBottlesSold) == 0){
        alerts.numberOfBottlesSold = 'You did not enter any bottles, did you mean to leave this empty?';
        shouldAlert = true;
    }

    if (parseFloat(checkout.ccTips) > twentyFivePercent ){
        alerts.ccTips = 'Awesome Credit Card Tips, just making sure its right.';
        shouldAlert = true;
    }
    if (parseFloat(checkout.cashTips) > 100){
        alerts.cashTips = 'Cash is cool, but paying taxes is a drag. Double checking this is not a mistake.';
        shouldAlert = true;
    }
    if (parseFloat(checkout.ccAutoGrat) > 300){
        alerts.ccAutoGrat = 'Love the grat, but is this number correct?';
        shouldAlert = true;
    }
    if (parseFloat(checkout.cashAutoGrat) > 100){
        alerts.cashAutoGrat = 'Someone was Mr. Moneybags, just checkng this is right.';
        shouldAlert = true;
    }
    if (parseFloat(checkout.numberOfBottlesSold) > 5){
        alerts.numberOfBottlesSold = 'Popping Bottles! Just checking you entered the right amount.';
        shouldAlert = true;
    }

    if (parseFloat(checkout.nonTipOutBarSales) > 400){
        alerts.nonTipOutBarSales = 'Just making sure this looks right';
        shouldAlert = true;
    }

    return {shouldAlert: shouldAlert, alerts: alerts};
}

export function transformCheckout(checkout, jobWorkedTitle, stringDate, lunchOrDinner ) {
    let keys = Object.keys(checkout);
    let transformedCheckout = Object.assign({}, checkout);
    keys.map(k => {
        if (k === 'jobWorkedTitle') {
            transformedCheckout[k] = jobWorkedTitle.text;
        }
        else if (k === "stringDate"){
            transformedCheckout[k] = stringDate;
        }
        else if (k === "lunchOrDinner"){
            transformedCheckout[k] = lunchOrDinner; 
        }
        else if (k === 'staffMemberName'){
            return;
        }
        else if (k === 'shiftDate'){
            transformCheckout[k] = stringDate;
        }
        else {
            transformedCheckout[k] = Number(transformedCheckout[k]);
        }
    });
    return transformedCheckout;
}