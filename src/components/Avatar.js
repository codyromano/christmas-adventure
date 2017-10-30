import React from 'react';
import characterData from '../data/characterSelect.json';

const mapNamesToImages = characterData.reduce((map, character) => {
  map[character.firstName] = character.avatarImageArena;
  return map;
}, {});

const Avatar = ({
  name,
  coords,
  size
}) => {
  const styles = {
    top: `${coords.y}px`,
    left: `${coords.x}px`,
    height: `${size.height}px`,
    width: `${size.width}px`,
    backgroundImage: `url(${mapNamesToImages[name]})`,
    backgroundSize: 'cover'
  };
  return (
    <div className="avatar">
      <div
        alt={`Avatar for ${name}`}
        className="avatar-image"
        style={styles}
      ></div>
    </div>
  );
};

export default Avatar;
