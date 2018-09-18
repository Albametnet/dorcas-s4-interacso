import React, { Component } from 'react';
import Calendar from './components/Calendar';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Team from './components/Team';
import Env from './data/.env.json';
import './App.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.compact.css';
import moment from "moment";

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
      refreshTime: 30000000,
      notificationsRefreshTime: 3000, //buscar 24 horas en milisegundos
      notifications: [],
      currentNotifications: 0,
      rotateNotifications: 1500
    }
    this.showNextDashboard = this.showNextDashboard.bind(this);
    this.retrieveFromApi = this.retrieveFromApi.bind(this);
    this.updateState = this.updateState.bind(this);
    this.loadNotifications = this.loadNotifications.bind(this);
    this.animateNotifications = this.animateNotifications.bind(this);
  }

  componentDidMount() {
    // this.effect= setInterval(this.showNextDashboard, this.state.refreshTime);
    setInterval(this.loadNotifications, this.state.notificationsRefreshTime);
    setInterval(this.animateNotifications, this.state.rotateNotifications);
    this.retrieveFromApi("projects/list").then(apiResponse => {
      this.setState({
        totalDataboards: this.state.totalDataboards + apiResponse.total,
        projects: apiResponse.data
      });
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

  loadNotifications() {
    const filterTime = 1800000000000000;
    this.retrieveFromApi('notifications').then(apiResponse => {
      const orderedNotifications = apiResponse.data.sort((c1, c2) =>
      moment(c1.created_at) < (c2.created_at)
    );
    const doneNotifications = [];
    orderedNotifications.forEach((notification) => {
      if (moment().diff(moment(notification.created_at)) > filterTime) {
        return;
      }
      doneNotifications.push({
        category: notification.category,
        text: notification.text,
        from: moment(notification.created_at).fromNow(),
      });
    });
    this.setState({
      notifications: doneNotifications,
      currentNotifications: 1
    });
    });
  }

  animateNotifications() {
    let totalNotifications = this.state.notifications.length;
    if (this.state.currentNotifications >= (totalNotifications - 1)) {
      this.setState({
        currentNotifications: 0
      })
    } else {
      this.setState({
        currentNotifications: this.state.currentNotifications + 1
      });
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

      <Projects projectsdata={this.state.projectsdata}
        projectsCharts={this.state.projectsCharts}
        hoursCharts={this.state.hoursCharts}
        updateState={this.updateState}
        retrieveFromApi={this.retrieveFromApi}
        notifications={this.state.notifications}
        currentNotifications={this.state.currentNotifications}
      />
        <Calendar datesToPrint={this.state.datesToPrint}
          calendarLoaded={this.state.calendarLoaded}
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
            notifications={this.state.notifications}
            currentNotifications={this.state.currentNotifications}
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
          notifications={this.state.notifications}
          currentNotifications={this.state.currentNotifications}
        />
        <Calendar datesToPrint={this.state.datesToPrint}
          calendarLoaded={this.state.calendarLoaded}
          updateState={this.updateState}
          retrieveFromApi={this.retrieveFromApi}
        />
      </div>
    );
  }
}

export default App;
