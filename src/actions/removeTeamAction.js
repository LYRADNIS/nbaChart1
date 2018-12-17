const removeTeamAction = (payload) => (dispatch) => (
    dispatch({
        type: 'REMOVE_TEAM',
        PAYLOAD: payload
    })
  )

export default removeTeamAction;