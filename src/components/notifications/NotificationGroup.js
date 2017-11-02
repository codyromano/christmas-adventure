import React from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';
import './NotificationGroup.css';

export default class NotificationGroup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Display the last 3 notifications
    const notices = this.props.notices
      .slice(-this.props.maxNoticesVisible)
      .reverse()
      .map((notice, i) => (
        <Notification
          notice={notice}
          maxNoticesVisible={this.props.maxNoticesVisible}
          index={i}
        />
      ));

    return (
      <div className="notification-group-wrapper">
        <ul className="notification-group">
          {notices}
        </ul>
      </div>
    );
  }
}

NotificationGroup.defaultProps = {
  maxNoticesVisible: 3,
  secondsPerNotice: 3,
  noticeLengthLimit: 30
};

NotificationGroup.propTypes = {
  notices: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired
    })
  ).isRequired,
  maxNoticesVisible: PropTypes.number,
  secondsPerNotice: PropTypes.number
};
