import React,{Component} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import InputField from "../../Components/InputFields/InputField";
import {validateEmail, validateName, validatePassword} from "../../validationUtil";
import BaseButton from "../../Components/Buttons/BaseButton";
import {EMAIL, NAME, PASSWORD} from "../../Constants/constants";

export default class RegistrationScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      isNameValid: false,
      isEmailValid: false,
      isPasswordValid: false,
      email: "",
      name: "",
      password: ""
    };

    this.register = this.register.bind(this);
  }


  async componentDidMount(){
    const user = await AsyncStorage.multiGet([NAME,EMAIL,PASSWORD]).catch(console.log);
    const name = user[0][1];
    const email = user[1][1];
    const pw = user[2][1];
    if (name && email && pw){
      console.log("user ", name, email, pw);
      this.props.navigation.navigate("Home", {name});
    }
  }

  async register(){
    await AsyncStorage.multiSet([[NAME, this.state.name], [EMAIL, this.state.email], [PASSWORD, this.state.password]]).catch(console.log);
    this.props.navigation.navigate("Home", {name: this.state.name});
  }

  render() {
    return (
      <View style={styles.container}>
        <InputField label="Email"
                    placeholder="john.doe@gmail.com"
                    errorText="No valid email address"
                    validate={(email)=>{
                      const isValid = validateEmail(email);
                      this.setState({email, isEmailValid: isValid});
                      return isValid;
                    }}/>
        <InputField label="Password"
                    placeholder="R23Lp0"
                    errorText="Password must consist of at least 6 letters or numbers"
                    password={true}
                    validate={(password)=>{
                      const isValid = validatePassword(password);
                      this.setState({password, isPasswordValid: isValid});
                      return isValid;
                    }}/>
        <InputField label="Name"
                    placeholder="e.g. John Doe"
                    errorText="Name must consist of at least 6 letters"
                    validate={(name)=>{
                      const isValid = validateName(name);
                      this.setState({name, isNameValid: isValid});
                      return isValid;
                    }}/>
        <BaseButton
          disabled={!this.state.isEmailValid || !this.state.isNameValid || !this.state.isPasswordValid}
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
