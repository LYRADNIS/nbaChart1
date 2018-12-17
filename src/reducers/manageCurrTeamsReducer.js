export default (state={currTeams:[], seen:{}, dataToPlot:[]}, action) => {

  switch(action.type){
    case 'ADD_TEAM':
      if(!state.seen[action.PAYLOAD]){
        // set seen.action.payload to true
        state.seen[action.PAYLOAD] = true
        return {
          ...state,
          currTeams:[...state.currTeams, action.PAYLOAD]
        }
      }
      return state
    case 'REMOVE_TEAM':
      let newArr = state.currTeams.slice()
      for(let i = 0; i < newArr.length - 1;i++){
        if(newArr[i] === action.PAYLOAD){
          newArr = newArr.splice(i, 1)
        }
      }
      return {
        ...state, currTeams: newArr
      }
    case 'ADD_PLOTTED_TEAM':
      return {
        ...state, dataToPlot:[action.PAYLOAD]
      }
    default:
      return state
  }
}