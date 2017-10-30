import React from 'react';
import PropTypes from 'prop-types';

export default class NotificationGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      notices: []
    };
  }
  componentDidMount() {
    this.props.onServerNotice(notice => {
      const notices = this.state.notices.concat(notice);
      this.setState({ notices });
    });
  }
  render() {
    return (
      <ul>
        {this.state.notices.map((notice, i) => (
          <li>{notice.content}</li>
        ))}
      </ul>
    );
  }
}

NotificationGroup.defaultProps = {
  maxNoticesVisible: 5,
  secondsPerNotice: 3
};

NotificationGroup.propTypes = {
  onServerNotice: PropTypes.func.isRequired,
  maxNoticesVisible: PropTypes.number,
  secondsPerNotice: PropTypes.number
};
