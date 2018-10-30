import React,{Component} from 'react';
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Text, Image } from 'react-native';
import BaseButton from "../../Components/Buttons/BaseButton";
import {NAME, PASSWORD, EMAIL } from "../../Constants/constants";
import PropTypes from "prop-types";

export default class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      isPlaying: false
    };

    this.logout = this.logout.bind(this);
    this.playSong = this.playSong.bind(this);
    this.stopSong = this.stopSong.bind(this);
  }

  static propTypes = {
    name: PropTypes.string.isRequired
  };


  async logout(){
    await AsyncStorage.multiRemove([NAME, EMAIL, PASSWORD]).catch(console.log);
    this.props.navigation.popToTop();
  }

  playSong(){
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }

  stopSong(){

  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>{"Welcome " + this.props.name + " to \u{1F984} paradise"}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={this.playSong}>
            <Image source={ this.state.isPlaying ? require("../../../assets/pauseButton.png") : require("../../../assets/playButton.png")}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.stopSong}>
            <Image source={require("../../../assets/stopButton.png")}/>
          </TouchableOpacity>
        </View>
        <BaseButton
          onPress={this.logout}
          text="Logout"/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  welcome: {
    marginTop: 50,
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "center"
  },
  logoutBtn: {
    alignSelf: "flex-end"
  }
});
