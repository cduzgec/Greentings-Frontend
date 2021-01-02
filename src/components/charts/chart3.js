import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

const data = [
  { category: 'clothing', sales: 500 },
  { category: 'accessories', sales: 400 },
  { category: 'technology', sales: 365 },

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
      <Paper>
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="sales"
            argumentField="category"
          />
          <Title text="Sales by Categories" />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
