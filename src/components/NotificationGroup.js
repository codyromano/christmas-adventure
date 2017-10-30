import React from 'react';
import PropTypes from 'prop-types';

export default class NotificationGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      notices: []
    };
    this.renderNotice = this.renderNotice.bind(this);
  }
  componentDidMount() {
    this.props.onServerNotice(notice => {
      const notices = this.state.notices.concat(notice);
      this.setState({ notices });
    });
  }
  renderNotice(notice, i) {
    const opacity = 1 - (i / this.props.maxNoticesVisible);
    const styles = { opacity };

    return (
      <li
        key={i}
        style={styles}
      >{notice.content}</li>
    );
  }
  render() {
    return (
      <ul>
        {this.state.notices.map(this.renderNotice)}
      </ul>
    );
  }
}

NotificationGroup.defaultProps = {
  maxNoticesVisible: 3,
  secondsPerNotice: 3
};

NotificationGroup.propTypes = {
  onServerNotice: PropTypes.func.isRequired,
  maxNoticesVisible: PropTypes.number,
  secondsPerNotice: PropTypes.number
};
