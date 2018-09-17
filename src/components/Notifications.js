import React from "react";
import moment from "moment";
import bell from "../images/bell.svg";

class Notifications extends React.Component {

  constructor(props) {
    super(props);
    this.prepareNotifications = this.prepareNotifications.bind(this);
  }

  prepareNotifications(notifications) {
    const doneNotifications = [];

    notifications.forEach((notification) => {
      doneNotifications.push({
        category: notification.category,
        text: notification.text,
        from: moment(notification.created_at).fromNow(),
      });
    });
    return doneNotifications;
  }

  render() {
    const readyNotifications = this.prepareNotifications(this.props.notifications);
    return (
      <div className= "footer__container">
        <div className= "footer__notif--number">NOTIFICACIONES ({readyNotifications.length})</div>
        {readyNotifications.map(notification =>
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
    );
  }
}

export default Notifications;
