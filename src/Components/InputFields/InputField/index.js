import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import PropTypes from "prop-types";

export default class InputField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      isValid: true
    }
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    validate: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            this.props.validate(text);
            this.setState({text});
          }}
          value={this.state.text}
          secureTextEntry={this.props.password? this.props.password : false}
          placeholder={this.props.placeholder}
          onEndEditing={()=>{
            const isValid = this.props.validate(this.state.text);
            console.log("is valid ",this.state.text, " ", isValid);
            this.setState({isValid});
          }}
          underlineColorAndroid="transparent"/>
        {
          !this.state.isValid ?
            <Text style={styles.error}>{this.props.errorText}</Text>
          :
            <View/>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 100,
  },
  label: {
    fontSize: 20,
    marginBottom: 5
  },
  input: {
  },
  error: {
    color: "#FF0000"
  }
});
