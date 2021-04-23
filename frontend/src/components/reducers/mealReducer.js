const mealItem = JSON.parse(localStorage.getItem('mealItem'))

const initialState = {
    meal:mealItem,
    checkout:"",
    alert:true
}

export const meals = (state = initialState, action) => {
    switch(action.type){
        case "MEAL_ITEM": 
            return {...state, meal:action.meal}
        case "CHECKOUT":
            return {...state, checkout:action.checkout}
        case "ALERT":
            return {...state, alert:action.alert}  
        default:
            return state
    }
} 