/**
 * state state and clickedState is used to control the graph show/hide according to clicking on the state
 * mapDataIN and data will be updated mapDataIN from app.js
 * the state graphSeries will be updated when clicking the state, the click event will call the open function from app.js
 */

import React, { useState } from 'react';
import ReactHighmaps from 'react-highcharts/ReactHighmaps';



//map is without including telengana, ladakh, andaman nicobar


export default function Indiamap(props) {
    
    
    const [state, setState] = useState(2);
    const [clickedSate, setClickedState] = useState('');


    let mapDataIN = props.mapDataIN;
    let data = props.dat;
    
    const mapOptions = {
        chart: {
        map: 'countries/in/in-all',
        height: 510,
        animation: true,
        },
        title: {
        text: "INDIA"
        },
        subtitle: {
            text: 'COVID-19 TRACKER'
        },
        credits: {
        enabled: false
        },
        tooltip: {
            split: false,
            animation: true,
            backgroundColor: 'white',
            pointFormat: 'Positive cases: <b>{point.properties.value2.confirmed}</b><br/> Cured: <b>{point.properties.value2.recovered}</b><br/>Deaths: <b>{point.properties.value2.deceased}</b>',
            boarderRadius: 12,
            boarderWidth: 5,
            headerFormat: '<span style="color:{point.color}">●</span>{point.key}<br/>',
            headerShape: 'callout',
            distance: 10,
            style: {
                color: 'black',
            }
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        colorAxis: {
            min: 0
        },
        series: [{
            type: 'map',
            data: data,
            name: '',
            allowPointSelect: true,
            mapData: mapDataIN,
            chart: '',
            clip: true,
            cursor: 'pointer',
            tooltip: {
                animation: true,
                backgroundColor: 'blue',
                enabled: true,
                shadow: true,
                stickOnContact: false
            },
            events: {
                click: function(event) {
                    let x = event.point.index
                            if(clickedSate === mapDataIN.features[x].id){
                                if((state%2) === 0){
                                    props.closeGraph();
                                }
                                else{
                                    props.open(mapDataIN.features[x]);
                                }
                                setState(state+1);
                            }
                            else{
                                setState(2);
                                setClickedState(mapDataIN.features[x].id);
                                props.open(mapDataIN.features[x]);
                            }
                }
            },
            states: {
                hover: {
                    color: '#BADA55'
                },
                select: {
                    color: '#a4edba',
                    borderColor: 'black',
                    dashStyle: 'shortdot'
                }
            },
            dataLabels: {
                enabled: false,
                format: '{point.name}'
            },
            dragDrop: {
                draggableX: true
            }
        }]
    };


  
return(
    <div>
            <ReactHighmaps config={mapOptions}></ReactHighmaps>
    </div>
);
}