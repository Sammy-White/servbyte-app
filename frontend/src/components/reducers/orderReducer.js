const initialState = {
    orders:[]
}

export const orders = (state=initialState, action) => {
    switch(action.type){
        case "ORDERS":
            return {...state, orders:action.orders}
        default:
            return state
    }
}