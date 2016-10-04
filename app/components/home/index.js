import React from "react";
import styles from './styles.css';
window.jQuery = require('jquery');
var jribbble = require('jribbble');

import Work from '../work/';


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
      console.log(this.state.shots);
    return (     
      <div className={styles.home}>
        <section  className={styles.hero}>
          <h1>Ryan Pittman</h1>
          <p>Product designer hailing from Sweden. New site coming soon. In the meantime check out some of my dribbble shots.</p>
          <p>Interested in collaborating? Email me at <a href="mailto:hello@ryanpittman.com" target="_top">hello@ryanpittman.com</a></p>
        </section>
        <Work shots={this.state.shots} />
      </div>
    )
  }
}

export default Home
