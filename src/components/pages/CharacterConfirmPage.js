import React from 'react';
import BaseLayout from './BaseLayout';
import { Link } from 'react-router-dom';
import PreloadImage from '../PreloadImage';
import characterData from '../../data/characterSelect.json';
import Constants from '../../GameServerConstants';
import './CharacterConfirm.css';
import GameServerClient from '../../GameServerClient';

class CharacterConfirmPage extends React.Component {
  constructor(props) {
    super(props);

    const urlMatch = this.props.match.params.firstName;
    this.character = characterData.filter(
      char => char.firstName === urlMatch
    )[0];
  }
  componentDidMount() {
    // TODO: Create audio component
    const audio = document.createElement('audio');
    audio.src = 'http://codyromano.com/cody-static/engram-sound.mp3';
    audio.play();

    // Remove record of a previously selected character
    new GameServerClient().logout();
  }
  render() {
    if (!this.character) {
      return (
        <div>Unknown character</div>
      )
    }
    const styles = {
      backgroundImage: `url(${this.character.avatarImage})`
    };



    const arenaLink = `${Constants.ROUTE_ARENA}/${this.character.firstName}`;

    return (
      <section>
        <PreloadImage
          src={this.character.avatarImage}
        >
          <div className="confirm-image-wrapper">
            <div className="confirm-image" style={styles}></div>
            <div className="image-pulse"></div>
          </div>
        </PreloadImage>

        <div>
          <h2 className="confirm-character-name">
          {this.character.firstName}&#39;s Special Moves
          </h2>
        </div>
        <ul className="about-power-list">
          {this.character.aboutPowers.map((power, i) => (
            <li className="about-power" key={i}>
              <strong>{power.title}</strong>
              <p>{power.about}</p>
            </li>
          ))}
        </ul>

        <Link
          to="/character-select"
          className="button"
        >Back</Link>

        <Link
          to={arenaLink}
          className="button button-primary"
        >Play as {this.character.firstName}</Link>

      </section>
    );
  }
}

export default function CharacterConfirmWrapper(props) {
  return (
    <BaseLayout
      match={props.match}
      mainContent={CharacterConfirmPage}
    />
  );
}
