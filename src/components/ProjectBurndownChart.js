import React from 'react';
import { Chart } from 'devextreme-react';

const date = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const commits = [56, 56, 23, 5, 8, 9, 9, 67, 3, 3, 4, 4]
const task = [58, 16, 13, 5, 8, 9, 9, 7, 13, 3, 4, 5]

const settings=
{
  type: "line",
  argumentField: "date",
  color: "green"
};
const series=
[
  {
    color: "#57718D",
    valueField: "commits",
    label: {
      visible: true,
      backgroundColor: "none",
      position: "outside",
      font: {
        color: "white",
        size: 25,
        family: "Open Sans"
      },
    }
  },

  {
    color: "#98187D",
    valueField: "task",
    label: {
      visible: true,
      backgroundColor: "none",
      position: "outside",
      font: {
        color: "white",
        size: 25,
        family: "Open Sans"
      },
    }
  },
];
const size=
{
  height: 300
}
const axisSettings=
{
  label: {
    overlappingBehavior: "none",
    font: {
      color: "white",
      family: "Open Sans",
      size: 20
    }
  },
  grid:{
    visible: false
  },
  maxValueMargin: 0.1,
}
const legendsSettings= {
  visible: true
}

class ProjectBurndownChart extends React.Component {
  render(){
    return (
      <div className= "statistics__charts">
        <div className= "chart__project--completed-tasks">
        <Chart
          commonSeriesSettings= {settings}
          series= {series}
          size= {size}
          argumentAxis= {axisSettings}
          valueAxis= {axisSettings}
          legend= {legendsSettings}
        />
        </div>
      </div>
      );
  }
}

export default ProjectBurndownChart;
