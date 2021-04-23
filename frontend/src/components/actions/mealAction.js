export const meal = (meal) => {
    return {type:'MEAL_ITEM', meal:meal}  
}    

export const checkout = (checkout) => {
    return {type:'CHECKOUT', checkout:checkout}
}

export const alert = (alert) => {
    return {type:'ALERT', alert:alert}
}