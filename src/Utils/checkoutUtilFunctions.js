export function checkoutFormIsValid(checkout){
    let isValid = true;
    let errors = {};

    if(checkout.staffMemberId === -1){
        errors.staffMember = 'You must select a staff member';
        isValid = false;
    }

    if (checkout.grossSales === 0){
        errors.grossSales = 'Gross Sales is required';
        isValid = false;
    }

    if (parseInt(checkout.barSales) > parseInt(checkout.grossSales)){
        errors.barSales = 'Your bar sales cannot be greater than your gross sales';
        isValid = false;
    }

    let errorList = { isValid: isValid, errors: errors};
    return errorList;
    
}

export function shouldAlertUser(checkout){
    let shouldAlert = false;
    let alerts = {};
    let twentyFivePercent = parseInt(checkout.grossSales) * .25;

    if (parseInt(checkout.grossSales) > 2000){
        alerts.grossSales = `Just double checking this.`;
        shouldAlert = true;
    }

    if (checkout.ccTips > twentyFivePercent ){
        alerts.ccTips = 'Awesome Credit Card Tips, just making sure its right.';
        shouldAlert = true;
    }
    if (parseInt(checkout.cashTips) > 100){
        alerts.cashTips = 'Cash is cool, but paying taxes is a drag. Double checking this is not a mistake.';
        shouldAlert = true;
    }
    if (parseInt(checkout.ccAutoGrat) > 300){
        alerts.ccAutoGrat = 'Love the grat, but is this number correct?';
        shouldAlert = true;
    }
    if (parseInt(checkout.cashAutoGrat) > 100){
        alerts.cashAutoGrat = 'Someone was Mr. Moneybags, just checkng this is right.';
        shouldAlert = true;
    }
    if (parseInt(checkout.numberOfBottlesSold) > 5){
        alerts.numberOfBottlesSold = 'Popping Bottles! Just checking you entered the right amount.';
        shouldAlert = true;
    }

    if (parseInt(checkout.nonTipOutBarSales) > 400){
        alerts.nonTipOutBarSales = 'Just making sure this looks right';
        shouldAlert = true;
    }

    return {shouldAlert: shouldAlert, alerts: alerts};
}