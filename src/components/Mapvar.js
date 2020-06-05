import React from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';

export default function Mapvar(props){
    let cases = props.totalcases;
    return(
        <div style={{padding: '1%'}}>
            <Grid container className='containerdiv' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}} >
                <Grid item xs={9} style={{padding:'1rem'}}>
                    <Paper style={{paddingTop: '1vh'}} elevation={6}>
                        <Typography style={{textAlign: 'center', fontFamily: 'Times New Roman', fontSize: 15}}>
                            POSITIVE CASES : {cases.active}
                        </Typography>
                        <Typography style={{textAlign: 'center', fontFamily: 'Times New Roman', fontSize: 20}}>
                            CURED : {cases.recovered}
                        </Typography>
                        <Typography style={{textAlign: 'center', fontFamily: 'Times New Roman', fontSize: 15}}>
                            TOTAL CONFIRMED : {cases.confirmed}
                        </Typography>
                        <Typography style={{textAlign: 'center', fontSize: 15}}>
                            DECEASED : {cases.deaths}
                        </Typography>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: '4rem'}}>
                            <MapIcon style={{height: '8vh', width: '8vw'}} onClick={props.mapShow} />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
          </div>
    );
}
