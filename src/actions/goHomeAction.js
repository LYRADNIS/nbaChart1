const goHomeAction = (payload) => (dispatch) =>{
  dispatch({
    type: 'SWITCH_TO_HOME',
    PAYLOAD: payload
  })
}

export default goHomeAction;