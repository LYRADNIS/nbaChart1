const goAwayAction = (payload) => (dispatch) =>{
  dispatch({
    type: 'SWITCH_TO_AWAY',
    PAYLOAD: payload
  })
}

export default goAwayAction;