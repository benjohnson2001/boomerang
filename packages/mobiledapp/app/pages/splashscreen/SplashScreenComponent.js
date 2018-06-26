import React, { Component } from 'react';
import styles from './SplashScreenComponentStyle';
import { View, Image } from 'react-native';
import { isLoggedIn, getItem } from '../../services/LocalStorageService';
import Navigator from '../../util/Navigator';

export default class SplashScreenComponent extends Component {

  constructor(args) {
    super(args);
  }

  async componentDidMount() {

    const userIsLoggedIn = await isLoggedIn();

    if (userIsLoggedIn) {
      const kudosAccountAddress = await getItem('kudosAccountAddress');
      await Navigator.init(this).goToAccountPage(kudosAccountAddress);
    } else {
      Navigator.init(this).resetToWelcomePage();
    }
  }

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex:1}}/>

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../../assets/images/kudos.png')}/>
        </View>

        <View style={{flex:1}}/>

      </View>
    );
  }
}