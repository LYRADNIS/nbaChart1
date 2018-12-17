import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import goAwayAction from '../actions/goAwayAction'
import goBothAction from '../actions/goBothAction'
import goHomeAction from '../actions/goHomeAction'

const options = [
  { value: 'home', label: 'HOME' },
  { value: 'away', label: 'AWAY' },
  { value: 'both', label: 'BOTH' }
];

class TeamStatus extends Component{
  constructor(props){
    super(props)
    this.state = {
      selectedOption: 'HOME'
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(selectedOption){
    this.setState({
      selectedOption
    })
    switch(selectedOption.label){
      case 'HOME':
        this.props.goHomeAction()
        break;
      case 'AWAY':
        this.props.goAwayAction()
        break;
      case 'BOTH':
        this.props.goBothAction()
        break;
      default:
        return
    }
  }

  render(){
    const { selectedOption } = this.state;
    return(
      <div style={{width:'200px'}}>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}

        />
      </div>
      )
  }
}

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = (dispatch) => ({
  goAwayAction: (payload) => dispatch(goAwayAction(payload)),
  goHomeAction: (payload) => dispatch(goHomeAction(payload)),
  goBothAction: (payload) => dispatch(goBothAction(payload))
})


export default connect(mapStateToProps, mapDispatchToProps)(TeamStatus);