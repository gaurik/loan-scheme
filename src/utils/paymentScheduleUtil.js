import moment from 'moment';
import paymentSchedule from '../constants/paymentSchedule';

// This is used to add dates to get first monday of each month
const DAYS_TO_ADD = {
    'Tuesday': 6,
    'Wednesday': 5,
    'Thursday': 4,
    'Friday': 3,
    'Saturday': 2,
    'Sunday': 1,
    'Monday': 0
};

const TWELVE_MONTH = 12;

/**
 * returns payment schedule based on financeYear
 * @param {number} financeYear 
 * @param {string} deliveryDate 
 */
export const getPaymentSchedule = ( financeYear, deliveryDate ) => {
    const dueDates = [];
    for(let index=0; index < financeYear*TWELVE_MONTH; index++) {
     const date = moment(deliveryDate).add(index+1, 'months').startOf('month');
     const newDate = moment(date).add(DAYS_TO_ADD[moment(date).format('dddd')], 'day')
     dueDates.push(`${moment(newDate).format('dddd')} ${newDate.format("DD MM YYYY")}`);
    }
    return dueDates;
};

/**
 * returns payment due in proper format
 * @param {string} payment 
 * @param {number} index 
 * @param {array} paymentSchedules 
 */
export const getPaymentDue = (payment, index, paymentSchedules) => {
    if( index === 0 ) {
        return Number(parseFloat(payment) + paymentSchedule.ARRANGEMENT_FEE).toFixed(2);
    } else if( paymentSchedules && index+1 === paymentSchedules.length) {
        return  Number(parseFloat(payment) + paymentSchedule.COMPLETETION_FEE).toFixed(2);
    }
    return Number(payment).toFixed(2);
}

/**
 * This is used to generate list of top six car results
 * @param {results} paymentSchedules 
 * @param {number} price 
 */
export const getCarResults = (results=[], price = 0) => {
    return results && results.length> 0 ? results.filter(result => 
        result.salesInfo && result.salesInfo.pricing && result.salesInfo.pricing 
        && result.salesInfo.pricing.cashPrice < parseFloat(price))
        .filter((v, index) => index< 6)
        .map( value => ({
            model: value.model,
            make: value.model,
            salesInfo: value.salesInfo,
            price: pricingDetailsByType(value, 'cashPrice'),
            deposit: pricingDetailsByType(value, 'deposit'),
            monthlyPayment: pricingDetailsByType(value, 'monthlyPayment'),
            title: value.title,
        })) : [];
}

const pricingDetailsByType = (value, type) => value.salesInfo &&  value.salesInfo.pricing ? 
    value.salesInfo.pricing[type] : '';