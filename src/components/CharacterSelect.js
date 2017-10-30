import React from 'react';
import './CharacterSelect.css';
import CharacterSelectOption from './CharacterSelectOption';

const CharacterSelect = ({ characters }) => {
  return (
    <section className="character-select-wrapper">
      <div className="row">
        <h1 className="heading-bar">Choose your character</h1>
      </div>

      <menu className="character-select">
      {characters.map((character, i) =>
        <CharacterSelectOption key={i} character={character}/>
      )}
      </menu>
    </section>
  );
};

export default CharacterSelect;
