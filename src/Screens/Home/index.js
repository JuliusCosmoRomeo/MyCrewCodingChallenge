import React,{Component} from 'react';
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Dimensions, Text, Image, Animated } from 'react-native';
import BaseButton from "../../Components/Buttons/BaseButton";
import {NAME, PASSWORD, EMAIL } from "../../Constants/constants";
import PropTypes from "prop-types";
import AudioPlayer from 'react-native-play-audio';

const { width } = Dimensions.get("window");

const url = 'https://ucfa2f38cb0e936753153aae8108.previews.dropboxusercontent.com/p/orig/AAObJ4PxSWmexqbtVm7mzG6iffLk7gj_Mjw-I09NHvXI0H5jJRx7w2dPYBiwetzWv-EoT1PlPskaAHOLB3Vv6uqaahkalEhcDKqT5fpDf1zQ3rFDLhw76mAHhBwqyAwyN1hZUKdrFgFyBO4_QtTqD6Feb9slDYWp5ev2ZG5jNKpDd7iAZBnfn3489NJi4c1Qs_J0cY7Qg5P3T3lTZdnALq6HSGi8kohgn8vt8cEXGFji5CY_iJg_2rmmICCfHN9iK98DyStQRoKYvm8yHOOWfdjR/p.mp3?dl=0';

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
    animationValue.addListener(({value}) => {
      this._currentAnimValue = value
    });
    this.prepareAudioPlayer();
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

  async stopSong(){
    this.pauseSong();
    animationValue.setValue(0);
    this.setState({
      isPlaying: false,
      hasStarted: false
    });
    AudioPlayer.stop();
    await this.prepareAudioPlayer();
  }

  pauseSong(){
    Animated.timing(
      animationValue
    ).stop();
    AudioPlayer.pause();
  }

  async prepareAudioPlayer(){
    await AudioPlayer.prepare(url, ()=>console.log("prepared audio player"));
    AudioPlayer.onEnd(() => {
      this.stopSong().then(()=> this.playSong());
    });
  }

  runAnimation(duration) {
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
