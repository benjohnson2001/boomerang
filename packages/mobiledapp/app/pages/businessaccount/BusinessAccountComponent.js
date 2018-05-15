import React, { Component } from 'react';
import { View, Image, Text, ToastAndroid } from "react-native";
import styles from './BusinessAccountComponentStyle';
import KudosEventsRequester from "../../services/KudosEventsRequester";
import IpfsFileRequester from "../../services/IpfsFileRequester";
import bs58 from 'bs58';

class BusinessAccountComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {businessAccountAddress: '', businessName: '', businessDescription: ''};
    this.kudosEventsRequester = new KudosEventsRequester();
    this.ipfsFileRequester = new IpfsFileRequester();
  }

  async componentDidMount() {

    // const businessAccountAddress = await localStorage.getItem('kudosAccountAddress', {
    //   keychainService: 'kudosKeychain'
    // });

    const businessAccountAddress = '0xE86cAF4E3Df946A4ea9b3446C82F5733EA9a9aBd';

    const ipfsHash = await this.getIpfsHash(businessAccountAddress);
    console.log('ipfsHash: ' + ipfsHash);

    const businessProfile = await this.ipfsFileRequester.makeRequest(ipfsHash);
    console.log('businessProfile: ' + JSON.stringify(businessProfile));
    this.setState({
      businessAccountAddress: businessProfile.businessAccountAddress,
      businessName: businessProfile.businessName,
      businessDescription: businessProfile.businessDescription
    });
  }

  async getIpfsHash(businessAccountAddress) {

    let events;

    try {
      events = await this.kudosEventsRequester.makeRequest('RegisteredAsBusiness', {_businessAccountAddress: businessAccountAddress});
    } catch (error) {
      console.log(error);
      return new Promise((resolve, reject) => {reject(error)});
    }

    const event = events[0];
    const ipfsHash = this.getIpfsHashFromBytes(event);
    return new Promise((resolve, reject) => {resolve(ipfsHash)});
  }

  getIpfsHashFromBytes(event) {
    const ipfsHash = '1220' + event.returnValues._ipfsHash.slice(2);
    const bytes = Buffer.from(ipfsHash, 'hex');
    return bs58.encode(bytes);
  };

  render() {

    return (

      <View style={styles.container}>

        <View style={{flex: 1}}/>

        <Image style={styles.logo} source={require("../../images/kudos.png")}/>

        <Text style={styles.title}>Business Account</Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.field}>businessAccountAddress: {this.state.businessAccountAddress}</Text>
          <Text style={styles.field}>businessName: {this.state.businessName}</Text>
          <Text style={styles.field}>businessDescription: {this.state.businessDescription}</Text>
        </View>

        <View style={{flex: 3}}/>
      </View>
    );
  }
}

export default BusinessAccountComponent;
