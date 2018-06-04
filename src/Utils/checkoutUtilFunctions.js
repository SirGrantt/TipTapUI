export function checkoutFormIsValid(checkout){
    let isValid = true;
    let errors = {};

    if(checkout.staffMemberId == -1){
        errors.staffMember = 'You must select a staff member';
    }

    if (checkout.grossSales == 0){
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
    let alerts = [];
    let twentyFivePercent = checkout.grossSales * .25;

    if (checkout.grossSales > 2000){
        alerts.push({name: 'grossSales', message: `You entered a gross sales of over $2,000. 
        Just double checking this is right!`});
        shouldAlert = true;
    }

    if (checkout.ccTips > twentyFivePercent ){
        alerts.push({name: 'Credit Card Tips', message: `Holy cow! You entered ${checkout.ccTips} for your server's tips for the night. That 
        is awesome for them, but wanted to be sure it wasn't a typo.`});
        shouldAlert = true;
    }
    if (checkout.cashTips > 100){
        alerts.push({name: 'Cash Tips', message: `Walking out with some cash? Nice. You entered ${checkout.cashTips} for the server's
        cash tips, wanted to make sure this was correct.`});
        shouldAlert = true;
    }
    if (checkout.ccAutoGrat > 300){
        alerts.push({name : 'Credit Card Auto Grat', message: `Gotta love the grat. You entered ${checkout.ccAutoGrat} for credit card auto
        gratuity. Just double checking this number.`});
        shouldAlert = true;
    }
    if (checkout.cashAutoGrat > 100){
        alerts.push({name: 'Cash Auto Grat', message: `Gotta love the grat. You entered ${checkout.cashAutoGrat} for cash auto
        gratuity. Just double checking this number.`});
        shouldAlert = true;
    }
    if (checkout.numberOfBottlesSold > 5){
        alerts.push({name: 'Bottle Count', message: `Poppin bottles! You entered a bottle count of ${checkout.numberOfBottlesSold}, 
        just wanted to make sure this was correct!`});
        shouldAlert = true;
    }

    if (checkout.nonTipOutBarSales > 400){
        alerts.push({name: 'Bottle Value', message: `Just wanted to make sure ${checkout.nonTipOutBarSales} was correct for 
        your bottle value.`});
        shouldAlert = true;
    }

    let alertResult = { shouldAlert: shouldAlert, alerts: alerts };
    return alertResult;
}