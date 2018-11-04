import React,{Component} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import InputField from "../../Components/InputFields/InputField";
import {validateEmail, validateName, validatePassword} from "../../validationUtil";
import BaseButton from "../../Components/Buttons/BaseButton";
import {EMAIL, EMAIL_ERRORS, NAME, NAME_ERRORS, PASSWORD, PW_ERRORS} from "../../Constants/constants";
import Crypto from "crypto-js";

export default class RegistrationScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      emailError: "",
      nameError: "",
      passwordError: "",
      email: "",
      name: "",
      password: ""
    };

    this.register = this.register.bind(this);
  }


  /*async componentDidMount(){
    const user = await AsyncStorage.multiGet([NAME,EMAIL,PASSWORD]).catch(console.log);
    const name = user[0][1];
    const email = user[1][1];
    const pw = user[2][1];
    if (name && email && pw){
      console.log("user ", name, email, pw);
      this.props.navigation.navigate("Home", {name});
    }
  }*/

  async register(){
    //check if user already exists
    const emailHash = Crypto.SHA256(this.state.email).toString();
    const user = await AsyncStorage.getItem(emailHash).catch(console.log);

    if (user){
      //user exists already
      this.setState({
        emailError: EMAIL_ERRORS.USER_ALREADY_EXISTS
      });
    } else {
      const user = {
        PASSWORD: Crypto.SHA256(this.state.password).toString(),
        NAME: this.state.name
      };
      await AsyncStorage.setItem(emailHash, JSON.stringify(user)).catch(console.log);
      this.props.navigation.navigate("Home", {name: this.state.name});
    }

  }

  render() {
    const enabled = this.state.emailError==="" && this.state.passwordError==="" && this.state.nameError==="" && this.state.email && this.state.password && this.state.name;
    return (
      <View style={styles.container}>
        <InputField label="Email"
                    placeholder="john.doe@gmail.com"
                    errorText={this.state.emailError}
                    validate={(email)=>{
                      const isValid = validateEmail(email);
                      this.setState({email, emailError: isValid ? "" : EMAIL_ERRORS.VALIDATION});
                      return isValid;
                    }}/>
        <InputField label="Password"
                    placeholder="R23Lp0"
                    errorText={this.state.passwordError}
                    password={true}
                    validate={(password)=>{
                      const isValid = validatePassword(password);
                      this.setState({password, passwordError: isValid ? "" : PW_ERRORS.VALIDATION});
                      return isValid;
                    }}/>
        <InputField label="Name"
                    placeholder="e.g. John Doe"
                    errorText={this.state.nameError}
                    validate={(name)=>{
                      const isValid = validateName(name);
                      this.setState({name, nameError: isValid ? "" : NAME_ERRORS.VALIDATION});
                      return isValid;
                    }}/>
        <BaseButton
          disabled={!enabled}
          onPress={this.register}
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
