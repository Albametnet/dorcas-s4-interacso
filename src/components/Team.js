import React from "react";
import Header from './Header';
import WeekTasksChart from './WeekTasksChart';
import WeekCommitsChart from './WeekCommitsChart';
import TeamStatusBar from './TeamStatusBar';
import Notifications from './Notifications';
import '../App.css';

class Team extends React.Component {
  constructor(props) {
    super(props)
    this.texts= {
      title: "Equipo"
    }
  }

componentDidMount() {
    this.props.retrieveFromApi("team").then(apiResponse => {
      this.getAverage(apiResponse);
      this.getTasksWinner(apiResponse);
      this.getCommitsWinner(apiResponse);
    });
  }

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
      this.props.updateState({
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
    this.props.updateState({
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
    this.props.updateState({
      commitsWinner: winnerCommitsObj,
    });
  }

  render() {
    return (
      <div className= "team__container databoard">
        <Header title= {this.texts.title} />
        <div className= "main__container--team">
          <WeekTasksChart
            data= {this.props.weekChartData}
            memberPics= {this.props.memberPics}
          />
          <WeekCommitsChart
            data= {this.props.weekChartData}
            memberPics= {this.props.memberPics}
          />
          <TeamStatusBar
            averageTask= {this.props.averageTask}
            averageCommits= {this.props.averageCommits}
          />
          <div className= "dashboard people__container--asana">
            <p className= "asana__title">Asana killer</p>
            <img className= "profile__pic" src={this.props.tasksWinner.photo}></img>
            <p className= "killer__name">{this.props.tasksWinner.nombre}</p>
            <p className= "killer__record">{this.props.tasksWinner.tasks}</p>
            <p className= "killer__detail">Tareas completadas esta semana</p>
          </div>
          <div className= "dashboard people__container--git">
            <p className= "git__title">Git killer</p>
            <img className= "profile__pic" src={this.props.commitsWinner.photo}></img>
            <p className= "killer__name">{this.props.commitsWinner.nombre}</p>
            <p className= "killer__record">{this.props.commitsWinner.commits}</p>
            <p className= "killer__detail">Commits esta semana</p>
          </div>
        </div>
        <Notifications notifications={this.props.notifications} />
      </div>
    );
  }
}

export default Team;
