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
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';

import { documentPath, download } from './src/cuntplayer'
import Slider from '@react-native-community/slider';

export default function App() {

  const [ input, setInput ] = useState(''
  )
  const progress = useTrackPlayerProgress()
  const { duration, position } = progress

  const [isSeeking, setSeeking] = useState(false)
  const [seek, setSeek] = useState(0)

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
      <Button title = 'kill' onPress = { () => { TrackPlayer.destroy() } }/>
      <Slider
        step = {0.015}
        style = {styles.slider}
        minimumValue = {0}
        maximumValue = {duration}
        value = {isSeeking ? seek : position}
        onValueChange = { (v) => {
          TrackPlayer.pause()
          setSeeking(true)
          setSeek(v)
        } }
        onSlidingComplete = { (v) => {
          TrackPlayer.seekTo(v)
          TrackPlayer.play()
          setSeeking(false)
        } }
      />
      </SafeAreaView>
    </>
  );
};

function downloadNewTrack(newTrack) {
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  )

  //download('https://www.youtube.com/watch?v=uQNyTo4k_TA')
  download(newTrack)

  RNFetchBlob.fs.ls(`${documentPath}/`).then( (file) => {
    console.log(file)
  } ).catch( () => { return console.error(`${documentPath}/ doesn't contain any files...`) } )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
  },
  slider: {
    width: 300,
    opacity: 1,
    height: 50,
    marginTop: 50,
  }
})
