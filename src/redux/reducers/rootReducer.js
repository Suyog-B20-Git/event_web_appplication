// ** Redux Imports
import {combineReducers} from 'redux'

// ** Reducers Import **//
import organizerReducer from './master/typeOfLiftReducer'

const rootReducer = combineReducers({

  organizerReducer,

})

export default rootReducer
