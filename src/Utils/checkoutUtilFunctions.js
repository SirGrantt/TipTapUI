export function checkoutFormIsValid(checkout){
    let isValid = true;
    let errors = {};

    if (checkout.grossSales == 0){
        errors.grossSales = 'Gross Sales is required';
        isValid = false;
    }

    if (checkout.barSales > checkout.grossSales){
        errors.barSales = 'Your bar sales cannot be greater than your gross sales';
        isValid = false;
    }

    let errorList = { isValid: isValid, errors: errors};
    return errorList;
    
}

export function shouldAlertUser(checkout){
    let shouldAlert = false;
    let alerts = {};

    if (checkout.grossSales > 2000){
        alerts.grossSales = `You entered a gross sales of over $2,000. Just double checking this is right!`;
        shouldAlert = true;
    }

    if (checkout.ccTips > $350){
        alerts.ccTips = `Holy cow! You entered ${checkout.ccTips} for your server's tips for the night. That 
        is awesome for them, but wanted to be sure it wasn't a typo.`;
        shouldAlert = true;
    }
    if (checkout.cashTips > 100){
        alerts.cashTips = `Walking out with some cash? Nice. You entered ${checkout.cashTips} for the server's
        cash tips, wanted to make sure this was correct.`;
        shouldAlert = true;
    }
    if (checkout.ccAutoGrat > $350){
        alerts.ccAutoGrat = `Gotta love the grat. You entered ${checkout.ccAutoGrat} for credit card auto
        gratuity. Just double checking this number.`;
        shouldAlert = true;
    }
    if (checkout.cashAutoGrat > $350){
        alerts.cashAutoGrat = `Gotta love the grat. You entered ${checkout.cashAutoGrat} for cash auto
        gratuity. Just double checking this number.`;
        shouldAlert = true;
    }
    if (checkout.numberOfBottlesSold > 10){
        alerts.numberOfBottlesSold = `Poppin bottles! You entered a bottle count of ${checkout.numberOfBottlesSold}, 
        just wanted to make sure this was correct!`
        shouldAlert = true;
    }

    if (checkout.nonTipOutBarSales > 400){
        alerts.nonTipOutBarSales = `Just wanted to make sure ${checkout.nonTipOutBarSales} was correct for 
        your bottle value.`;
        shouldAlert = true;
    }

    return alertResult = { shouldAlert: shouldAlert, alerts: alerts };
}