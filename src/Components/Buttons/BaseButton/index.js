import React,{Component} from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from "prop-types";
import {PINK} from "../../../Colors/colors";

export default class BaseButton extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired
  };


  render(){
    return (
      <TouchableOpacity style={styles.button} {...this.props}>
        <Text style={[styles.text, this.props.disabled && {opacity: 0.2}]}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  button: {
    alignSelf: "stretch",
    marginHorizontal: 30,
    borderRadius: 4,
    borderWidth: 2,
    height: 50,
    borderColor: PINK.MAIN,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    color: PINK.MAIN,
    textAlign: "center",
    fontSize: 20,
  },
});
