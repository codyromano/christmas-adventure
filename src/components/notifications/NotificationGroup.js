import React from 'react';
import PropTypes from 'prop-types';
import './NotificationGroup.css';

export default class NotificationGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      notices: []
    };

    this.renderNotice = this.renderNotice.bind(this);
  }

  isExpired(notice) {
    return (new Date().getTime() - notice.time) >= this.props.secondsPerNotice * 1000;
  }

  componentDidMount() {
    this.props.onServerNotice(notice => {
      this.setState({
        notices: this.state.notices.concat(notice)
      });
    });

    // Remove oldest elements to make room for new ones
    window.setInterval(() => {
      const { notices } = this.state;
      const oldest = notices[0];

      const isFull = notices.length > this.props.maxNoticesVisible;

      if (isFull && oldest && this.isExpired(oldest)) {
        this.setState({
          notices: notices.slice(1)
        });
      }
    }, 1000);
  }
  renderNotice(notice, i) {
    const opacity = 1 - (i / this.props.maxNoticesVisible);
    const styles = { opacity };

    const content = notice.content.slice(0, this.props.noticeLengthLimit);

    return (
      <li
        key={i}
        style={styles}
        className="notification"
      >{content}</li>
    );
  }
  render() {
    const notices = this.state.notices
      .slice(0, this.props.maxNoticesVisible)
      .reverse()
      .map(this.renderNotice);

    return (
      <ul className="notification-group">
        {notices}
      </ul>
    );
  }
}

NotificationGroup.defaultProps = {
  maxNoticesVisible: 3,
  secondsPerNotice: 3,
  noticeLengthLimit: 30
};

NotificationGroup.propTypes = {
  noticeLengthLimit: PropTypes.number,
  onServerNotice: PropTypes.func.isRequired,
  maxNoticesVisible: PropTypes.number,
  secondsPerNotice: PropTypes.number
};
