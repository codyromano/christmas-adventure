import React from 'react';

const NotificationGroup = ({ notices }) => (
  <ul>
    {notices.map(({ content }) => (
      <li>{content}</li>
    ))}
  </ul>
);

export default NotificationGroup;
