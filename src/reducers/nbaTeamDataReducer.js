// load all of the csv file at once into team data.

//if we paste in new data; we should shape the data in the front end before sending it to reducer
export default (teamData={}, action) => {
  switch(action.type){
    case 'FILL_TEAM_DATA':
    return {
        data:action.PAYLOAD
    }
    default:
      return teamData
  }

}