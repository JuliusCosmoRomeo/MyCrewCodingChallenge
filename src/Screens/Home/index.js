import React,{Component} from 'react';
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Text, Image } from 'react-native';
import BaseButton from "../../Components/Buttons/BaseButton";
import {NAME, PASSWORD, EMAIL } from "../../Constants/constants";
import PropTypes from "prop-types";

const songUri = "https://www.dropbox.com/s/zrl1jsdk29qdv5r/Pink%20Fluffy%20Unicorns%20Dancing%20on%20Rainbows%20-%20Fluffle%20Puff%20.mp3?dl=0";

export default class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      isPlaying: false
    };

    this.player = React.createRef();

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
    //this.refs.player.
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
        <Video source={{uri: songUri}}
               ref={(ref) => {
                 this.player = ref
               }}
               paused={!this.state.isPlaying}   //the state of the component controls if the audio is played
               onEnd={this.stopSong}
               onError={this.stopSong}
               style={styles.backgroundVideo} />
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
