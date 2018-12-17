import { combineReducers } from 'redux'
import manageCurrTeamsReducer from './manageCurrTeamsReducer'
import visitStatusReducer from './visitStatusReducer'
import nbaTeamDataReducer from './nbaTeamDataReducer'

export default combineReducers({
    manageCurrTeamsReducer,
    visitStatusReducer,
    nbaTeamDataReducer
})