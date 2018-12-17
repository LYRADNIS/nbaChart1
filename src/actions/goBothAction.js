const goBothAction = (payload) => (dispatch) => {
  dispatch({
    type: 'SWITCH_TO_BOTH',
    PAYLOAD: payload
  })
}

export default goBothAction;