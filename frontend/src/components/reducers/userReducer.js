const initialState = {
    user:{}
}

export const user = (state=initialState, action) => {
    switch(action.type){
        case "USER_PROFILE":
            return {...state, user: action.user}  
        default:
            return state
    }
}