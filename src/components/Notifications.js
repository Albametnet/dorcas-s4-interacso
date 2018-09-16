import React from "react";
import bell from "../images/bell.svg";
import Env from "../data/.env.json";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      notifNumber: []
    };
  }

  componentDiDMount () {
    this.callNotifFromApi();
  }

  callNotifFromApi() {
    fetch(
      "https://databoards-api.interacso.com/notifications",
      {
        method: 'get',
        withCredentials: true,
        headers: {
          'Cache-Control': 'no-cache',
          'Authorization': Env.token,
          'Content-Type': 'application/json'
        }
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
      this.setState ({
          notifNumber: json.data
        });
      });
  }

  render() {
    return (
      <div className= "footer__container">
        <div className= "footer__notif--number">NOTIFICACIONES ({this.state.notifNumber})</div>
        <div className= "footer__notif-details">
          <div className= "detail__notif--category">
            <div className= "footer__bell">
              <img src= {bell} className= "bell" />
            </div>
            <p className= "detail__notif--type">Nueva tarea</p>
          </div>
          <div className= "detail__notif--content">Flecha: borrar artista</div>
          <div className= "detail__notif--time">Hace 20 minutos</div>
        </div>
      </div>
    );
  }
}

export default Notifications;
