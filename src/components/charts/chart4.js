import * as React from 'react';
import { useState, useEffect } from 'react';

import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';



const styles = {
  paperContainer: {
      backgroundImage: `url(${Image})`,
      opacity: "0.8" 
  }
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
    
      fontFamily: "Arial, Helvetica, sans-serif",
      margin: "100px 200px",
      width: "100%",
      height: "fit-content",
      padding: "40px",
    },
  },
  p:{
      fontSize: "18px",
      color: "black"
  },
  h1:{
    color: "black",
  },


  
}));

 function Text() {

  const classes = useStyles();
  
  const [graphData, setGraphData] = useState([]);
  useEffect(() => { fetchData(); }, []);
  
  const fetchData = async () => {
      const data = await fetch(`/brandsales/`);       
      const datas = await data.json();
      // burada setlemedene once datas 'ı asagaıdakı data sekılıne getır json formatı sanırım o .
      let graphData = [];
      Object.keys(datas).forEach(function(key) {
        let row = {brand: key, sales: datas[key]};
        graphData.push(row);
      })
      setGraphData(graphData);
   
    
  }




  return (
    
    <Paper>
      <Chart
        data={graphData}
        rotated
      >
        <ArgumentAxis />
        <ValueAxis max={7} />

        <BarSeries
          valueField="sales"
          argumentField="brand"
          color="purple"
        />
        <Title text="Sales by Brand" />
        <Animation />
        <EventTracker />
          <Tooltip />
      </Chart>
    </Paper>
  );
};

export default Text;