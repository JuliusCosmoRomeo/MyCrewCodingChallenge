import React,{Component} from 'react';
import { StyleSheet, View } from 'react-native';
import BaseButton from "../../Components/Buttons/BaseButton";


export default class Home extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  static propTypes = {
    name: PropTypes.string.isRequired
  };

  render() {
    return (
      <View style={styles.container}>

        <Text>{"Hi " + this.props.name}</Text>
        <BaseButton
          onPress={()=>{console.log("button pressed")}}
          text="Logout"/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
