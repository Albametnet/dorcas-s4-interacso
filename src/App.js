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
    this.apiService = 'https://databoards-api.interacso.com/';
    this.state = {
      currentDataboard: 0,
      currentTransition: "0.5s",
      currentSlideLeft: "0",
      totalDataboards: 4,
      datesToPrint: [],
      caledarResponseApi: [],
      projectsResponseApi: [],
      teamResponseApi: [],
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
    this.effect= setInterval(this.showNextDashboard, this.state.refreshTime);
    this.retrieveFromApi("projects/list").then(projectListJson => {
      if (typeof projectListJson !== "undefined") {
        this.setState({
          totalDataboards: this.state.totalDataboards + projectListJson.total,
          projects: projectListJson.data
        });
      }
    });
    this.retrieveFromApi("calendar").then(calendarJson => {
      if (typeof calendarJson !== "undefined") {
        console.log('guardo');
        this.setState({
          caledarResponseApi: calendarJson
        })
      }
    });
    this.retrieveFromApi("projects").then(projectsResponseApi => {
      this.saveCommitsAndHours(projectsResponseApi);
    });
    this.retrieveFromApi("team").then(teamResponseApi => {
      this.getAverage(teamResponseApi);
      this.getTasksWinner(teamResponseApi);
      this.getCommitsWinner(teamResponseApi);
    });
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

//PROJECTS

  saveCommitsAndHours(projectsResponseApi) {
    const projectsData= [];
    for (var elemento in projectsResponseApi.data[0].commitRank) {
      projectsData.push({
        projectName: elemento,
        commits: projectsResponseApi.data[0].commitRank[elemento]
      });
    }
    this.updateState({
      projectsCharts: projectsData
    });
    const hoursData= [];
    for (var hoursProject in projectsResponseApi.data[0].hourRank) {
      hoursData.push({
        hoursName: hoursProject,
        time: projectsResponseApi.data[0].hourRank[hoursProject]
      });
    }
    this.updateState({
      hoursCharts: hoursData
    });
  }

//TEAM

  getAverage(json) {
    let teamData= [];
    let memberPicsData= [];
    let averageCommits= 0;
    let averageTask= 0;
    json.data.forEach(person => {
      averageCommits= averageCommits + person.commits
      averageTask= averageTask + person.tasks
      teamData.push({
        member: person.nombre,
        tasks: person.tasks,
        commits: person.commits
      });
      memberPicsData.push(person.photo);
    });
      this.updateState({
      weekChartData: teamData,
      memberPics: memberPicsData,
      averageTask: averageTask/json.data.length,
      averageCommits: averageCommits/json.data.length
    })
  }

  getTasksWinner(json) {
    let maxTasks= 0;
    let winnerTasksObj= {};
    for (let i = 0; i < json.data.length; i++) {
      if (json.data[i].tasks > maxTasks) {
        maxTasks= json.data[i].tasks;
        winnerTasksObj= json.data[i];
      }
    }
    this.updateState({
      tasksWinner: winnerTasksObj,
    });
  }

  getCommitsWinner(json) {
    let maxCommits= 0;
    let winnerCommitsObj= {};
    json.data.map(peopleData => {
      if (peopleData.commits > maxCommits) {
        maxCommits= peopleData.commits;
        winnerCommitsObj= peopleData;
      }
    });
    this.updateState({
      commitsWinner: winnerCommitsObj,
    });
  }

  render() {
    const sliderStyles = {
      left: this.state.currentSlideLeft,
      transition: this.state.currentTransition
    }
    return (
      <div className="visor" style={sliderStyles}>

        <Team 
          teamResponseApi={this.state.teamResponseApi}
          weekChartData={this.state.weekChartData}
          memberPics={this.state.memberPics}
          tasksWinner={this.state.tasksWinner}
          commitsWinner={this.state.commitsWinner}
          averageTask={this.state.averageTask}
          averageCommits={this.state.averageCommits}
          updateState={this.updateState}
          retrieveFromApi={this.retrieveFromApi}
        />

        <Calendar
          identifier="1"
          datesToPrint={this.state.datesToPrint}
          calendarLoaded={this.state.calendarLoaded}
          caledarResponseApi={this.state.caledarResponseApi}
          updateState={this.updateState}
          retrieveFromApi={this.retrieveFromApi}
        />
        <Projects projectsdata={this.state.projectsdata}
          projectsCharts={this.state.projectsCharts}
          hoursCharts={this.state.hoursCharts}
          projectsResponseApi={this.state.projectsResponseApi}
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


        <Calendar
          identifier="2"
          datesToPrint={this.state.datesToPrint}
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
