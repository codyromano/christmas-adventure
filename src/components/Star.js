import React from 'react';
import './Star.css';
import { CollisionProvider } from '../collision';

export default class Star extends React.Component {
  constructor() {
    super();
    this.state = {
      collected: false
    };
  }
  componentDidMount() {
    this.props.onCollision(() => {
      const audio = document.createElement('audio');

      audio.src = '/audio/star.mp3';
      audio.play();

      this.setState({
        collected: true
      });
    });
  }
  render() {
    const styles = {
      top: `${this.props.initialPosition.y}px`,
      left: `${this.props.initialPosition.x}px`,
      height: `${this.props.size.height}px`,
      width: `${this.props.size.width}px`
    };
    const classList = ['star'];
    (this.state.collected && classList.push('star-collected'));

    return (
      <div
        className={classList.join(' ')}
        style={styles}
      ></div>
    );
  }
}
