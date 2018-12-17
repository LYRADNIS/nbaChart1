import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import fillNbaDataAction from '../actions/fillNbaDataAction'
import addTeamAction from '../actions/addTeamAction'

// needs connection to app

class TeamChoice extends Component{
  constructor(props){
    super(props)
    this.state = {
      currChoices: [],
      currComponent:(<div>Drop Down menu will load after CSV file is uploaded</div>),
      selectedOption: null
    }
    this.handleFormChange = this.handleFormChange.bind(this)
  }

  // this might be deprecated:wwe need to rerender this component
  // when we recieve new props
  componentWillReceiveProps(nextProps){

    let selectedOptions = [];
    const { selectedOption } = this.state
    if(JSON.stringify(this.props.nbaTeamDataReducer) !== JSON.stringify(nextProps.nbaTeamDataReducer)){
      const teamNames = Object.values(nextProps.nbaTeamDataReducer)

      for(let key in teamNames[0]){
        selectedOptions.push({value:key, label:key})
      }

        this.setState({
          currChoices:selectedOptions,
          currComponent: (
          // need to add handlechange and selected option/s
            <Select
              value={selectedOption}
              options={selectedOptions}
              onChange={this.handleFormChange}
              placeholder='Add Team to graph'
            />
            ),
        })
    }
  }

  handleFormChange(selectedOption){
    //make action that sends current data to manageCurrTeamsReducer
    this.props.addTeamAction(selectedOption.label)
  }

  render(){
  const divSel = this.state.currComponent

  return (
    <div style={{width:'200px'}}>
      {
        divSel
      }
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = (dispatch) => ({
  fillNbaDataAction: (payload) => dispatch(fillNbaDataAction(payload)),
  addTeamAction: (payload) => dispatch(addTeamAction(payload))
})


export default connect(mapStateToProps, mapDispatchToProps)(TeamChoice);