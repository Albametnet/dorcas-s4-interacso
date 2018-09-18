import React from "react";
import moment from "moment";
import bell from "../images/bell.svg";

class Notifications extends React.Component {

  render() {
    return (
      <div className= "footer__container">
        <div className= "footer__notif--number">NOTIFICACIONES ({this.props.notifications.length})
        </div>
          <div className= "footer__notif--container" style= {{top: `-${this.props.currentNotifications * 70}px`}}>
            {this.props.notifications.map(notification =>
              <div className= "footer__notif-details">
                <div className= "detail__notif--category">
                  <div className= "footer__bell">
                    <img src= {bell} className= "bell" />
                  </div>
                  <p className= "detail__notif--type">{notification.category}</p>
                </div>
                <div className= "detail__notif--content">{notification.text}</div>
                <div className= "detail__notif--time">{notification.from}</div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }

export default Notifications;
