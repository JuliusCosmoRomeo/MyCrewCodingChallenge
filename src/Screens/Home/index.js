import React,{Component} from 'react';
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Dimensions, Text, Image, Animated } from 'react-native';
import BaseButton from "../../Components/Buttons/BaseButton";
import {NAME, PASSWORD, EMAIL } from "../../Constants/constants";
import PropTypes from "prop-types";
import AudioPlayer from 'react-native-play-audio';

const { width } = Dimensions.get("window");

const url = 'blob:https://www.dropbox.com/7a26d338-0484-4fc3-8263-b91b041d13b3';

let animationValue = new Animated.Value(0);
const animationDuration = 3000;

export default class Home extends Component {

  _currentAnimValue = 0;
  constructor(props){
    super(props);
    this.state = {
      isPlaying: false
    };

    this.logout = this.logout.bind(this);
    this.playSong = this.playSong.bind(this);
    this.stopSong = this.stopSong.bind(this);
    animationValue.addListener(({value}) => this._currentAnimValue = value);
  }


  static propTypes = {
    name: PropTypes.string.isRequired
  };


  async logout(){
    await AsyncStorage.multiRemove([NAME, EMAIL, PASSWORD]).catch(console.log);
    this.props.navigation.popToTop();
  }

  playSong(){

    if (!this.state.isPlaying){
      console.log("Preparing Audio player");
      AudioPlayer.prepare(url, () => {
        console.log("Audio player prepared, playing now...");
        AudioPlayer.play();

        AudioPlayer.getDuration((duration) => {
          console.log(duration);
        });
        setInterval(() => {
          AudioPlayer.getCurrentTime((currentTime) => {
            console.log(currentTime);
          });
        }, 1000);
      });
      const duration = (this._currentAnimValue/width) * animationDuration;
      this.runAnimation(duration);
    } else {
      this.pauseSong();
    }
    this.setState({
      isPlaying: !this.state.isPlaying
    })

  }

  stopSong(){
    this.pauseSong();
    animationValue.setValue(0);
    this.setState({
      isPlaying: false
    })
  }

  pauseSong(){
    Animated.timing(
      animationValue
    ).stop();

  }

  runAnimation(duration) {
    Animated.timing(animationValue, {
      toValue: -(width/2+20),
      duration,
      useNativeDriver: true,
    }).start((o) => {
      if(o.finished) {
        animationValue.setValue(width/2+20);
        console.log("finished")
        this.runAnimation(animationDuration);
      }
    });
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
        <Animated.View style={styles.animationContainer}>
          <Text>{"\u{1F984}"}</Text>
          <Text>{"\u{1F984}"}</Text>
          <Text>{"\u{1F984}"}</Text>
        </Animated.View>
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
  },
  animationContainer: {
    flexDirection: "row",
    alignSelf: "center",
    transform:[
      { translateX: animationValue }
    ]

  }
});
