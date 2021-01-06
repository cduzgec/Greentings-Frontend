import * as React from 'react';
import ManagerPage from "./SalesManager";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";
import Ch1 from './charts/chart1';
import Ch4 from './charts/chart4';
import Ch3 from './charts/chart3';



const useStyles = makeStyles((theme) => ({

    paperContainer: {
        marginTop: "1px",
        marginLeft: "400px",
        marginRight: "300px"
    },
}));
const styles = {
    paperContainer: {
        marginTop: "1px",
        marginLeft: "400px",
        marginRight: "300px"
    },
};


const data = [
  { country: 'Russia', area: 12 },
  { country: 'Canada', area: 7 },
  { country: 'USA', area: 7 },
  { country: 'China', area: 7 },
  { country: 'Brazil', area: 6 },
  { country: 'Australia', area: 5 },
  { country: 'India', area: 2 },
  { country: 'Others', area: 55 },
];
export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (

<Paper style={styles.paperContainer} elevation={10}>
     <ManagerPage/>
     <div>
     <Ch4/>

     </div>
     <div>
     <Ch3/>

     </div>
   
  

        {/* <Chart
          data={chartData}
        >
          <PieSeries
            valueField="area"
            argumentField="country"
          />
          <Title
            text="say hello to our chart"
          />
          <Animation />
        </Chart> */}
      </Paper>
    );
  }
}
