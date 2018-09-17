import React from "react";
import Header from "./Header";
import ProjectListStatusBar from "./ProjectListStatusBar";
import Notifications from "./Notifications";
import MostCommitsChart from "./MostCommitsChart";
import MostHoursChart from "./MostHoursChart";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.texts= {
      title: "Proyectos"
    };
  }

  componentDidMount() {
    this.props.retrieveFromApi("projects").then(apiResponse => {
      this.saveCommitsAndHours(apiResponse);
    });
  }

  saveCommitsAndHours(apiResponse) {
    const projectsData= [];
    for (var elemento in apiResponse.data[0].commitRank) {
      projectsData.push({
        projectName: elemento,
        commits: apiResponse.data[0].commitRank[elemento]
      });
    }
    this.props.updateState({
      projectsCharts: projectsData
    });
    const hoursData= [];
    for (var hoursProject in apiResponse.data[0].hourRank) {
      hoursData.push({
        hoursName: hoursProject,
        time: apiResponse.data[0].hourRank[hoursProject]
      });
    }
    this.props.updateState({
      hoursCharts: hoursData
    });
  }

  render() {
    return (
      <div className= "projects__container databoard">
        <Header title= {this.texts.title} />
        <ProjectListStatusBar projectsdata= {this.props.projectsdata}
          updateState={this.props.updateState}
          retrieveFromApi={this.props.retrieveFromApi}
         />
        <div className= "statistics__chart">
          <div className= "chart__details">
            <p>Proyectos más activos (commits)</p>
            <MostCommitsChart data= {this.props.projectsCharts} />
          </div>
          <div className= "chart__details">
            <p>Proyectos más activos (horas)</p>
            <MostHoursChart hours= {this.props.hoursCharts} />
          </div>
        </div>
        <Notifications notifications={this.props.notifications} />
      </div>
    );
  }
}

export default Projects;
