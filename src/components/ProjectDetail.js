import React from 'react';
import Header from './Header';
import ProjectsDetailStatusBar from './ProjectDetailStatusBar';
import ProjectBurndownChart from './ProjectBurndownChart';
import Notifications from './Notifications';

class ProjectDetail extends React.Component {
  constructor(props){
    super(props)
    this.texts = {
      title: `Proyectos > ${this.props.projectName}`
    }
    this.state = {
      projectData: {
        hours: "",
        commits: "",
        tasks: "",
        contributors: "",
      },
      projectTasks: []
    }
  }

  componentDidMount() {
    this.props.retrieveFromApi(`projects/${this.props.projectId}`).then(apiResponse => {
      this.setState({
        projectData: apiResponse
      });
    });
    this.props.retrieveFromApi(`projects/${this.props.projectId}/tasks`).then(apiResponse => {
      this.setState({
        projectTasks: apiResponse
      });
    });
  }

  render(){
    return (
      <div className= "detailedprojects__container databoard">
        <Header title= {this.texts.title} />
        <div className= "detailedprojects__content">
          <ProjectsDetailStatusBar
          projectId={this.props.projectId}
          projectHours={this.state.projectData.hours}
          projectCommits={this.state.projectData.commits}
          projectTasks={this.state.projectData.tasks}
          updateState={this.props.updateState}
          retrieveFromApi={this.props.retrieveFromApi}/>
        <div className= "statistics__charts">
          <ProjectBurndownChart
           projectTasks={this.state.projectTasks}
           />
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
