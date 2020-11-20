import store from '../redux/store'

export default function dateHandler (date){
    let decomposedDate = date.split('-')
    
    let day = parseInt(decomposedDate[0])
    let month = parseInt(decomposedDate[1])

    if(day > 31 || day < 1) {
        store.dispatch(setBadNotification('El dia ingresado es incorrecto'))    
        return 'wrong day'
    }
    if(month > 12 || month < 1) {
        store.dispatch(setBadNotification('El mes ingresado es incorrecto'))
        return 'wrong month'
    }
    if((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
        store.dispatch(setBadNotification('El mes ingresado nada mas tiene 30 dias'))    
        return 'month only 30 days'
    }
    
    return 'everything its fine'
}

const setBadNotification = (message) => {
    return {
        type: 'SET_BAD_NOTIFICATION',
        payload: message
    }
}