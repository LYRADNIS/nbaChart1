const addTeamAction = (payload) => (dispatch) => (
    dispatch({
        type: 'ADD_TEAM',
        PAYLOAD: payload
    })
  )

export default addTeamAction
