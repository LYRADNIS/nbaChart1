import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux'

const createNewLine = (data) => {


  return (
    <Line
        data={data}
        options={{
          intersect:true,

          mantainAspectRatio:false,
          spanGaps: true,
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          },
          tooltips: {
            mode: 'index',
            intersect: true,
            },
          scales: {
            xAxes: [{
            display: true,
              scaleLabel: {
                display: true,
                labelString: 'Dates'
              },
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Points'
          },
      }, {
        ticks: {
          beginAtZero:false
        }
      }

      ]
    }
        }}
      />
    )

}



class Graph extends Component {
  constructor(props){
    super(props)
    this.state = {
        currStatus: 'home',
        plottedData:false,
        plotData: null,
        currData: {
          labels: ["Red",'green'],
          datasets: [{
              label: 'Loading',
                data: [{
                  x: 9,
                  y: 10,
                },{
                  x:15,
                  y:11
                }
              ],
                borderWidth: 1
            },

            {
              label: '2',
                data: [{
                  x: 30,
                  y: 40
                },{
                  x:17,
                  y:50
                }

                ],
                borderWidth: 1
            }
          ]
        }
    }
    this.handlePlottedData = this.handlePlottedData.bind(this)

  }

  componentWillReceiveProps(nextProps){
    // this will run everytime we add a new team
    console.log(nextProps)

    let currState = JSON.stringify(this.props.manageCurrTeamsReducer.currTeams)
    let nextState = JSON.stringify(nextProps.manageCurrTeamsReducer.currTeams)
    let visitCurrStatus = JSON.stringify(this.props.visitStatusReducer)
    let visitNextStatus = JSON.stringify(nextProps.visitStatusReducer)
    let { currStatus }= this.state

    if(currState !== nextState || visitCurrStatus !== visitNextStatus){
      let newDates = [];
      let newDataSets = []
      let newDataDictionary = {}

      // this is how we update: maybe we try how they update stuff

      nextProps.manageCurrTeamsReducer.currTeams.forEach((teamName, index)=>{
        // created new dates for the set
        let homeDataSet = [];
        let awayDataSet = [];
        let bothDataSet = [];

        if(nextProps.visitStatusReducer.home === true){
          console.log('we are in home')
          currStatus = 'home'

            let homeDict = {}
            nextProps.nbaTeamDataReducer.data[teamName].home.forEach((value, index, key)=>{
              //make a dictionary check
            if(!homeDict[value[0]]){
              newDates.push(value[0])
              homeDict[value[0]] = true
              homeDataSet.push(value[1])
            }
          })
            // how to properly update data set
            //adds the new dataset
          newDataSets.push({
            label: teamName,
            data: homeDataSet,
            borderWidth: 10,
            fill: false
          })

        } else if(nextProps.visitStatusReducer.away === true){
          console.log('we are in away')
          currStatus = 'away'
          let awayDict = {};
          nextProps.nbaTeamDataReducer.data[teamName].away.forEach((value, index, key)=>{
              //make a dictionary check
          if(!awayDict[value[0]]){
            newDates.push(value[0])
            awayDict[value[0]] = true
          }
            awayDataSet.push(value[1])
          })

          newDataSets.push({
            label: teamName,
            data: awayDataSet,
            borderWidth: 10,
            fill: false
          })
        } else if(nextProps.visitStatusReducer.both === true){
          currStatus = 'both'
          let bothDict = {}
          nextProps.nbaTeamDataReducer.data[teamName].both.forEach((value, index, key)=>{
            //make a dictionary check
            if(!bothDict[value[0]]){
              newDates.push(value[0])
              bothDict[value[0]] = true
            }
            bothDataSet.push(value[1])
          })
          newDataSets.push({
            label: teamName,
            data: bothDataSet,
            borderWidth: 10,
            fill: false,
          })
        }
      })
      // final check
      let finalCheck = {};
      for(let i = 0; i < newDates.length - 1;i++){
        if(!finalCheck[newDates[i]]){
          finalCheck[newDates[i]] = true
        }
      }

      newDates = Object.keys(finalCheck)
      // sort dates here and store in string form ^
      newDates = newDates.sort((a,b)=>{
        return new Date(a) - new Date(b)
      })
      const manyDates = ['10/26/2016-10/31/2016', '11/31/2016-11/6/2017','11/6/2016-11/12/2016', '11/12/2016-11/18/2016','11/18/2016-11/24/2016', '11/24/2016-11/30/2016','12/1/2016-12/7/2016,','12/8/2016-12/14/2016','12/15/2016-12/21/2016','12/22/2016-12/28/2016','12/29/2016-1/4/2017']

      newDataDictionary.labels = nextProps.manageCurrTeamsReducer.currTeams.length > 1 ? manyDates : newDates
      newDataDictionary.datasets = newDataSets

      console.log('correct data sets', newDataDictionary.datasets)

      this.setState({
        currData: newDataDictionary
      })
    } else if(this.props.manageCurrTeamsReducer.dataToPlot !== nextProps.manageCurrTeamsReducer.dataToPlot ){
      console.log('inside gtaph')

      //shape data with handle plotted data; need shaped data from this to feed into plotData


      this.setState({
        plottedData: true,
        plotData: this.handlePlottedData(nextProps.manageCurrTeamsReducer.dataToPlot, currStatus)
      })
    }
  }


  handlePlottedData(data, currentStatus='home'){
    data = data[0]
    let bigData1 = {}
    // init the data with home/away/both arr's
    for(let i = 0; i < data.length; i++){
      if(!bigData1[data[i][2]]){
        bigData1[data[i][2]] = {home:[], away:[], both:[], homePoints:[], awayPoints:[], bothPoints:[]}
      }
      if(!bigData1[data[i][4]]){
        bigData1[data[i][4]] = {home:[], away:[], both:[], homePoints:[], awayPoints:[], bothPoints:[]}
      }
    }
    //populate each teams away and home data

    for(let k = 0;k<data.length; k++){
      if(bigData1[data[k][2]]){
        bigData1[data[k][2]].away.push([data[k][0], data[k][3]])
        bigData1[data[k][2]].awayPoints.push(data[k][3])
      }

      if(bigData1[data[k][4]]){
        bigData1[data[k][4]].home.push([data[k][0], data[k][5]])
        bigData1[data[k][4]].homePoints.push(data[k][5])
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
      bigData1[key].bothPoints = (bigData1[key].homePoints.concat(bigData1[key].awayPoints))
    }


    let teamNames = Object.keys(bigData1)
    let plottedDateLabels = []
    let plottedDataSets = []
    let plotObject = {};
    let dupCheck = {};

    //load all dates into dateLabels
    //load all datasets into ds


    // handle dates
    let currPointStatus = 'homePoints'
    if(currentStatus ==='home'){
      currPointStatus = 'homePoints'
    } else if(currentStatus ==='away'){
      currPointStatus = 'awayPoints'
    } else {
      currPointStatus = 'bothPoints'
    }


      teamNames.forEach((name, index)=>{
        bigData1[name][currentStatus].forEach((tuple)=>{
          if(!dupCheck[tuple[0]]){
            plottedDateLabels.push(tuple[0])
            // could be problem here
            dupCheck[tuple[0]] = true
            plottedDataSets.push({
              label: name,
              data: bigData1[name][currPointStatus]
            })
          }
        })
      })

    // sort dates

    plottedDateLabels = plottedDateLabels.sort((a,b)=>{
      return new Date(a) - new Date(b)
    })


    // wrong right here:


    console.log('this is big data:',bigData1)

    plotObject.labels = plottedDateLabels
    plotObject.datasets = plottedDataSets
    console.log(plotObject)


    return plotObject
  }




  // we can have three separatefunctions for both: home away: change current compionent based opn that

  render(){
    const renderLineChart = this.state.plottedData ? createNewLine(this.state.plotData) : createNewLine(this.state.currData)
    // before wwe render; we gott amake sure plotData is in correct format


    return (
      <div>
      {
        renderLineChart
      }
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  ...state
})


export default connect(mapStateToProps)(Graph)