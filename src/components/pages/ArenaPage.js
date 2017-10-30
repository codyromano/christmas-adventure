import React from 'react';
import shortid from 'shortid';
import BaseLayout from './BaseLayout';
import Constants from '../../GameServerConstants';
import GameServerClient from '../../GameServerClient';
import getDefaultSharedGameState from '../../getDefaultSharedGameState';
// import PreloadImage from '../PreloadImage';
import './ArenaPage.css';
import Avatar from '../Avatar';
import ActionPanel from '../ActionPanel';
import Star from '../Star';
import { CollisionProvider } from '../../collision';

function getDefaultPrivateGameState() {
  return {
    _player: {}
  };
}

class ArenaPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign(
      getDefaultSharedGameState(),
      getDefaultPrivateGameState()
    );

    this.requestedCharacterFirstName = this.props.match.params.firstName;
    this.state = getDefaultSharedGameState();
    this.client = new GameServerClient();
    this.onActionSelected = this.onActionSelected.bind(this);
  }

  onActionSelected(actionName) {
    this.client.publishAction({
      type: Constants.UI_ACTION,
      actionName
    });
  }

  componentDidMount() {
    // Request a game session
    this.client.connect(this.requestedCharacterFirstName).then(resp => {
      // Update component with session details assigned by server
      this.setState({
        _player: resp
      });
    });

    // Listen for state changes triggered by other users
    this.client.onSharedStateChange(newState => {
      this.setState(newState);
    });
  }

  getAvailableActions() {
    if (!this.state.players[this.client.sessionId]) {
      console.warn(`User cannot act because (s)he isn't in the game.`);
      return [];
    }
    return this.state.players[this.client.sessionId].actions;
  }

  render() {
    if (!this.state._player) {
      return (
        <div>Connecting to game server</div>
      );
    }

    const avatars = Object.values(this.state.players).map((player, i) => {
      class PlayerAvatar extends React.Component {
        componentDidMount() {
          this.props.onCollision(otherObject => {
            console.log('collision!');
          });
        }
        componentWillReceiveProps(newProps) {
          this.props.updatePosition({
            x: newProps.coords.x,
            y: newProps.coords.y
          });
        }
        render() {
          return (<Avatar
            size={this.props.size}
            key={shortid.generate()}
            name={player.firstName}
            coords={player.coords}
          />);
        }
      }

      return (<CollisionProvider
        key={shortid.generate()}
        itemId={`${player.firstName}${i}`}
        size={{width: 40, height: 40}}
        initialPosition={player.coords}
        component={PlayerAvatar}
      />);

      //const url = this.profile[play]
      /*
      return (<Avatar
        key={i}
        name={player.firstName}
        coords={player.coords}
      />);
      */
    });

    // Current player's name
    return (
      <div className="arena-page-wrapper">
        <ActionPanel
          onActionSelected={this.onActionSelected}
          actions={this.getAvailableActions()}
        />
        <div className="arena-wrapper">
          <CollisionProvider
            itemId="star"
            size={{width: 50, height: 50}}
            initialPosition={{x: 100, y: 100}}
            component={Star}
          />
          {avatars}
        </div>
      </div>
    );
  }
}

export default function ArenaPageWrapper(props) {
  return (
    <BaseLayout
      match={props.match}
      mainContent={ArenaPage}
    />
  );
}
