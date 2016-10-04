import React from "react";
import styles from './styles.css';

import data from 'json!../../dribbble.json';

class Home extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      shots : data
    }
  }

  render() {
    var shotList = this.state.shots.map(function(shot){
      return(
        <li key={shot.id}><img src={shot.images.teaser} /></li>
      )
    });

    return (
      <div className={styles.home}>
      <ul className={styles.shotlist}>
        {shotList}
      </ul>
      </div>
    )
  }
}

export default Home
