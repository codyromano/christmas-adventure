import React, { Component } from 'react';
import { Form } from './Form';
import './App.css';

import Constants from './GameServerConstants';
import getDefaultSharedGameState from './getDefaultSharedGameState';

const Greet = ({ player }) => (
  <span>Merry Christmas, {player.firstName}</span>
);

const Roster = ({ players }) => (
  <div>
    <h2>Players</h2>

    <ul>
      {players.map((player, i) => (
        <li key={i}>{player.firstName}</li>
      ))}
    </ul>
  </div>
);

function publishAction(action) {
  socket.emit(Constants.PUBLISH_ACTION, action);
}

const ActionPanel = ({ actions, onActionSelected }) => (
  <menu className="actions">
    {actions.map((action, i) =>
      <button
        className="actionButton"
        key={i}
        onClick={() => onActionSelected(action)}>
        {action}
      </button>
    )}
  </menu>
);

class App extends Component {
  constructor() {
    super();
    this.state = getDefaultSharedGameState();
    this.requestRole = this.requestRole.bind(this);
    this.player = null;
  }
  componentDidMount() {
    // Listen only for changes triggered by the current player
    socket.on(Constants.BROADCAST_CLIENT_STATE, player => {
      this.player = player;
    });

    // Listen for any game state changes, including changes
    // triggered by other players
    socket.on(Constants.BROADCAST_STATE, newState => {
      this.setState(newState);
    });
  }
  requestRole(player) {
    publishAction({
      type: Constants.ACTION_ADD_PLAYER,
      firstName: player.firstName
    });
  }

  onActionSelected(actionName) {
    publishAction({
      type: Constants.UI_ACTION,
      actionName
    });
  }

  render() {
    // TODO: Save state in localStorage

    // {this.player && <Greet player={this.player}/>}
    // <Roster players={this.state.players}/>
    const styles = {
      position: 'absolute',
      left: `${this.state.santaX}px`,
      top: `${this.state.santaY}px`
    };

    const actions = this.player && this.state.roles[this.player.role];
    const isObserving = (this.player && actions.length < 1);

    return (
      <div className="App">

        {this.player && <img
          className='santa'
          style={styles}
          src="https://maps.gstatic.com/mapfiles/santatracker/v201612250404/scenes/smatch/img/portraits/santa.svg"
        />}

        {this.player && actions.length > 0 && <ActionPanel
          actions={actions}
          onActionSelected={this.onActionSelected}
        />}

        {isObserving && (
          <div>
            The game is full. You are observing.
          </div>
        )}
      </div>
    );
  }
}

export default App;
