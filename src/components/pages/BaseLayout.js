import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../styles/reset.css';
import './BaseLayout.css';

export default class BaseLayout extends React.Component {
  render() {

    const Main = this.props.mainContent;
    const match = this.props.match;

    return (
      <main>
        <header className="menu-bar">
          <div className="main-content logo-wrapper">
            <h1 className="logo">Christmas Adventure</h1>
          </div>
        </header>
        <section className="main-content">
          {Main && <Main match={match}/>}
        </section>
        <footer className="menu-bar">
          <div className="main-content">
            {this.props.footerButtons.map(({ text, route}) => (
              <Link to={route}>{text}</Link>
            ))}
          </div>
        </footer>
      </main>
    );
  }
}

BaseLayout.defaultProps = {
  footerButtons: []
};

BaseLayout.propTypes = {
  mainContent: PropTypes.func,
  footerContent: PropTypes.node,
  footerButtons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired
    })
  )
};
