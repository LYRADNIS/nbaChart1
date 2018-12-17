import React, { Component } from 'react';
import { connect } from 'react-redux';
import addPlottedTeamAction from '../actions/addPlottedTeamAction'

class CopyPasteArea extends Component{
  constructor(){
    super()
    this.state = {
      text:null
    }
    this.handleArea = this.handleArea.bind(this)
    this.handleAddToPlot = this.handleAddToPlot.bind(this)
  }

  handleArea(e){
    this.setState({
      text:e.target.value
    })
  }

  handleAddToPlot(){
    let anwserArr = [];

    if(this.state.text){
      console.log(this.state.text.split(/(\r\n|\n|\r)/gm))
      for(let i = 1; i < this.state.text.split(/(\r\n|\n|\r)/gm).length; i++){
        if(this.state.text.split(/(\r\n|\n|\r)/gm)[i].length > 1){
          anwserArr.push(this.state.text.split(/(\r\n|\n|\r)/gm)[i])
        }
      }


      // send to store
      // listen in for app:
      // replace data
      let mapAnwser = anwserArr.map((row)=>{
        return row.split(',')
      })
      mapAnwser = mapAnwser.map((row)=>{
        return row.map((value, index)=>{
          if(index === 3 || index === 5){
            return JSON.parse(value)
          }
          return value
        })
      })

      this.props.addPlottedTeamAction(mapAnwser)
    }

  }

  render(){
    return(
      <div style={{display:'flex', flexDirection: 'column', width:'30%'}}>
        <textarea
        rows="4"
        cols="50"
        onInput={this.handleArea}
        defaultValue='date,start, visitor, pts, home, pts, Attendance, notes;'
      >
        </textarea>
        <button onClick={this.handleAddToPlot}>
          Plot data
        </button>
      </div>
      )
  }
}

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = (dispatch) => ({
  addPlottedTeamAction: (payload) => dispatch(addPlottedTeamAction(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(CopyPasteArea);