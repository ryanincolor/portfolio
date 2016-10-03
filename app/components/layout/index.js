import React from 'react';
import Homie from '../homie/';
import styles from './styles.css';

class Layout extends React.Component {
  render () {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
