import React, { Component } from 'react';
import './App.css';
import Graph from './components/Graph';
import TeamChoices from './components/TeamChoices';
import CopyPasteArea from './components/copyPasteArea';
import TeamStatus from './components/TeamStatus';
import CSVReader from 'react-csv-reader'

import fillNbaDataAction from './actions/fillNbaDataAction';
import { connect } from 'react-redux'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currData:[],
      bigData:{},
    }

    this.handleCsvData = this.handleCsvData.bind(this)
    this.handleAddTeamNames = this.handleAddTeamNames.bind(this)
  }
  //component will receive props: make a check for the plottedTeams; if its different
  // run this.handle csv data

  handleCsvData(data){
  try {
      this.setState({
        currData: data
      }, this.handleAddTeamNames(data))
    } catch(e){
      console.log(e)
    }
  };

  handleAddTeamNames(data){
    console.log('inside habndle names:', data)
    let bigData1 = {}
    // init the data with home/away/both arr's
    for(let i = 1; i < data.length - 1; i++){
      if(!bigData1[data[i][2]]){
        bigData1[data[i][2]] = {home:[], away:[], both:[]}
      }
      if(!bigData1[data[i][4]]){
        bigData1[data[i][4]] = {home:[], away:[], both:[]}
      }
    }
    //populate each teams away and home data

    for(let k = 1;k<data.length - 1; k++){
      if(bigData1[data[k][2]]){
        bigData1[data[k][2]].away.push([data[k][0], data[k][3]])
      }

      if(bigData1[data[k][4]]){
        bigData1[data[k][4]].home.push([data[k][0], data[k][5]])
      }
    }
    // populate the both games

    for(let key in bigData1){
      let awayArr = bigData1[key].away.slice()
      let homeArr = bigData1[key].home.slice()
      let bothArr = awayArr.concat(homeArr);
      let sortedBothArr = bothArr.sort((a,b)=>{
         return new Date(a[0]) - new Date(b[0]);
      })

      bigData1[key].both = sortedBothArr
    }
    // send to redux store
    this.setState({
      bigData: bigData1
    },() => this.props.fillNbaDataAction(bigData1))
  }


  render() {
    return (
      <div className="App">
        <div>
          <CSVReader
            label="Select CSV"
            onFileLoaded={this.handleCsvData}
          />
        </div>

      <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-around'}}>

          <TeamChoices />
          <TeamStatus />
          <CopyPasteArea/>

      </div>
        <div>
          <Graph />
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = (dispatch) => ({
  fillNbaDataAction: (payload) =>dispatch(fillNbaDataAction(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
