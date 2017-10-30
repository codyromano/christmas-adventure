import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({
  notice,
  maxNoticesVisible,
  index,
  noticeLengthLimit
}) => {
  const opacity = 1 - (index / maxNoticesVisible);
  const styles = { opacity };
  const content = notice.content.slice(0, noticeLengthLimit);

  return (
    <li
      key={index}
      style={styles}
      className="notification"
    >{content}</li>
  );
};

export default Notification;
