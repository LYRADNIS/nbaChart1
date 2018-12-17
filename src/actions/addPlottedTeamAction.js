const addPlottedTeamAction = (payload) => (dispatch) => (
    dispatch({
      type: 'ADD_PLOTTED_TEAM',
      PAYLOAD: payload
    })
)

export default addPlottedTeamAction