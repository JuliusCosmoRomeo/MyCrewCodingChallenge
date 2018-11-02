import React,{Component} from 'react';
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Platform, Dimensions, Text, Image, Animated } from 'react-native';
import BaseButton from "../../Components/Buttons/BaseButton";
import {NAME, PASSWORD, EMAIL } from "../../Constants/constants";
import PropTypes from "prop-types";
import AudioPlayer from 'react-native-play-audio';
import ReactNativeToast from "../../../native_modules/ReactNativeToast";

const { width } = Dimensions.get("window");

//const url = 'https://ucf274b69ef07cc854376e24f380.previews.dropboxusercontent.com/p/orig/AAMbAM5WmPN9Gay26t4h1MKrjc6ZPWvIsC05HxBclhcSvP6Q6GBFaHWT9rZRv1Nwjo2s5i3qH6nsa3QJQjZV6auJKk3JlGlWhu6Zfm0vTVynMXAPhGsM6uUQ-NovSa4YdeCWArjPQT27-mkqAIaf9iJlhnLRKdrSOYIIBojog8as2vYbqsYC16UFBthLYYme6R1wBkJWI6BfjGR0z4P_r-cew1nw--jr2htD0rIDF3x4AqX_CD0DQ5nOZVs_8Mo3ptpFNcXUOl_SBUtnxZ6gnDmP/p.mp3?dl=0';
const url = "http://soundbible.com/mp3/Straw%20Slurp-SoundBible.com-1248566513.mp3";
let animationValue = new Animated.Value(0);
const animationDuration = 3000;

export default class Home extends Component {

  _currentAnimValue = 0;
  constructor(props){
    super(props);
    this.state = {
      isPlaying: false,
      hasStarted: false,
      playerPrepared: false
    };

    this.logout = this.logout.bind(this);
    this.playSong = this.playSong.bind(this);
    this.stopSong = this.stopSong.bind(this);
    animationValue.addListener(({value}) => {
      this._currentAnimValue = value
    });
    this.onEnd();
    this.prepareAudioPlayer(null);

  }


  static propTypes = {
    name: PropTypes.string.isRequired
  };


  async logout(){
    if(this.state.isPlaying){
      this.stopSong();
    }
    console.log(Object.keys(ReactNativeToast));
    //await AsyncStorage.multiRemove([NAME, EMAIL, PASSWORD]).catch(console.log);
    //this.props.navigation.popToTop();
    ReactNativeToast.show("You've been logged out");
  }

  onEnd(){
    AudioPlayer.onEnd(async () => {
      //after song has finished playing we first stop it and then replay it on ios
      await this.setState({
        isPlaying: false,
        hasStarted: false,
        playerPrepared: false
      });
      this.onEnd();
      if (Platform.OS === "ios"){
        this.prepareAudioPlayer(this.playSong);
      } else {
        Animated.timing(
          animationValue
        ).stop();
      }
    });
  }

  playSong(){

    if (!this.state.playerPrepared){
      //start the audio player before playing the song
      this.prepareAudioPlayer(this.playSong);
    } else {
      //we're resuming the song
      if (!this.state.isPlaying){
        AudioPlayer.play();
        const duration = (this._currentAnimValue+width/2)/width * animationDuration;
        this.runAnimation(duration);
      } else {
        this.pauseSong();
      }
      this.setState({
        isPlaying: !this.state.isPlaying,
        hasStarted: true
      })
    }

  }

  stopSong(){
    if (!this.state.playerPrepared){
      this.prepareAudioPlayer(this.stopSong);
    } else {
      this.pauseSong();
      animationValue.setValue(0);
      this.setState({
        isPlaying: false,
        hasStarted: false
      });
      AudioPlayer.stop();
      this.setState({
        playerPrepared: false
      });
      this.prepareAudioPlayer(null);
    }
  }

  pauseSong(){
    Animated.timing(
      animationValue
    ).stop();
    AudioPlayer.pause();
  }

  async prepareAudioPlayer(callback){
    //player needs to be prepared everytime we restarted the song
    await AudioPlayer.prepare(url, async ()=>{
      console.log("prepared audio player");
      await this.setState({playerPrepared: true})
      if (callback)
        callback();
    });
  }

  runAnimation(duration) {
    //calculate how far our unicorns already progressed on screen --> animation timing depends on unicorn position
    Animated.timing(animationValue, {
      toValue: -(width/2+35),
      duration,
      useNativeDriver: true,
    }).start((o) => {
      if(o.finished) {
        animationValue.setValue(width/2+35);
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
          <TouchableOpacity disabled={!this.state.hasStarted} onPress={this.stopSong}>
            <Image style={!this.state.hasStarted && styles.stopButtonInactive} source={require("../../../assets/stopButton.png")}/>
          </TouchableOpacity>

        </View>
        <Animated.View style={styles.animationContainer}>
          <Text style={styles.unicorns}>{"\u{1F984}\u{1F984}\u{1F984}"}</Text>
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
  stopButtonInactive: {
    opacity: 0.7
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
  },
  unicorns: {
    fontSize: 20
  }
});
