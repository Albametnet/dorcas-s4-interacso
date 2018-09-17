import React, { Component } from 'react';
import Calendar from './components/Calendar';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Team from './components/Team';
import Env from './data/.env.json';
import './App.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.compact.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchsLaunched = false;
    this.apiService = 'https://databoards-api.interacso.com/';
    this.state = {
      currentDataboard: 0,
      currentTransition: "0.5s",
      currentSlideLeft: "0",
      totalDataboards: 4,
      datesToPrint: [],
      caledarResponseApi: [],
      calendarLoaded: false,
      projectsdata: [],
      projectsCharts: [],
      hoursCharts: [],
      weekChartData: [],
      memberPics: [],
      tasksWinner: {},
      commitsWinner: {},
      averageTask: 0,
      averageCommits: 0,
      projectHours: {},
      projectCommits: 0,
      projectTasks: {},
      projects: [],
      refreshTime: 8000
    }
    this.showNextDashboard = this.showNextDashboard.bind(this);
    this.retrieveFromApi = this.retrieveFromApi.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    // this.effect= setInterval(this.showNextDashboard, this.state.refreshTime);
    if (this.fetchsLaunched === false) {
      const promises = [];
      const promiseProjectList = this.retrieveFromApi("projects/list");
      const promiseCalendar = this.retrieveFromApi("calendar");
      promises.push(promiseCalendar);
      promises.push(promiseProjectList);
      Promise.all(promises).then(([calendarJson, projectListJson]) => {
        if (typeof calendarJson !== "undefined") {
          console.log('guardo');
          this.setState({
            caledarResponseApi: calendarJson
          })
        } else {
          console.log('no guarda');
        }
        if (typeof projectListJson !== "undefined") {
          this.setState({
            totalDataboards: this.state.totalDataboards + projectListJson.total,
            projects: projectListJson.data
          });
        }
      });
      this.fetchsLaunched = true;
    }
  }

  updateState(object) {
    this.setState(object);
  }

  retrieveFromApi(endpoint) {
    if (typeof Env !== "undefined" & Env.token !== "undefined") {
      return fetch(
        this.apiService + endpoint,
        {
          method: 'get',
          withCredentials: true,
          headers: {
            'Cache-Control': 'no-cache',
            'Authorization': Env.token,
            'Content-Type': 'application/json'
          }
        }
      ).then(response => {
        if (response.status === 401) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      }
      ).then(json => {
        return json;
      }).catch(error => {
        alert("El token es incorrecto");
        console.error(error);
      });
    } else {
      alert("No está usted autorizado");
      return null;
    }
  }


  showNextDashboard() {
    if (this.state.currentDataboard == this.state.totalDataboards - 1) {
      clearInterval(this.effect);
      this.setState({
        currentDataboard: 0,
        currentSlideLeft: "0",
        currentTransition: "none"
      });


      this.effect= setInterval(this.showNextDashboard, this.state.refreshTime);


    } else {
      this.setState({
        currentDataboard: this.state.currentDataboard + 1,
      });
      const newSlide = this.state.currentDataboard * -100;
      this.setState({
        currentSlideLeft: `${newSlide}%`,
        currentTransition: "0.5s"
      })
    }
  }

  render() {
    const sliderStyles = {
      left: this.state.currentSlideLeft,
      transition: this.state.currentTransition
    }
    return (
      <div className="visor" style={sliderStyles}>

        <Calendar datesToPrint={this.state.datesToPrint}
          calendarLoaded={this.state.calendarLoaded}
          caledarResponseApi={this.state.caledarResponseApi}
          updateState={this.updateState}
          retrieveFromApi={this.retrieveFromApi}
        />
        <Projects projectsdata={this.state.projectsdata}
          projectsCharts={this.state.projectsCharts}
          hoursCharts={this.state.hoursCharts}
          updateState={this.updateState}
          retrieveFromApi={this.retrieveFromApi}
        />

        {this.state.projects.map((project) =>
          <ProjectDetail projectHours={this.state.projectHours}
            projectCommits={this.state.projectCommits}
            projectTasks={this.state.projectTasks}
            updateState={this.updateState}
            retrieveFromApi={this.retrieveFromApi}
            projectId={project.gid}
            projectName={project.name}
          />
        )}

        <Team weekChartData={this.state.weekChartData}
          memberPics={this.state.memberPics}
          tasksWinner={this.state.tasksWinner}
          commitsWinner={this.state.commitsWinner}
          averageTask={this.state.averageTask}
          averageCommits={this.state.averageCommits}
          updateState={this.updateState}
          retrieveFromApi={this.retrieveFromApi}
        />
        <Calendar datesToPrint={this.state.datesToPrint}
          calendarLoaded={this.state.calendarLoaded}
          caledarResponseApi={this.state.caledarResponseApi}
          updateState={this.updateState}
          retrieveFromApi={this.retrieveFromApi}
        />
      </div>
    );
  }
}

export default App;
