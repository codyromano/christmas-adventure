import React from 'react';
import PropTypes from 'prop-types';

export default class PreloadImage extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    };
  }
  componentDidMount() {
    const image = document.createElement('img');
    image.onload = () => {
      this.props.onLoad();
      this.setState({loaded: true});
    };
    image.src = this.props.src;
  }
  render() {
    if (!this.state.loaded) {
      return null;
    }
    return (
      this.props.children
    );
  }
}

PreloadImage.defaultProps = {
  onLoad: function emptyFn() {}
};

PreloadImage.propTypes = {
  onLoad: PropTypes.func,
  src: PropTypes.string.isRequired
};
