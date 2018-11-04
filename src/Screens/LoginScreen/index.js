import React,{Component} from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import InputField from "../../Components/InputFields/InputField";
import {validateEmail, validatePassword} from "../../validationUtil";
import BaseButton from "../../Components/Buttons/BaseButton";
import {EMAIL_ERRORS, PW_ERRORS} from "../../Constants/constants";
import Crypto from "crypto-js";

export default class LoginScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      emailError: "",
      passwordError: "",
      email: "",
      password: ""
    }

    this.login = this.login.bind(this);
  }

  async login(){

    const emailHash = Crypto.SHA256(this.state.email).toString();

    //check if user exists
    const userString = await AsyncStorage.getItem(emailHash).catch(console.log);

    if (userString){
      const user = JSON.parse(userString);
      const pwHash = Crypto.SHA256(this.state.password).toString();
      if (user.PASSWORD===pwHash){
        //user did it and shall pass
        this.props.navigation.navigate("Home", {name: user.NAME});
      } else {
        //wrong password
        this.setState({
          passwordError: PW_ERRORS.WRONG_PW
        });
      }

    } else {
      //register first please
      this.setState({
        emailError: EMAIL_ERRORS.USER_DOES_NOT_EXIST
      });

    }
  }



  render() {

    const enabled = this.state.emailError==="" && this.state.passwordError==="" && this.state.email && this.state.password;

    return (
      <View style={styles.container}>
        <InputField label="Email"
                    placeholder="john.doe@gmail.com"
                    errorText={this.state.emailError}
                    validate={(email)=>{
                      const isValid = validateEmail(email);
                      this.setState({
                        emailError: isValid ? "" : EMAIL_ERRORS.VALIDATION,
                        email
                      });
                    }}/>
        <InputField label="Password"
                    placeholder="R23Lp0"
                    errorText={this.state.passwordError}
                    password={true}
                    validate={(pw)=>{
                      const isValid = validatePassword(pw);
                      this.setState({
                        passwordError: isValid ? "" : PW_ERRORS.VALIDATION,
                        password: pw
                      });
                    }}/>

        <BaseButton
          disabled={!enabled}
          onPress={this.login}
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
