import { StyleSheet, Image, View, Text } from "react-native";
import React from "react";

const Fallback = () => {
  return (
    <View style={{alignItems:'center'}}>
      <Image
        source={require("../../assets/ToDoImg.png")}
        style={{ height: 300, width: 300, marginTop:50 ,}}
      />
      <Text>Start Adding your Task</Text>
    </View>
  );
};

export default Fallback;

const styles = StyleSheet.create({});
