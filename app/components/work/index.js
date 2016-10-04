import React from 'react';
import styles from './styles.css';

class Work extends React.Component {
  render() {
    if( !this.props.shots ) {
      return (
        <ul className={styles.shotlist}>
          <h3>Loading...</h3>
        </ul>
      );
    } 
  
    var shotList = this.props.shots.map(function(shot){
      return(
        <li key={shot.id}><a href={shot.html_url} target="_blank"><img src={shot.images.hidpi} /></a></li>
      )
    });

    return (  
      <ul className={styles.shotlist}>
        {shotList}
      </ul>
    )  
  }
}

export default Work
