import React from "react";
import Header from "./Header";
import ProjectTopContributors from "./ProjectTopContributors";
import Notifications from "./Notifications";

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.texts = {
      title: "Proyectos > IKEA JD"
    };
  }

  componentDidMount() {
    this.props.retrieveFromApi("projects").then(apiResponse => {
      this.props.updateState({projectsdata: apiResponse.data[0]})
    });
  }

  render() {
    return (
      <div className="detailedprojects__container databoard">
        <Header title={this.texts.title} />
        <div className="detailedprojects__content">
          <div className="detailed-projects__statistics--container">
            <div className="statistics__data project__progress">
              <div className="project-progress__percentage">
                <div className="data__number">
                  <p>55%</p>
                </div>
                <div className="data__tags">
                  <p>progreso</p>
                </div>
              </div>
              <div className="project-progress__integer">
                <p className="progress__integer--completed">550/1000</p>
              </div>
            </div>
            <div className="statistics__data project__hours">
              <div className="data__number">
                <p>2500</p>
              </div>
              <div className="data__tags">
                <p>horas</p>
              </div>
            </div>
            <div className="statistics__data project__hours--week">
              <div className="data__number">
                <p>50</p>
              </div>
              <div className="data__tags">
                <p>horas semana</p>
              </div>
            </div>
            <div className="statistics__data project__commits">
              <div className="data__number">
                <p>1800</p>
              </div>
              <div className="data__tags">
                <p>commits</p>
              </div>
            </div>
          </div>
          <div className="statistics__charts">
            <div className="chart__project--completed-tasks" />
            <ProjectTopContributors
              projectsdata={this.props.projectsdata}
              topContributors={this.props.topContributors}
              updateState={this.props.updateState}
              retrieveFromApi={this.props.retrieveFromApi}
            />
          </div>
        </div>
        <Notifications />
      </div>
    );
  }
}

export default ProjectDetail;
