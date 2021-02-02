/*
cuntplayer-youtube/App.js

Author: Shahar Brandman (2021)

*/
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import TrackPlayer from 'react-native-track-player'
//import { create, isPLaying, play, pause, setSong } from './src/cuntplayer'

export default function App() {

  const track = {
    id: 'epic',
    url: 'https://drive.google.com/uc?export=download&id=1AjPwylDJgR8DOnmJWeRgZzjsohi-7ekj',
    title: 'idk man',
    artist: 'nigger',
    image: 'https://i.picsum.photos/id/100/200/200.jpg'
  }

  TrackPlayer.setupPlayer()
  TrackPlayer.add(track)

  const [ title, setTitle ] = useState('default track')
  const [ artist, setArtist ] = useState('default artist')
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style = {styles.body} >
      <Button title = 'pause' onPress = { () => { TrackPlayer.stop() } }/>
      <Button title = 'play' onPress = { () => { TrackPlayer.play() } }/>
      <Text> {title} </Text>
      <Text> {artist} </Text>
      <Image
        source = {{uri: './assests/thumbnail.png'}}
        width = '50'
        height = '50'
      />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
