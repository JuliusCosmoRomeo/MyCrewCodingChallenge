import React,{Component} from 'react';
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Dimensions, Text, Image, Animated } from 'react-native';
import BaseButton from "../../Components/Buttons/BaseButton";
import {NAME, PASSWORD, EMAIL } from "../../Constants/constants";
import PropTypes from "prop-types";
import AudioPlayer from 'react-native-play-audio';

const { width } = Dimensions.get("window");

const url = 'https://doc-04-8c-docs.googleusercontent.com/docs/securesc/tlh9qt306foelfb7i8b1c7h4cgei76mm/r5t5ap5v9lgfq1ljkok1sfn8o7en18s9/1541030400000/15894158150185779202/15894158150185779202/1YvIjT3kEoxtcE73IrRjZYCwO20jXlQZD?e=download';

let animationValue = new Animated.Value(0);
const animationDuration = 3000;

export default class Home extends Component {

  _currentAnimValue = 0;
  constructor(props){
    super(props);
    this.state = {
      isPlaying: false,
      hasStarted: false,
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
      isPlaying: !this.state.isPlaying,
      hasStarted: true
    })

  }

  stopSong(){
    this.pauseSong();
    animationValue.setValue(0);
    this.setState({
      isPlaying: false,
      hasStarted: false
    })
  }

  pauseSong(){
    Animated.timing(
      animationValue
    ).stop();

  }

  runAnimation(duration) {
    Animated.timing(animationValue, {
      toValue: -(width/2+35),
      duration,
      useNativeDriver: true,
    }).start((o) => {
      if(o.finished) {
        animationValue.setValue(width/2+35);
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
