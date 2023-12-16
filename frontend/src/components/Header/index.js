import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';


const StatusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

const HeaderBackground = require('../../assets/logo.png'); // Replace this with your image path

export default function Header({  }) {
  return (
    <View style={styles.container}>
      <Image source={HeaderBackground} style={styles.backgroundImage} />
      <View style={styles.content}>
      </View>
    </View>
  );
}
/*<TouchableOpacity activeOpacity={0.9} style={styles.buttonUser}>
          <Feather name="user" size={27} color="#FFF" />
        </TouchableOpacity>*/

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBarHeight,
    flexDirection: 'row',
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 64,
    backgroundColor: '#DCDCDC'
  },
  backgroundImage: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
  },
  buttonUser: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
});
