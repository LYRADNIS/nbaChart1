const fillNbaActionData = (payload) => (dispatch) => (
  dispatch({
    type:'FILL_TEAM_DATA',
    PAYLOAD: payload
  })
)
export default fillNbaActionData;

