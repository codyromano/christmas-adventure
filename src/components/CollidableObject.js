import React from 'react';
import { PropTypes } from 'prop-types';

export default class CollidableObject extends React.Component {
  constructor(props) {
    super(props);
    this.updatePosition = this.updatePosition.bind(this);
  }

  onComponentDidMount() {
    this.updatePosition(this.props.position);
  }

  updatePosition({ x, y }) {
    this.props.onUpdatePosition(this.props.name, { x, y });
  }

  render() {
    const Component = this.props.component;
    return (
      <Component
        updatePosition={this.updatePosition}
        onCollision={this.props.onCollision}
      />
    );
  }
}

CollidableObject.propTypes = {
  name: PropTypes.string.isRequired,

  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,

  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired,

  component: PropTypes.oneOf([
    PropTypes.func,
    PropTypes.node
  ]).isRequired,

  onUpdatePosition: PropTypes.func.isRequired,
  onCollision: PropTypes.func.isRequired
};

export default CollidableObject;

/*
<CollisionMap>
  <CollidableObject
    initialPosition={{x: 50, y: 100}}
    size={{width: 200, height: 200}}
    component={Player}
  />
  <CollidableObject
    initialPosition={{x: 50, y: 50}}
    size={{width: 100, height: 100}}
    component={Star}
  />
</CollisionMap>

onCollision(objectA, objectB) {
}
updatePosition() {
}
*/
