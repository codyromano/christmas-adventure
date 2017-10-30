import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import CharacterSelectPage from './components/pages/CharacterSelectPage';
import CharacterConfirmPage from './components/pages/CharacterConfirmPage';
import ArenaPage from './components/pages/ArenaPage';

import registerServiceWorker from './registerServiceWorker';
import { Link, HashRouter, Switch, Route } from 'react-router-dom';

const Home = () => (
  <Link to="/character-select">Select</Link>
);


ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route
        path='/character-select'
        component={CharacterSelectPage}
      />
      <Route
        path='/confirm-character/:firstName'
        component={CharacterConfirmPage}
      />
      <Route
        path='/arena/:firstName'
        component={ArenaPage}
      />
    </Switch>
  </HashRouter>
, document.getElementById('root'));

registerServiceWorker();
