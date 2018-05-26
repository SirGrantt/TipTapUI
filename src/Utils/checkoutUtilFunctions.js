export function checkoutFormIsValid(checkout){
    let isValid = true;
    let errors = {};

    if (checkout.grossSales == 0){
        errors.grossSales = 'Gross Sales is required'
        isValid = false;
    }

    let errorList = { isValid: isValid, errors: errors};
    return errorList;
    
}