import React from 'react';
import BaseLayout from './BaseLayout';
import characterSelectData from '../../data/characterSelect.json';
import CharacterSelect from '../CharacterSelect';

class CharacterSelectPage extends React.Component {
  render() {
    return (
      <CharacterSelect characters={characterSelectData}/>
    );
  }
}

export default function() {
  return (
    <BaseLayout mainContent={CharacterSelectPage}/>
  );
}
