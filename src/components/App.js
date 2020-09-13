/**
 * mapDataIN holds the complete data for the map
 * state graphOpen make the graph show and hide
 * state graphSeries provides the value to the graph from the Indiamap component using open function through props
 * mapView if mapView is true, map will be shown. if mapView is false, the summary will be shown
 * state dat is used to store the state data so that the states can be identified using the id, this is made by data2
 * state totalCases is used to show the summary
 * state errors is used to show the error when calling api
 * stateid is used to connect the data from api and the map
 */


import React, { useState, useEffect } from 'react';
import Indiamap from './Indiamap';
import Mapvar from './Mapvar';
import Graph from './Graph';
import viruspair from './viruspair.svg';
import { CssBaseline, Container, Grid, Typography, Paper, Button } from '@material-ui/core';
import mapDataIN from "@highcharts/map-collection/countries/in/in-all.geo.json";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';
import ids from '../utils/stateids.json';
import Axios from 'axios';




export default function App() {


  const [graphOpen, setGraphOpen] = useState(false);
  const [graphSeries, setGraphSeries] = useState(null);
  const [mapView, setMapView] = useState(true);
  const [dat, setDat] = useState(null);
  const [totalcases, setTotalCases] = useState([])
  const [errors, setErr] = useState(null);
  const checked = true;



  
  let stateid = ids.stateids;




  useEffect(() => {
    Axios.get("https://api.covid19india.org/states_daily.json").then(res => {
      let data = res.data;

      let data2 = [
        ['in-py'],
        ['in-ld'],
        ['in-wb'],
        ['in-or'],
        ['in-br'],
        ['in-sk'],
        ['in-ct'],
        ['in-tn'],
        ['in-mp'],
        ['in-2984'],
        ['in-ga'],
        ['in-nl'],
        ['in-mn'],
        ['in-ar'],
        ['in-mz'],
        ['in-tr'],
        ['in-3464'],
        ['in-dl'],
        ['in-hr'],
        ['in-ch'],
        ['in-hp'],
        ['in-jk'],
        ['in-kl'],
        ['in-ka'],
        ['in-dn'],
        ['in-mh'],
        ['in-as'],
        ['in-ap'],
        ['in-ml'],
        ['in-pb'],
        ['in-rj'],
        ['in-up'],
        ['in-ut'],
        ['in-jh'],
    ];

    if(data){
      for(let i=0; i<mapDataIN.features.length; i++){     
          let dailySeries = {};
          for(let j=0; j<stateid.length; j++){

              if(mapDataIN.features[i].id === stateid[j].id1){
                  mapDataIN.features[i].idset = stateid[j];
                  let id4 = stateid[j].id4;
                  let confirmed = [];
                  let confirmrdvar = 0;
                  let recovered = [];
                  let recoveredvar = 0;
                  let deceased = [];
                  let deceasedvar = 0;
                  let date = [];
                  for(let k=0; k<data.states_daily.length; k++){
                      
                      if(data.states_daily[k].status === "Confirmed"){
                          date.push(data.states_daily[k].date);
                          if(parseInt(data.states_daily[k][id4])){
                              confirmrdvar += parseInt(data.states_daily[k][id4]);
                              confirmed.push(confirmrdvar);
                          }
                          else{
                              confirmrdvar += 0;
                              confirmed.push(confirmrdvar);
                          }
                      }
                      else if(data.states_daily[k].status === "Recovered"){
                        if(parseInt(data.states_daily[k][id4])){
                          recoveredvar += parseInt(data.states_daily[k][id4]);
                          recovered.push(recoveredvar);
                        }
                        else{
                          recoveredvar += 0;
                          recovered.push(recoveredvar)
                        }
                      }
                      else if(data.states_daily[k].status === "Deceased"){
                        if(parseInt(data.states_daily[k][id4])){
                          deceasedvar += parseInt(data.states_daily[k][id4]);
                          deceased.push(deceasedvar);
                        }
                        else{
                          deceasedvar += 0;
                          deceased.push(deceasedvar);
                        }
                      }
                      else{
                        console.log(data.states_daily[k].status)
                      }
                  }
                  dailySeries.name = mapDataIN.features[i].properties.name;
                  dailySeries.confirmedSeries = confirmed;
                  dailySeries.confirmed = confirmrdvar;
                  dailySeries.recoveredSeries = recovered;
                  dailySeries.recovered = recoveredvar;
                  dailySeries.deceasedSeries = deceased;
                  dailySeries.deceased = deceasedvar;
                  dailySeries.date = date;
                  dailySeries.maptoGraph = [
                      {
                          name: 'confirmed',
                          data: confirmed,
                          type: 'line'
                      },
                      {
                          name: 'recovered',
                          data: recovered,
                          type: 'line'
                      },
                      {
                          name: 'deceased',
                          data: deceased,
                          type: 'line'
                      }
                  ]
                  mapDataIN.features[i].properties.value2 = dailySeries;
                  break;
              }
          }
      }

  
      for(let i=0; i<data2.length; i++){
          for(let j=0; j<mapDataIN.features.length; j++){
              if(data2[i][0] === mapDataIN.features[j].idset.id3){
                  data2[i].push(mapDataIN.features[j].properties.value2.confirmed)
                  break;
              }
          }
      }
      setDat(data2);
    }
  }).catch(error => {
    setErr({errorMessage:error.message})
  })

  let isSubscribed1 = true;
  Axios.get('https://api.covid19india.org/data.json').then(res => {
    isSubscribed1 ? setTotalCases(res.data.statewise[0]) : setTotalCases([]);
  }).catch(errors => {
    console.log(errors)
  })
  return() => {
    isSubscribed1 = false;
  };

  },[stateid])

  
  // useEffect(() => {
  //   let isSubscribed1 = true;
  //   Axios.get('https://api.covid19india.org/data.json').then(res => {
  //     isSubscribed1 ? setTotalCases(res.data.statewise[0]) : setTotalCases([]);
  //   }).catch(errors => {
  //     console.log(errors)
  //   })
  //   return() => {
  //     isSubscribed1 = false;
  //   };
  // },[])



  const mapShow = () => {
    setMapView(true);
  };
  const mapHide = () => {
    setMapView(false);
  }
  const open = (graphSer) => {
    setGraphSeries(graphSer);
    setGraphOpen(true);
  };

  const closeGraph = () => {
    setGraphOpen(false);
  };

  return (
    <div>
      {dat ? 
    <div style={{transition: 'fade'}}>
      <Grid container style={{display: 'flex', justifyContent: 'center', paddingLeft: '2%'}}>
          <Grid item className='header'>
          <Grow in={checked}
              style={{ transformOrigin: '0 0 0' }}
              {...(checked ? { timeout: 1000 } : {})}
            >
              <img src={viruspair} style={{width: '2rem', height: '2rem', marginTop: '2vh'}} alt='viruspair' onClick={()=>{window.location.reload(false)}} />
            </Grow>
          </Grid>
          <Grid item>
          <Grow in={checked}
              style={{ transformOrigin: '0 0 0' }}
              {...(checked ? { timeout: 1000 } : {})}
            >
            <Typography style={{textAlign: 'center', fontFamily: 'Times New Roman', fontSize: 30, marginTop: '1vh'}}>
              COVID19-TRACKER
            </Typography>
            </Grow>
          </Grid>
      </Grid>
      {mapView ?
        <Grid container style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-around',
          marginRight: '1vw'
          }} >
          <Grid item xs={8} style={{padding:'1rem', paddingLeft: '1rem'}}>
            <Grow in={checked}
              style={{ transformOrigin: '0 0 0' }}
              {...(checked ? { timeout: 1000 } : {})}
            >
              <Paper elevation={6}>
                <div className='containerdiv' style={{display: 'flex', flexDirection: 'row', animationDuration: '1s', justifyContent: 'flex-end', paddingTop: '2vh', paddingRight: '2vw'}}>
                    <Button style={{transition: '2s'}} onClick={mapHide} >summary</Button>
                </div>
                <React.Fragment>
                  <CssBaseline />
                  <Container maxWidth="sm" >
                    <Indiamap closeGraph={closeGraph} mapDataIN={mapDataIN} dat={dat} open={open} />
                  </Container>
                </React.Fragment>
              </Paper>
            </Grow>
          </Grid>
          <Grid item xs={4} style={{ width: '30%', paddingTop: '2.2vh', paddingRight: '1rem' }} >
            <Paper>
              { graphOpen ?
              <Fade in={checked}
                {...(checked ? { timeout: 1000 } : {})}
              >
                  <Paper elevation={6} >
                    <div className='containerdiv' style={{animationDuration: '1s'}}>
                      <Graph style={{position: 'absolute'}} graphSeries={graphSeries} closeGraph={closeGraph} graphOpen={graphOpen}/>
                    </div>
                  </Paper>
                  </Fade>
                    : <div></div> }
            </Paper>
          </Grid>
        </Grid>
        : <Mapvar mapShow={mapShow} totalcases={totalcases}/>
    }
    </div >
    : <div>
        {errors ? 
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '45vh'}}>
          <Typography style={{textAlign: 'center'}}>{errors.errorMessage}</Typography><Typography style={{textAlign: 'center'}}>Check internet connection</Typography>
        </div> 
        : 
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '45vh'}}>
          <CircularProgress />
        </div>
        }
      </div>
        }
    </div>
  );
}