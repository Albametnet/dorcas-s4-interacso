import React from "react";
import moment from "moment";
import bell from "../images/bell.svg";

class Notifications extends React.Component {

  constructor(props) {
    super(props);
    this.prepareNotifications = this.prepareNotifications.bind(this);
    this.footerNotifDetails =  React.createRef();
  }

  componentDidUpdate() {
    const withNotifications =  this.footerNotifDetails.querySelector('footer__notif-details');
    withNotifications.forEach(withNotification => {
      const notificationShow = withNotification.querySelector('.detail__notif--type');
      if(notificationShow.length > 1) {
        this.animate(notificationShow);
      }
    });
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

  animate(elements) {
    const visibleTime = 2500;
    const delay = 500;
    const animationTotalTime = (elements.length * visibleTime);
    setInterval(() => {
      let fadeInStart = 0;
      let fadeOutStart = visibleTime;
      elements.forEach((element, index) => {
        fadeInStart = (visibleTime * (index)) + delay;
        fadeOutStart = fadeOutStart * (index + 1);
        this.fadeIn(element, fadeInStart)
        this.fadeOut(element, fadeOutStart);
      });
    }, animationTotalTime);
  }

  fadeIn(element, time) {
    setTimeout(()=>{
      element.classList.remove('display-off');
      element.classList.remove('opacity-off');
    }, time);
  }

  fadeOut(element, time) {
    setTimeout(() => {
      element.classList.add('opacity-off');
      setTimeout(() => {
        element.classList.add('display-off');
      }, 500);
    }, time);
  }

  makeNotificationsStructure(events) {
    let notificationsInHTML= [];
    let counter = 0;
    events.forEach(event => {
      let hiddenClass = "";
      if(counter !== 0) {
        hiddenClass = "opacity-off display-off ";
      }
      notificationsInHTML.push(
        <div className={"day__notifications-event " + hiddenClass}>{event}</div>
      );
      counter++;
    });
    return notificationsInHTML;
  }

  render() {
    const readyNotifications = this.prepareNotifications(this.props.notifications);
    return (
      <div className= "footer__container">
        <div className= "footer__notif--number">NOTIFICACIONES ({readyNotifications.length})</div>
        {readyNotifications.map(notification =>
          <div className= "footer__notif-details" ref={this.footerNotifDetails}>
            <div className= "detail__notif--category" >
              <div className= "footer__bell">
                <img src= {bell} className= "bell" />
              </div>
              <p className= "detail__notif--type">
              {this.makeNotificationsStructure(notification)}
              {/* {notification.category} */}
              </p>
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
