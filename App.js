/*
cuntplayer-youtube/App.js

Author: Shahar Brandman (2021)

*/
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  PermissionsAndroid,
  TextInput,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import RNFetchBlob from 'rn-fetch-blob';

import TrackPlayer from 'react-native-track-player'

import { documentPath, download } from './src/cuntplayer'

export default function App() {

  const [ input, setInput ] = useState('')

  return (
    <>
      <StatusBar barStyle = "dark-content" />
      <SafeAreaView style = {styles.body} >
      <Text> Enter a youtube link to play </Text>
      <TextInput 
        style = {styles.input} 
        onSubmitEditing = { () => { downloadNewTrack(input) } } 
        onChangeText = {(text) => { setInput(text) }}
      />
      <Button title = 'pause' onPress = { () => { TrackPlayer.pause() } }/>
      <Button title = 'play' onPress = { () => { TrackPlayer.play() } }/>
      </SafeAreaView>
    </>
  );
};

function downloadNewTrack(newTrack) {
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  )

  //download('https://www.youtube.com/watch?v=uQNyTo4k_TA') example for a link
  download(newTrack)
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25
  },
  details: {
    margin: 25
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
  },
  image: {
    width: 350,
    height: 200
  }
})
