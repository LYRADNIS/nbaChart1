export default (status={home: true, away: false, both: false}, action) => {
  switch(action.type){
    case 'SWITCH_TO_HOME':
      return {
        home: true,
        away: false,
        both: false
      }
    case 'SWITCH_TO_AWAY':
      return {
        home: false,
        away: true,
        both: false
      }
    case 'SWITCH_TO_BOTH':
      return {
        home: false,
        away: false,
        both: true
      }
    default:
      return status
  }
}