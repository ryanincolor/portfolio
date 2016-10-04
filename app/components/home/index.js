import React from "react";
import styles from './styles.css';

window.jQuery = require('jquery');
var jribbble = require('jribbble');



class Home extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      shots : false
    }
  }

  componentDidMount() {
    jQuery.jribbble.setToken('7875d1a58ad42ec2f9765322b6fe9557eea26f7694a7a0621a7980d9ac90f7ef');
    jQuery.jribbble.users('ryanincolor').shots().then(function(res) {
      this.setState({
        shots: res
      });
    }.bind(this));
  }

  render() {
    if( !this.state.shots ) {
      return (
        <div className={styles.home}>
          <ul className={styles.shotlist}>
            <h3>Loading...</h3>
          </ul>
        </div>
      );
    } 
    
    var shotList = this.state.shots.map(function(shot){
      return(
        <li key={shot.id}><img src={shot.images.hidpi} /></li>
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
