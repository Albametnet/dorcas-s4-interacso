import React from 'react';
import Header from './Header';
import ProjectsDetailStatusBar from './ProjectDetailStatusBar';
import ProjectBurndownChart from './ProjectBurndownChart';
import Notifications from './Notifications';

class ProjectDetail extends React.Component {
  constructor(props){
    super(props)
    this.texts= {
      title: "Proyectos > IKEA JD"
    }
  }

  render(){
    return (
      <div className= "detailedprojects__container databoard">
        <Header title= {this.texts.title} />
        <div className= "detailedprojects__content">
          <ProjectsDetailStatusBar
          projectHours={this.props.projectHours}
          projectCommits={this.props.projectCommits}
          projectTasks={this.props.projectTasks}
          updateState={this.props.updateState}
          retrieveFromApi={this.props.retrieveFromApi}/>
        <div className= "statistics__charts">
          <ProjectBurndownChart/>
            <div className= "chart__project--top-contributors">
              <div className= "top-contributors__chart">
                <p className= "top-contributors__title">Top contributors</p>
                <ul className= "top-contributors__list">
                  <li className= "top-contributors__list--element">#1</li>
                  <li className= "top-contributors__list--element">#2</li>
                  <li className= "top-contributors__list--element">#3</li>
                  <li className= "top-contributors__list--element">#4</li>
                  <li className= "top-contributors__list--element">#5</li>
                  <li className= "top-contributors__list--element">#6</li>
                </ul>
            </div>
          </div>
        </div>
      </div>
        <Notifications/>
      </div>
    );
  }
}

export default ProjectDetail;
