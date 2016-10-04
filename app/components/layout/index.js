import React from 'react';
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
