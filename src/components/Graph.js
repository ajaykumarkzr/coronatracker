/**
 * dataofMap will be get from Indiamap through App.js, using function open and state graphSeries
 */

import React from 'react';
import Chart from 'react-apexcharts';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';


export default function Graph(props) {




  let dataofMap = props.graphSeries;


    let state = {
        series: dataofMap.properties.value2.maptoGraph,
        options: {
          chart: {
            toolbar:{
              show: false
            }
          },
          title: {
            text: dataofMap.properties.name,
            align: 'center',
            style: {
              fontSize: '20px',
              color:  '#263238',
            }
          },
          legend:{
            show: true,
          },
          responsive:[{
            breakpoint: 800,
            options: {
              plotOptions: {
                bar: {
                  horizontal: false
                }
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
          xaxis: {
            categories: dataofMap.properties.value2.date
          },
          yaxis: [{
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: false,
              color: '#008FFB'
            },
            title: {
              text: '',
              color: '#008FFB'
            }
          }],
          dataLabels: {
            enabled: false,

          }
        },
      }



    return(
      <div className='levelItem isCherry fadeInUp' style={{animationDelay: '1s'}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: '6px'}}>
          <CancelOutlinedIcon onClick={props.closeGraph} style={{width: '1rem'}}/>
        </div>
        <Chart options={state.options} series={state.series} type="line" />
      </div>
    );
}