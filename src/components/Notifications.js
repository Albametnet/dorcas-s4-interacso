import React from "react";
import bell from "../images/bell.svg";

class Notifications extends React.Component {
  render() {
    return (
      <div className= "footer__container">
        <div className= "footer__notif--number">NOTIFICACIONES (3)</div>
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
