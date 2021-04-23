import {combineReducers} from 'redux'
import { meals } from './mealReducer'
import { orders } from './orderReducer'
import { user } from './userReducer'

export const rootReducer = combineReducers({
    meals,
    user,
    orders
})  