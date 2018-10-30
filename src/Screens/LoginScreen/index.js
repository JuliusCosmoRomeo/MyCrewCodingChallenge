import React,{Component} from 'react';
import { StyleSheet, View, } from 'react-native';
import InputField from "../../Components/InputFields/InputField";
import {validateEmail, validatePassword} from "../../validationUtil";
import BaseButton from "../../Components/Buttons/BaseButton";

export default class LoginScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      isEmailValid: false,
      isPasswordValid: false,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <InputField label="Email"
                    placeholder="john.doe@gmail.com"
                    errorText="No valid email address"
                    validate={(email)=>{
                      const isValid = validateEmail(email);
                      this.setState({isEmailValid: isValid});
                      return isValid;
                    }}/>
        <InputField label="Password"
                    placeholder="R23Lp0"
                    errorText="Password must consist of at least 6 letters or numbers"
                    password={true}
                    validate={(pw)=>{
                      const isValid = validatePassword(pw);
                      this.setState({isPasswordValid: isValid});
                      return isValid;
                    }}/>

        <BaseButton
          disabled={!this.state.isEmailValid || !this.state.isPasswordValid}
          onPress={()=>{this.props.navigation.navigate("Home")}}
          text="Login"/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white"
  },
});
