import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const InsideScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello from Outside Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});

export default InsideScreen;
