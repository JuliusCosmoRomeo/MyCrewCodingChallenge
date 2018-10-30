import React,{Component} from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import InputField from "../../Components/InputFields/InputField";
import {validateEmail, validateName, validatePassword} from "../../validationUtil";
import BaseButton from "../../Components/Buttons/BaseButton";

export default class RegistrationScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      isNameValid: false,
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
        <InputField label="Name"
                    placeholder="e.g. John Doe"
                    errorText="Name must consist of at least 6 letters"
                    validate={(name)=>{
                      const isValid = validateName(name);
                      this.setState({isNameValid: isValid});
                      return isValid;
                    }}/>
        <BaseButton
          disabled={!this.state.isEmailValid || !this.state.isNameValid || !this.state.isPasswordValid}
          onPress={()=>{this.props.navigation.navigate("Home")}}
          text="Register"/>


        <TouchableOpacity
          style={styles.loginBtn}
          onPress={()=>{this.props.navigation.navigate("Login")}}>
          <Text
            style={styles.loginText}>Login</Text>
        </TouchableOpacity>

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
  loginBtn: {
    justifyContent: "center",
    alignItems: "center"
  },
  loginText: {
    fontSize: 16,
    textDecorationLine: "underline"
  }
});
