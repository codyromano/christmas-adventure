import React from 'react';
import { Link } from 'react-router-dom';
import Constants from '../GameServerConstants';
import './CharacterSelect.css';

const CharacterSelectOption = ({ character }) => {
  const styles = {
    backgroundImage: `url(${character.image})`
  };

  const baseUrl = Constants.ROUTE_CHARACTER_INFO;
  const confirmUrl = `${baseUrl}/${character.firstName}`;

  return (
      <Link to={confirmUrl}
        style={styles}
        className="character-selected character-select-option">

        <div className="character-select-snow"></div>
        <span className="character-select-name">
          {character.firstName}
        </span>
    </Link>
  );
};

export default CharacterSelectOption;
